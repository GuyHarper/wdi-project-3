const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true},
  secondname: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

if(this.isModified('password')) {
  userSchema.pre('save', function hashPassword(next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    next();
  });
}

module.exports = mongoose.model('User', userSchema);
