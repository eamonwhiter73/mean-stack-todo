var Mongoose = require('mongoose');

exports.MemberSchema = new Mongoose.Schema({
  username : { type : String, required : true },
  password : { type : String, required : true }
});