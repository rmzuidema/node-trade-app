const mongoose = require('mongoose');
const validator = require('validator');
//const _ = require('lodash');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

// UserSchema.methods.toJSON = function () {
//   var user = this;
//   var userObject = user.toObject();

//   return _.pick(userObject, ['_id', 'email']);
// };




UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});



UserSchema.statics.findByEmail = function(email) {
  var User = this;
  return User.findOne({email: email});
}

UserSchema.statics.findByUsername = function(username) {
  var User = this;
  return User.findOne({username: username});
}


UserSchema.statics.findByCredentials = async function(email, password){
  // the "this" object is the model User
  var User = this;
  // returning a promise that can be rejected or chained to a then
  var obj = await User.findOne({email});
  var res = await bcrypt.compare(password, obj.password);
  return res;
}

UserSchema.statics.findForLogin = async function(username, password){
  // the "this" object is the model User
  var User = this;
  // returning a promise that can be rejected or chained to a then
  var obj = await User.findOne({username: username});
  if (obj) {
    var res = await bcrypt.compare(password, obj.password);
    return res;
  }
    return false;
}

var User = mongoose.model('User', UserSchema);

module.exports = { User }
