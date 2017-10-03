const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  from: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  image: {type: String, required: true},
  read: { type: Boolean }
});

messageSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

messageSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

messageSchema.pre('remove', function removeImage(next) {
  if(this.image && !this.image.match(/^http/)) s3.deleteObject({ Key: this.image }, next);
  next();
});

module.exports = mongoose.model('Message', messageSchema);
