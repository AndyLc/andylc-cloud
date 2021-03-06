(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const authRoutes = require('../routes/auth');
    const usersRoutes = require('../routes/users');
    const devicesRoutes = require('../routes/devices');
    const authCheckMiddleware = require('../auth/auth_check');

    // *** register routes *** //
    app.use('/api', authCheckMiddleware);
    app.use('/', routes);
    app.use('/auth', authRoutes);
    app.use('/api/users', usersRoutes);
    app.use('/api/devices', devicesRoutes);
  };

})(module.exports);
