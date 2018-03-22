'use strict';
var express = require('express');
var router = express.Router();

router.use(express.static(__dirname + '/views')); 

/* GET users listing. */
router.use('/users', function (req, res) {
    res.send('respond with a resource');
});

module.exports = router;
