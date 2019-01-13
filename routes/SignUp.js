const express = require('express');
const router = express.Router();
const passport = require('passport');
var UserSchema = require('../Models/User');
var SignUpSchema = require('../Models/signUp');
var alert = require('alert-node');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
var {isNotAuthenticated} = require('../helpers/auth');
var {isAuthenticated} = require('../helpers/auth');


// User SignUp

router.post('/signUp',isAuthenticated,async function(req,res,next){

  // First check email exist or not
  const user = await SignUpSchema.findOne({'email' : req.body.email });
  
  //  if Email exist show message
  if(user) {
      req.flash('error_ms','Email already exist please choose other')
      res.redirect('/');
  }

  // if email not  exist
  else {
    
    // encrypt the passqord
    const salt = await bcrypt.genSalt(10);
    const  hash =   await bcrypt.hash(req.body.password, salt);
 
    // Generate random token for email validation
    const secretToken = randomstring.generate();
  
    // Save the record
    const SignUp = new SignUpSchema({
   
    firstName : req.body.fname,
    lastName : req.body.lname,
    email : req.body.email,
    password : hash,
    location : req.body.location,
    administrator : req.body.administrator,
    signMe : req.body.signMe,
    rememberMe : req.body.rememberMe,
    secretToken : secretToken,
    activate:false
    
  })
  const a = await SignUp.save();
  
    // Compose email and send user to verify it registration
    const output = `
    <p>Registration Detail</p>
      Hi ${req.body.fname},<br/> Thank you for registering! <br/><br/> Please verify your email by typing the following token On the following page:<a href="http://localhost:4000/verify/authToken">http://localhost:4000/verify/authToken</a>  <br/><br/>  your token is.'+${secretToken}
    `;

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
        subject: 'Regisration Detail', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          
          return console.log(error);
        }
        // Show message here to email send and verify
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
      });
    
    req.flash('sucess_ms','SignUp sucessfully Please verify your email before login')
    res.redirect('/')
}
})

module.exports = router;
