import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
import helmet from 'koa-helmet';
import { createConnection } from 'typeorm';

import resolvers from './resolver';
import { authenticate } from './resolver/UserResolver';
import typeDefs from './schema';

(async function start() {
  // PostgreSQL connection
  await createConnection();

  const app = new Koa();
  app.proxy = true;

  if (app.env != 'development') {
    app.use(helmet());
  }

  app.use(authenticate);

  // GraphQL
  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers: resolvers,
      resolverValidationOptions: {
        requireResolversForResolveType: 'ignore',
      },
    }),
    context: ({ ctx }) => ({ ctx }),
  });

  await server.start();

  app.use(server.getMiddleware({ path: '/graphql' }));

  app.listen(3001, async () => {
    console.log('Listening on port 3001');
  });
})();
