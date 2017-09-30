const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  from: { type: String, ref: 'User', required: true },
  to: { type: String, ref: 'User', required: true },
  read: { type: Boolean }
});

module.exports = mongoose.model('Message', messageSchema);
