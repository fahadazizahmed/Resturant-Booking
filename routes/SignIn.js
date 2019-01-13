const express = require('express');
const router = express.Router();
const passport = require('passport');
var {isNotAuthenticated} = require('../helpers/auth');
var {isAuthenticated} = require('../helpers/auth');

// passport strategy 
router.post('/login',isAuthenticated,(req,res,next)=>{
    passport.authenticate('local',{ // for local it see toward the config/localpassport.js because we add this middleware in app.js
      successRedirect : '/dashboard',// if strategy done go to this url
      failureRedirect : '/', // if some error in strategy implementation go to this url
      failureFlash : true 
    })(req,res,next);
  })

  module.exports = router;