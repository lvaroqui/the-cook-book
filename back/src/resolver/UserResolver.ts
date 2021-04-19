import jwt from 'jsonwebtoken';
import { Middleware } from 'koa';

import User from '../entity/User';
import { Resolvers } from '../generated/graphql';
import userRepository from '../repository/UserRepository';

const SECRET = 'secret';

export const authenticate: Middleware = async (ctx, next) => {
  const cookie = ctx.cookies.get('Authorization');
  if (!cookie) {
    return await next();
  }

  let token: { id: string };

  try {
    token = jwt.verify(cookie, 'secret') as { id: string };
  } catch (error) {
    ctx.cookies.set('Authorization');
    return await next();
  }

  const user = await userRepository().findOne(token.id);

  if (!user) {
    ctx.cookies.set('Authorization');
    return await next();
  }

  ctx.user = user;
  await next();
};

const UserResolver: Resolvers = {
  Query: {
    me: async (_0, _1, { ctx }) => {
      return ctx.user;
    },
  },
  Mutation: {
    register: async (_, { email, username, password }) => {
      const emailUsed = (await userRepository().findOne({ email })) != undefined;
      const usernameUsed = (await userRepository().findOne({ username })) != undefined;

      if (emailUsed || usernameUsed) {
        return {
          __typename: 'UserRegisterBadUserInputError',
          message: 'Could not sign you up',
          ...(emailUsed && { emailErrorMessage: 'Email already used' }),
          ...(usernameUsed && { usernameErrorMessage: 'Username already used' }),
        };
      }

      const user = await User.create(email, username, password);

      await userRepository().save(user);
      return {
        __typename: 'User',
        ...user,
      };
    },

    login: async (_, { email, password }, { ctx }) => {
      // Check user
      const user = await userRepository().findOne({
        email: email,
      });

      // If user does not exists or password doesn't match
      if (!user || !(await user.checkPassword(password))) {
        return {
          __typename: 'UserLoginBadUserInputError',
          message: 'Bad email or password',
        };
      }

      const token = jwt.sign({ id: user.id }, SECRET);
      ctx.cookies.set('Authorization', token, {
        secure: true,
        httpOnly: true,
      });

      return {
        __typename: 'User',
        ...user,
      };
    },

    logout: async (_0, _1, { ctx }) => {
      ctx.cookies.set('Authorization');
      return true;
    },
  },
};

export default UserResolver;
