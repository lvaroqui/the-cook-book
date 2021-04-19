import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    username: String!
  }

  extend type Query {
    me: User
  }

  type UserLoginBadUserInputError implements Error {
    message: String!
  }

  union UserLoginResult = User | UserLoginBadUserInputError

  type UserRegisterBadUserInputError implements Error {
    message: String!
    emailErrorMessage: String
    usernameErrorMessage: String
    passwordErrorMessage: String
  }

  union UserRegisterResult = User | UserRegisterBadUserInputError

  extend type Mutation {
    login(email: String!, password: String!): UserLoginResult!
    register(email: String!, username: String!, password: String!): UserRegisterResult!
    logout: Boolean!
  }
`;

export default typeDefs;
