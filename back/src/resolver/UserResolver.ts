import jwt from 'jsonwebtoken';
import { Middleware } from 'koa';

import User from '../entity/User';
import { Resolvers } from '../generated/graphql';
import { userRegisterInputSchema, validate } from '../generated/joi-schema';
import userRepository from '../repository/UserRepository';

const SECRET = 'secret';

export const authenticate: Middleware = async (ctx, next) => {
  const cookie = ctx.cookies.get('Authorization');
  if (!cookie) {
    return await next();
  }

  let token: { id: string };

  try {
    token = jwt.verify(cookie, SECRET) as { id: string };
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

// const userRegisterInputSchema = new In(
//   'UserRegisterBadUserInputError',
//   Joi.object({
//     email: Joi.string().required().email(),
//     username: Joi.string().required().min(2).max(20),
//     password: Joi.string().required().min(8),
//   })
// );

const UserResolver: Resolvers = {
  Query: {
    me: async (_0, _1, { ctx }) => {
      return ctx.user;
    },
  },
  Mutation: {
    register: async (_, { input }) => {
      const error = validate(input, userRegisterInputSchema);
      if (error) return error;

      const emailUsed = (await userRepository().findOne({ email: input.email })) != undefined;
      const usernameUsed =
        (await userRepository().findOne({ username: input.username })) != undefined;

      if (emailUsed || usernameUsed) {
        return {
          __typename: 'UserRegisterBadUserInputError',
          message: 'Could not sign you up',
          ...(emailUsed && { emailErrorMessage: 'Email already used' }),
          ...(usernameUsed && { usernameErrorMessage: 'Username already used' }),
        };
      }

      const user = await User.create(input.email, input.username, input.password);

      await userRepository().save(user);
      return {
        __typename: 'User',
        ...user,
      };
    },

    login: async (_, { input }, { ctx }) => {
      // Check user
      const user = await userRepository().findOne({
        email: input.email,
      });

      // If user does not exists or password doesn't match
      if (!user || !(await user.checkPassword(input.password))) {
        return {
          __typename: 'UserLoginBadUserInputError',
          message: 'Bad email or password',
        };
      }

      const token = jwt.sign({ id: user.id }, SECRET);
      ctx.cookies.set('Authorization', token, {
        maxAge: 1000 * 3600 * 24 * 30, // One month
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
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
