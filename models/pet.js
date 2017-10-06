const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const petSchema = new mongoose.Schema({
  name: {type: String},
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
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

petSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

petSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

petSchema.pre('remove', function removeImage(next) {
  if(this.image && !this.image.match(/^http/)) s3.deleteObject({ Key: this.image }, next);
  next();
});

module.exports = mongoose.model('Pet', petSchema);
