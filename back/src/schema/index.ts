import { gql } from 'apollo-server';

import User from './UserSchema';

const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

const Common = gql`
  interface Error {
    message: String!
  }
`;

export default [Query, Mutation, Common, User];
