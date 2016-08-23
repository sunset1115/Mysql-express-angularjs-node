'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  path = require('path'),
  db = require(path.resolve('./config/lib/sequelize'));
var User = db.guacamole_user;
module.exports = function () {
  // Use local strategy
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {
    var where = { username: username };
    if (username.indexOf('@') >= 0) {
      where = { email: username };
    }

    User.find({
      where : where
    }).then(function (user) {
      if (!user || !user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid username or password'
        });
      }
      return done(null, user);
    }).catch(function (err) {
      return done(err);
    });
  }));
};
