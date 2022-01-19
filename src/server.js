import { createServer, Model } from 'miragejs';

function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(_server) {
      _server.create('user', { name: 'Bob' });
      _server.create('user', { name: 'Alice' });
    },

    routes() {
      this.namespace = 'api';

      this.get('/users', (schema) => schema.users.all());
    },
  });

  return server;
}

export default makeServer;
