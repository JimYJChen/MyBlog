'use strict';
var express = require('express');
var router = express.Router();
var blog = {
    "name":"Jim test blog"
};
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        blog: blog.name
    });
});

module.exports = router;
