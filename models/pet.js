const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  image: {type: String, required: true},
  description: {type: String, required: true},
  location: {type: String, required: true},
  status: {type: String, enum: ['lost', 'found'] },
  active: {type: Boolean, required: true, default: true}
});


module.exports = mongoose.model('Pet', petSchema);
