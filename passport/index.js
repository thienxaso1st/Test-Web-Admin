const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const adminService = require('../components/auth/authService');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    console.log('passport-local');
    const user = await adminService.findByUsername(username);
    if (!user)
        return done(null, false, { message: 'Incorrect username.'});

    const isValid = await adminService.validPassword(password, user);
    //if (!adminService.validPassword(password, user)) {  // use this for initial admin
    if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  },
));

passport.serializeUser(function(user, done) {
    done(null, {username: user.username, first_name: user.first_name, last_name: user.last_name});
  });
  
passport.deserializeUser(async function(user, done) {
    done(null, user);
  });

module.exports = passport;