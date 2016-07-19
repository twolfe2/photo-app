'use strict';


const express = require('express');



let router = express.Router();



router.use('/users', require('./users'));
router.use('/tokens', require('./tokens'));
router.use('/images', require('./images'));




module.exports = router;  