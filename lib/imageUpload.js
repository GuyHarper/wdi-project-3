const s3 = require('./s3');
const uuid = require('uuid');

function imageUpload(req, res, next) {
  if(!req.body.base64) return next();

  const whitelist = [
    'image/jpeg',
    'image/png',
    'image/gif'
  ];

  const [, mimeType, encoding, rawData ] = req.body.base64.match(/^data:(.*);(.*),(.*)$/);
  if(!whitelist.includes(mimeType)) throw new Error('Invalid file type');
  const image = new Buffer(rawData, encoding);
  const extension = mimeType.replace('image/', '');
  const filename = `${uuid.v4()}${extension}`;

  s3.upload({
    Key: filename,
    Body: image,
    ContentType: mimeType
  }, (err) => {
    if(err) return next(err);

    req.file = {
      filename,
      mimeType
    };

    next();
  });
}

module.exports = imageUpload;
