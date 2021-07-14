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

  input UserLoginInput @constraint(errorType: "UserLoginBadUserInputError") {
    email: String!
    password: String!
  }

  type UserLoginBadUserInputError implements Error {
    message: String!
  }

  union UserLoginResult = User | UserLoginBadUserInputError

  input UserRegisterInput @constraint(errorType: "UserRegisterBadUserInputError") {
    email: String! @constraint(joi: ".email()")
    username: String! @constraint(joi: ".min(2).max(20)")
    password: String! @constraint(joi: ".min(8)")
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
