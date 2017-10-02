const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  image: {type: String, required: true},
  description: {type: String, required: true},
  address: { type: String },// we need to add required: true and modify the seeds because I do not think we need it
  location: {
    lat: { type: Number },// we need to add required: true and modify the seeds because I do not think we need it
    lng: { type: Number } // we need to add required: true and modify the seeds because I do not think we need it
  },
  status: {type: String, enum: ['lost', 'found'] },
  active: {type: Boolean, required: true, default: true},
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});


module.exports = mongoose.model('Pet', petSchema);
