
const express = require('express');
const router = express.Router();
const passport = require('passport');

var SignUpSchema = require('../Models/signUp');
var {isNotAuthenticated} = require('../helpers/auth');
var {isAuthenticated} = require('../helpers/auth');

// On email link click open this view
router.get("/authToken",isAuthenticated,function(req,res,next){
    res.render("index/verify")

})

// verify the email and activate this user
router.post("/token",async function(req,res,next){
     
  let token = req.body.secretToken;
      
    // check if token exist in database
    user = await SignUpSchema.findOne({'secretToken':token})
      
      // if token exist 
      if(user) {
         user.secretToken = '';
         user.activate = true;
         await user.save();
         req.flash('sucess_ms', 'Email is verified now you can login')
         res.redirect('/');
       }
       else {
        req.flash('error_ms', 'This is not a valid token')
         res.redirect('/');
       }
       
  })
module.exports = router;