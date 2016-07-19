'use strict';


const mongoose = require('mongoose');
const moment = require('moment');
const uuid = require('uuid');
const AWS = require('aws-sdk');
const path = require('path');

const s3 = new AWS.S3();


const imageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  url: { type: String, required: true },
  key: {type: String, required: true}
});


imageSchema.statics.upload = function(file, userId, name, cb) {
  let key = uuid();
  console.log(file.originalname);
  s3.putObject({
    Bucket: 'THOMASNewBucket',
    Key: `${key}${path.extname(file.originalname)}`, 
    Body: file.buffer,
    ACL: 'public-read'
  }, (err, data) => {
    let newImage = {
      user: userId,
      name,
      key,
      url: `https://s3.amazonaws.com/THOMASNewBucket/${key}${path.extname(file.originalname)}`
    }
    this.create(newImage, cb);
  });
} 




const Image = mongoose.model('Image', imageSchema);



module.exports = Image;
