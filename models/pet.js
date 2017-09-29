const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  image: String,
  location: String,
  active: Boolean,
  lost: Boolean
});


module.exports = mongoose.model('Pet', petSchema);
