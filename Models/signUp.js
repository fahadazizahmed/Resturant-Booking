var mongoose = require('mongoose');
var SignUpSchema = new mongoose.Schema({

firstName : {
  type : String,
  required : true
},

  lastName : {
    type:String
    //required : true

  },
  email : {
    type : String
  },
  password : {
    type : String

  },
 
  location : {
    type : String
  },
  administrator : {
    type : String,
    default : "off"
  },


  signMe:{
type : String,
default : 'off'
  } ,
  rememberMe : {

   type : String,
  default: 'off'


  },
  secretToken:{
    type:String
  },
  activate:{
    type:Boolean
  },


});

var SignUpSchema =  mongoose.model("signUp", SignUpSchema );
module.exports = SignUpSchema;
