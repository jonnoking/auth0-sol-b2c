//https://github.com/auth0-extensions/auth0-delegated-administration-extension/blob/master/server/lib/authenticationApiClient.js
import { AuthenticationClient } from 'auth0';
import Promise from 'bluebird';

module.exports.getForClient = (domain, clientId) =>
  Promise.resolve(new AuthenticationClient({ domain, clientId }));