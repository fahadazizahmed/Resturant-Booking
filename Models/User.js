var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({

googleId : {
  type : String,
  required : true
},

  email : {
    type:String
    //required : true

  },
  firstName : {
    type : String
  },
  lastName : {
    type : String

  },
  image : {
    type : String
  }
});

var UserSchema =  mongoose.model("user", UserSchema );
module.exports = UserSchema;
