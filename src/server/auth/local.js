const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const init = require('./passport');
const knex = require('../db/connection');
const authHelpers = require('./_helpers');

const options = {
    usernameField: 'email',
    passwordField: 'password'
  };

init();

passport.use(new LocalStrategy(options, (email, password, done) => {
  // check to see if the email exists
  knex('users').where({ email }).first()
  .then((user) => {
    if (!user) return done(null, false);
    if (!authHelpers.comparePass(password, user.password)) {
      return done(null, false);
    } else {
      const payload = {
          id: user.id
      };
      console.log(process.env.JWT_SECRET);
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return done(null, token, user);
    }
  })
  .catch((err) => { return done(err); });
}));

module.exports = passport;
