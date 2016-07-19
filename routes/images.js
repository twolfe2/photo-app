'use strict';


const express = require('express');

const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 52428800}
  }); //req.file.buffer




// api/images
let router = express.Router();

let Image = require('../models/image');
let User = require('../models/user');



router.post('/', User.authorize({admin: false}), upload.single('photo'), (req,res) => {
  console.log(req.body);
  // console.log('hi')
  Image.upload(req.file, req.user._id, req.body.name, (err,data) => {
    if(err) return res.status(400).send(err);
    console.log('data:', data);
    res.send();
  });
});

router.get('/', User.authorize({admin: false}), (req,res) => {
  // console.log(req.user);
  Image.find({user: req.user._id}, (err, images) => {
    if(err) return res.status(400).send(err);
    res.send(images);
  });
});






module.exports = router;


