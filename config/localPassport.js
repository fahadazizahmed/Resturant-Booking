const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/signUp');
const bcrypt = require('bcrypt');

module.exports = function(passport){

    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false
},  async (email, password, done) => {
        
    try {
        
            // 1) Check if the email exists or not 
            const user = await User.findOne({ 'email': email });
            
            // if email not exist show message
            if (!user) {
                
                return done(null, false, { message: 'Email not exist ' });
            }

            // 2) Check if the password is correct
            const isValid =  await bcrypt.compare(password, user.password);
        
            // if password not matach show message 
            if (!isValid) {
                
                return done(null, false, { message: 'Password is wrong' });
            }

            // 3) Check if email has been verified if not show message
            if (!user.activate) {
            return done(null, false, { message: 'Sorry, you must validate email first' });
            }
            // if every thing is ok then login and save user session
            return done(null, user);
        
    } catch(error) {
        return done(error, false);
    }
}));

    //passport method to save user session 
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch(error) {
            done(error, null);
        }
});



}