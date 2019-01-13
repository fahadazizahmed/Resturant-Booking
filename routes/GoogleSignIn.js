const express = require('express');
const router = express.Router();
const passport = require('passport');


    // Login with google
    
    router.get('/google', passport.authenticate('google', {
        scope: ['profile','email'] // Used to specify the required data
    }));

    router.get('/google/callback', passport.authenticate('google',{failureRedirect:'/'}), (req, res) => {
        res.redirect('/dashboard');
    });

    module.exports = router