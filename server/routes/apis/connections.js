//https://github.com/auth0-extensions/auth0-delegated-administration-extension/blob/master/server/routes/connections.js
import _ from 'lodash';
import { Router } from 'express';
import { managementClient } from '../../lib/middlewares';

export default () => {
  const api = Router();

  /*
   * List all connections.
   */
  api.get('/', managementClient, (req, res, next) => {
    req.auth0.connections.getAll({ fields: 'id,name,strategy,enabled_clients' })
      .then(connections => _.chain(connections)
        .sortBy((conn) => conn.name.toLowerCase())
        .value())
      .then(connections => res.json(connections))
      .catch(next);
  });

  return api;
};