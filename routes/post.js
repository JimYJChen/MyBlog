'use strict';
var express = require('express');
var router = express.Router();
var mongodb = require('../middleWare/mongo');

router.get('/', function (req, res) {

    mongodb.query.queryUserDetail({ name: "jimtest" }, (err, cond) => {
        if (err) {
            console.log(err);
        } else {
            console.log(cond);
        }
    }); 

});

module.exports = router;