const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const path = require('path');
//load config
const config = require('./config');

/** passport setup */
passport.use( new FacebookStrategy({
    clientID: config.fb_strategy.clientID,
    clientSecret: config.fb_strategy.clientSecret,
    callbackURL: config.fb_strategy.callbackURL,
    profileFields: config.fb_strategy.profileFields,
    enableProof: config.fb_strategy.enableProof
  },
  function(accessToken, refreshToken, user, cb) {
    return cb(null,user);
  }
));


passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});