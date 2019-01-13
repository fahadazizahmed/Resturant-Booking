const express = require('express');
const router = express.Router();
var {isNotAuthenticated} = require('../helpers/auth');
var {isAuthenticated} = require('../helpers/auth');

  router.get('/dashboard',isNotAuthenticated,function(req,res,next){
    console.log("user",req.user)
    res.render('index/dashboard')

  })

  router.get('/',isAuthenticated,function(req,res,next){
    res.render('index/welcome')

  })

  module.exports = router;
