const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User');
const keys = require('../config/keys');

const options = {
  // take token from header request
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        // compare token userId with dbase
        const user = await User.findById(payload.userId).select('email id');
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        // handler for error
        console.log(error);
      }
    })
  );
};
