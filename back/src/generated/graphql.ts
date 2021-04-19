/* eslint-disable */
import { ParameterizedContext } from "koa";
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  logout: Scalars['Boolean'];
  register: UserRegisterResult;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  UserLoginResult: ResolversTypes['User'] | ResolversTypes['UserLoginBadUserInputError'];
  UserLoginBadUserInputError: ResolverTypeWrapper<UserLoginBadUserInputError>;
  Error: ResolversTypes['UserLoginBadUserInputError'] | ResolversTypes['UserRegisterBadUserInputError'];
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  UserRegisterResult: ResolversTypes['User'] | ResolversTypes['UserRegisterBadUserInputError'];
  UserRegisterBadUserInputError: ResolverTypeWrapper<UserRegisterBadUserInputError>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  User: User;
  Int: Scalars['Int'];
  Mutation: {};
  UserLoginResult: ResolversParentTypes['User'] | ResolversParentTypes['UserLoginBadUserInputError'];
  UserLoginBadUserInputError: UserLoginBadUserInputError;
  Error: ResolversParentTypes['UserLoginBadUserInputError'] | ResolversParentTypes['UserRegisterBadUserInputError'];
  Boolean: Scalars['Boolean'];
  UserRegisterResult: ResolversParentTypes['User'] | ResolversParentTypes['UserRegisterBadUserInputError'];
  UserRegisterBadUserInputError: UserRegisterBadUserInputError;
};

export type ErrorResolvers<ContextType = { ctx: ParameterizedContext<any, { user: User }> }, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  __resolveType: TypeResolveFn<'UserLoginBadUserInputError' | 'UserRegisterBadUserInputError', ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = { ctx: ParameterizedContext<any, { user: User }> }, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  login?: Resolver<ResolversTypes['UserLoginResult'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['UserRegisterResult'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'username' | 'password'>>;
};

export type QueryResolvers<ContextType = { ctx: ParameterizedContext<any, { user: User }> }, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = { ctx: ParameterizedContext<any, { user: User }> }, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLoginBadUserInputErrorResolvers<ContextType = { ctx: ParameterizedContext<any, { user: User }> }, ParentType extends ResolversParentTypes['UserLoginBadUserInputError'] = ResolversParentTypes['UserLoginBadUserInputError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLoginResultResolvers<ContextType = { ctx: ParameterizedContext<any, { user: User }> }, ParentType extends ResolversParentTypes['UserLoginResult'] = ResolversParentTypes['UserLoginResult']> = {
  __resolveType: TypeResolveFn<'User' | 'UserLoginBadUserInputError', ParentType, ContextType>;
};

export type UserRegisterBadUserInputErrorResolvers<ContextType = { ctx: ParameterizedContext<any, { user: User }> }, ParentType extends ResolversParentTypes['UserRegisterBadUserInputError'] = ResolversParentTypes['UserRegisterBadUserInputError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailErrorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  usernameErrorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passwordErrorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRegisterResultResolvers<ContextType = { ctx: ParameterizedContext<any, { user: User }> }, ParentType extends ResolversParentTypes['UserRegisterResult'] = ResolversParentTypes['UserRegisterResult']> = {
  __resolveType: TypeResolveFn<'User' | 'UserRegisterBadUserInputError', ParentType, ContextType>;
};

export type Resolvers<ContextType = { ctx: ParameterizedContext<any, { user: User }> }> = {
  Error?: ErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserLoginBadUserInputError?: UserLoginBadUserInputErrorResolvers<ContextType>;
  UserLoginResult?: UserLoginResultResolvers<ContextType>;
  UserRegisterBadUserInputError?: UserRegisterBadUserInputErrorResolvers<ContextType>;
  UserRegisterResult?: UserRegisterResultResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = { ctx: ParameterizedContext<any, { user: User }> }> = Resolvers<ContextType>;
