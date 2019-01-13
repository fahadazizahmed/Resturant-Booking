var express = require('express');
var mongoose = require('mongoose');
const app = express();
const a = require('./config/keys.js');
const exphbs = require('express-handlebars')
const passport = require('passport');
var session = require('express-session')
var path = require('path')
var bodyParser = require('body-parser')
const flash = require('connect-flash');
// All route file
var index = require('./routes/index');
var signUp = require('./routes/SignUp');
var signIn = require('./routes/SignIn');
var googleSignIn = require('./routes/GoogleSignIn');
var verifyEmail = require('./routes/VerifyEmail');
var forgetPassword = require('./routes/ForgetPassword');


mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect(a.mongoURI,{
   useMongoclient : true
 }).then(()=> console.log('mongo database is connectd')).catch((err)=> console.log("error is ",err.message));

// Inject handlebar 
app.engine('handlebars', exphbs({
  helpers : {
    truncate : truncate,
    stripTags:stripTags
  },
  defaultLayout:'main'}));
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname,'public')));

// Express session
app.use(session({
  secret : 'Secret',
  resave:true,
  saveUninitialized:true
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash message middleware
app.use(flash());
app.use(function(req,res,next){
  res.locals.sucess_msg = req.flash('sucess_ms');
  res.locals.error_msg = req.flash('error_ms');
  res.locals.errors = req.flash('error');
  
  // if you are login you can get the user by req.user as we store in serialable in config/passport in case of googleLogin and config/localpassport in case of simple login
  res.locals.user = req.user || null;
  next();
});

//All route middleware
app.use('/auth',googleSignIn);
app.use('/',index);
app.use('/newuser',signUp);
app.use('/user',signIn);
app.use('/verify',verifyEmail);
app.use(forgetPassword);

//passport middleware function
require ('./config/passport')(passport);
require ('./config/localPassport')(passport);

// Page not found middleware
 app.use(function(req,res,next){
   res.render('index/notFound')
 })

const port = process.env.PORT || 4000;

app.listen(port,function(){
  console.log(`app is listen on ${port}`)
})
