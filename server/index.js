import path from 'path';
import morgan from 'morgan';
import Express from 'express';
import bodyParser from 'body-parser';

//import { toConfigProvider } from 'auth0-extension-tools';

import api from './routes/api';
//import hooks from './routes/hooks';
//import meta from './routes/meta';
//import htmlRoute from './routes/html';

import config from './lib/config';
import logger from './lib/logger';
import * as middlewares from './lib/middlewares';

module.exports = (configProvider, storage) => {
  config.setProvider(configProvider);

  const app = new Express();
  // app.use((req, res, next) => {
  //   if (req.webtaskContext) {
  //     config.setProvider(toConfigProvider(req.webtaskContext));
  //   }
  //
  //   next();
  // });
  // view engine setup
  app.set('views', path.join(__dirname, '/views'));
  app.set('view engine', 'jade');

  app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
    stream: logger.stream
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(Express.static(path.join(__dirname, 'public')));

  // Configure routes.
  app.use('/api', api(app, storage));
  app.use('/app', Express.static(path.join(__dirname, '../dist')));
//  app.use('/meta', meta());
//  app.use('/.extensions', hooks());

// Routes to be defined
// /dashboard/profile - logged in user's profile
// /dashboard/settings - logged in user's settings and app settings
// /dashboard/logout - logout the logged in users

// Menu items routes to be defined
//


  app.get('/dashboard', function (req, res) {
      //res.sendFile(__dirname + '/public/dashboard/dashboard.html');
      res.render('dashboardHome');
  });

  app.get('/landing', function (req, res) {
    res.sendFile(__dirname + '/public/landing/landing.html');
  });


  // Fallback to rendering HTML.
  //app.get('*', htmlRoute(storage));

  // Generic error handler.
  app.use(middlewares.errorHandler);
  return app;
};
