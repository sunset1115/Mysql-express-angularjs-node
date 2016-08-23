'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  path = require('path'),
  seq = require(path.resolve('./config/lib/sequelize')),
  config = require(path.resolve('./config/config'));

var User = seq.guacamole_user;
/**
 * Module init function.
 */
module.exports = function (app, db) {
  // Serialize sessions
  passport.serializeUser(function (user, done) {
    done(null, user.user_id);
  });

  // Deserialize sessions
  passport.deserializeUser(function (id, done) {
    User.find({ where: { user_id: id } }).then(function(user){
      if(!user){
        return done(null, false);
      }
      done(null, user);
    }).catch(function(err){
      done(err, null);
    });
  });

  // Initialize strategies
  config.utils.getGlobbedPaths(path.join(__dirname, './strategies/**/*.js')).forEach(function (strategy) {
    require(path.resolve(strategy))(config);
  });

  // Add passport's middleware
  app.use(passport.initialize());
  app.use(passport.session());
};
