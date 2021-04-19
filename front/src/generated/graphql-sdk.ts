/* eslint-disable */
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Error = {
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  login: UserLoginResult;
  register: UserRegisterResult;
  logout: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type UserLoginBadUserInputError = Error & {
  __typename?: 'UserLoginBadUserInputError';
  message: Scalars['String'];
};

export type UserLoginResult = User | UserLoginBadUserInputError;

export type UserRegisterBadUserInputError = Error & {
  __typename?: 'UserRegisterBadUserInputError';
  message: Scalars['String'];
  emailErrorMessage?: Maybe<Scalars['String']>;
  usernameErrorMessage?: Maybe<Scalars['String']>;
  passwordErrorMessage?: Maybe<Scalars['String']>;
};

export type UserRegisterResult = User | UserRegisterBadUserInputError;

export type UserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'username'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename: 'User' }
    & UserFieldsFragment
  ) | (
    { __typename: 'UserLoginBadUserInputError' }
    & Pick<UserLoginBadUserInputError, 'message'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename: 'User' }
    & UserFieldsFragment
  ) | (
    { __typename: 'UserRegisterBadUserInputError' }
    & Pick<UserRegisterBadUserInputError, 'message' | 'emailErrorMessage' | 'usernameErrorMessage' | 'passwordErrorMessage'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  email
  username
}
    `;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    __typename
    ... on User {
      ...UserFields
    }
    ... on UserLoginBadUserInputError {
      message
    }
  }
}
    ${UserFieldsFragmentDoc}`;
export const RegisterDocument = gql`
    mutation register($email: String!, $username: String!, $password: String!) {
  register(email: $email, username: $username, password: $password) {
    __typename
    ... on User {
      ...UserFields
    }
    ... on UserRegisterBadUserInputError {
      message
      emailErrorMessage
      usernameErrorMessage
      passwordErrorMessage
    }
  }
}
    ${UserFieldsFragmentDoc}`;
export const MeDocument = gql`
    query me {
  me {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper(() => client.request<LoginMutation>(LoginDocument, variables, requestHeaders));
    },
    register(variables: RegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterMutation> {
      return withWrapper(() => client.request<RegisterMutation>(RegisterDocument, variables, requestHeaders));
    },
    me(variables?: MeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MeQuery> {
      return withWrapper(() => client.request<MeQuery>(MeDocument, variables, requestHeaders));
    },
    logout(variables?: LogoutMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LogoutMutation> {
      return withWrapper(() => client.request<LogoutMutation>(LogoutDocument, variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;