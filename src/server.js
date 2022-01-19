import { createServer, Model } from 'miragejs';
import { users } from './fakeData';

function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
    },
    // seeds(_server) {
    //   _server.create('user', { name: 'Bob' });
    //   _server.create('user', { name: 'Alice' });
    // },
    routes() {
      this.namespace = 'api';
      // this.get('/users', (schema) => schema.users.all());
      this.get('/users', (schema, req) => {
        const pool = schema.db.users;
        const page = parseInt(req.queryParams.page, 10) - 1 || 0;
        const total = pool.length;
        const pageSize = parseInt(req.queryParams.pageSize, 10) || 1;
        const totalPages = Math.ceil(total / pageSize);
        const skip = page * pageSize;
        const data = pool.slice(skip, skip + pageSize);
        return {
          total,
          totalPages,
          pageSize,
          data,
        };
      });
      this.get('/users/friends', (schema, req) => {
        const pool = schema.db.users.where({ isFollowing: true });
        const page = parseInt(req.queryParams.page, 10) - 1 || 0;
        const total = pool.length;
        const pageSize = parseInt(req.queryParams.pageSize, 10) || 1;
        const totalPages = Math.ceil(total / pageSize);
        const skip = page * pageSize;
        const data = pool.slice(skip, skip + pageSize);
        return {
          skip,
          total,
          totalPages,
          pageSize,
          data,
        };
      });
    },
  });

  server.db.loadData({
    users,
  });

  return server;
}

export default makeServer;
