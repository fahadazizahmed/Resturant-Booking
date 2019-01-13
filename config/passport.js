 var GoogleStrategy = require('passport-google-oauth20').Strategy;
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var key = require('./keys');
const mongoose = require('mongoose')//for login we need mongomethod search
const myUser  = require('../Models/User');//get model where you search the user
//console.log(key.clientID)

module.exports = function(passport){



  passport.use(new GoogleStrategy({
          clientID: '258247082473-kbi6pnouiip0v9ss8gikg2tk1o77rjpp.apps.googleusercontent.com',
          clientSecret: '1CmkBZAI8HXX0vV-c_CwKPuS',
          callbackURL: 'http://localhost:4000/auth/google/callback',
          proxy:true
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
          done(null, profile); // passes the profile data to serializeUser
        const image =   profile.photos[0].value.substring(0,profile.photos[0].value.indexOf('?'));
        const email = profile.emails[0].value;


          const newUser = new myUser({
              googleId:profile.id,
              email : email,
              firstName:profile.name.givenName,
              lastName : profile.name.familyName,
              image : image
            });



            const user = await myUser.findOne({googleId:profile.id});
           if(user){
             console.log("i am exist")
             return (done,user)
           }
           else {
             console.log("i am  not exist")
           const user =   await newUser.save();
           return (done,user);
           }

  }


  ));

  passport.serializeUser((user, done) => {
      done(null, user);
  });

  // Used to decode the received cookie and persist session
  passport.deserializeUser((user, done) => {
      done(null, user);
  });





}
