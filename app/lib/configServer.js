import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { ipcRenderer } from 'electron';

import { SubscriptionServer } from '../../node_modules/subscriptions-transport-ws/dist/server';
import { debug } from '../worker/utils';
import { WORKER_LOADED } from './shared-constants';

export default (port, schema) => {
  const app = express();
  const server = new ApolloServer({ schema });
  server.applyMiddleware({
    app,
    path: '/graphql',
    gui: { subscriptionEndpoint: '/graphql' },
  });

  const httpServer = createServer(app);

  // Default timeout is 2min, which does not apply to our use case
  // This increases it to an arbitrarily large number
  // This lets us import large files without handling the response via websockets
  httpServer.setTimeout(10 * 60 * 10000000);

  const ws = new SubscriptionServer(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '/graphql',
    },
  );

  ws.wsServer.on('listening', () => ipcRenderer.send(WORKER_LOADED));

  return httpServer.listen(port, () => {
    debug(`Server listening on port ${port}`);
  });
};
