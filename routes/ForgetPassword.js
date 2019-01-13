const express = require('express');
const router = express.Router();

const randomstring = require('randomstring');
var SignUpSchema = require('../Models/signUp');
var nodemailer = require('nodemailer');
var {isNotAuthenticated} = require('../helpers/auth');
var {isAuthenticated} = require('../helpers/auth');
const bcrypt = require('bcrypt');
let pass ;

// Forget pasword
router.get('/forgetPassword',isAuthenticated,async function(req,res){
    
    res.render("index/ForgetPassword")
    })

router.post('/reset',async function(req,res){
    
    // First Check wheter this email exist or not
    User =  await SignUpSchema.findOne({'email': req.body.email});
   
    // if user exist send a pasword Update email
   if(User){
       
        // First check wheter this email verify or not
       const isActive = User.activate
       
       // if user email is not active show message
       if(!isActive){

       req.flash('error_ms','Your email is not verified first verify it');
       res.redirect('/')
       }
       
       // if email active send password update detail on emai
       else {
        const secretToken = randomstring.generate();
        User.secretToken = secretToken;
        await User.save();
        // Compose Email
        const output = `
        <p>Password Rest</p>
        Hi,<br/> Please verify your email by clicking on this link :<a href="http://localhost:4000/resetPassword/${secretToken}">http://localhost:4000/resetPassword/${secretToken}</a>
      `;
    //
    let transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: {
         user: 'e36b59e6f3ba11', // generated ethereal user
         pass: '3cea2e1bda5682'  // generated ethereal password
      },
      tls:{
       rejectUnauthorized:false
      }
      });
    
      let mailOptions = {
        from: '"test@testing.io', // sender address
        to: req.body.email, // list of receivers
        subject: 'Password Reset', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
       };
    
       transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        
           return console.log(error);
        }
       
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        });
       
        req.flash('sucess_ms','Password update detail send to your email address')
        res.redirect('/')
    
        
       }
    
   }
   else{
       req.flash('error_ms','No such user exist');
       res.redirect('/')
   }
    
  
})

// when user click on email send for password update
router.get('/resetPassword/:resetToken',isAuthenticated,function(req,res){
    
    secretToken= req.params.resetToken;
    res.render('index/ResetPassword')
})

// update user password against secret token
router.post('/resetPassword',async function(req,res){
    
    
     User = await SignUpSchema.findOne({'secretToken': secretToken});
     console.log("User is",User.email);
     if(User){
     
       // encrypt the password
        const salt = await bcrypt.genSalt(10);
        const  hash =   await bcrypt.hash(req.body.password, salt);
        User.secretToken = '';
        User.password = hash;
        await User.save();
        req.flash('sucess_ms','Password Update Successfully')
        res.redirect('/')

     }
     else {
         req.flash('error_ms','No user found');
         res.redirect('/')
     }
})

module.exports = router