const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');   // handles username and pw along with hashing and salting
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  admin: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);  // one line version of mongoose export