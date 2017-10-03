const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  facebookId: { type: String, unique: true }// for facebook login
});

userSchema
  .virtual('posts', { // 'posts' is the name of the virtual
    ref: 'Pet', // 'Post' is the name of the model
    localField: '_id', // use the local _id field from this schema
    foreignField: 'postedBy' // to match up with the createdBy field from the Post schema
  });

userSchema
  .virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'to'
  });

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswordConfirmation(next) {
  if(!this.password && !this.facebookId) this.invalidate('password', 'required');
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
