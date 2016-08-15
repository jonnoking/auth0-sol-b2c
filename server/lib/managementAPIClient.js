// https://github.com/auth0-extensions/auth0-delegated-administration-extension/blob/master/server/lib/managementApiClient.js
import ms from 'ms';
import { ManagementClient } from 'auth0';
import Promise from 'bluebird';
import memoizer from 'lru-memoizer';
import request from 'request';

import logger from './logger';

const getAccessToken = Promise.promisify(
  memoizer({
    load: (domain, clientId, clientSecret, callback) => {
      logger.debug(`Requesting access token for ${clientId} - https://${domain}/api/v2/`);

      const options = {
        uri: `https://${domain}/oauth/token`,
        body: {
          audience: `https://${domain}/api/v2/`,
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret
        },
        json: true
      };

      request.post(options, (err, res, body) => {
        if (err) {
          return callback(err);
        }

        if (res.statusCode < 200 || res.statusCode >= 300) {
          return callback(new Error(body && (body.error || body.message || body.code) || `Auth0 Management API Error: ${res.statusMessage}`));
        }

        return callback(null, body.access_token);
      });
    },
    hash: (domain, clientId, clientSecret) => `${domain}/${clientId}/${clientSecret}`,
    max: 100,
    maxAge: ms('1h')
  }
));

module.exports.getAccessToken = getAccessToken;

module.exports.getForClient = (domain, clientId, clientSecret) =>
  getAccessToken(domain, clientId, clientSecret)
    .then(accessToken => new ManagementClient({ domain, token: accessToken }));

module.exports.getForAccessToken = (domain, accessToken) =>
  Promise.resolve(new ManagementClient({ domain, token: accessToken }));
