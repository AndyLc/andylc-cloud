(function() {

  'use strict';

  // *** dependencies *** //
  const express = require('express');

  const appConfig = require('./config/main-config.js');
  const routeConfig = require('./config/route-config.js');
  const errorConfig = require('./config/error-config.js');

  // *** express instance *** //
  const app = express();

  // *** config *** //
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  }
  
  appConfig.init(app, express);
  routeConfig.init(app);
  errorConfig.init(app);
  module.exports = app;

}());
