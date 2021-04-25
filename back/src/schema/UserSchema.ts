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

  input UserLoginInput {
    email: String!
    password: String!
  }

  type UserLoginBadUserInputError implements Error {
    message: String!
  }

  union UserLoginResult = User | UserLoginBadUserInputError

  input UserRegisterInput {
    email: String!
    username: String!
    password: String!
  }

  type UserRegisterBadUserInputError implements Error {
    message: String!
    emailErrorMessage: String
    usernameErrorMessage: String
    passwordErrorMessage: String
  }

  union UserRegisterResult = User | UserRegisterBadUserInputError

  extend type Mutation {
    login(input: UserLoginInput!): UserLoginResult!
    register(input: UserRegisterInput!): UserRegisterResult!
    logout: Boolean!
  }
`;

export default typeDefs;
