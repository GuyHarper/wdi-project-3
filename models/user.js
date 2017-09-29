const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true},
  secondname: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  messages: [{ type: String, ref: 'Message' }]
});

module.exports = mongoose.model('User', userSchema);
