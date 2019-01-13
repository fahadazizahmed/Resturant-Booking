var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var StorySchema = new Schema({

title : {
  type : String,
  required : true
},

  body : {
    type:String,
    required : true

  },
  status : {
    type : String,
    default:'public'
  },
  allowComments : {
    type : Boolean,
    default : true

  },
  Comments : [{
    commentBody:{
      type:String,
      required:true
    },
    commentDate :{
      type : Date,
      default : Date.now
    },
    commentUser : {
      type : String

    }
  }],
  userId:{
    type : String

  },
  date : {
    type : Date,
    default : Date.now
  }
});

var StorySchema =  mongoose.model("stories", StorySchema,'stories');
module.exports = StorySchema;
