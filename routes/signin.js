
'use strict';
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var mongoquery = require('../middleWare/mongo');

router.use('/', (req, res) => {
    //console.log()
    var username = req.query['user'];
    var password = req.query['password'];

    mongoquery.query.queryUserDetail({ name: username }, (err, doc) => {
         if (err) {
            throw err;
        } else {
             if (doc == null) {
                //req.flash(err);
                 res.send({ 'ok': false, 'msg': 'User not found!' });
                 req.session.user = null;
             } else {
                 console.log(doc);
                 //var result = doc;
                 if (doc.password != password) {
                     req.session.user = null;
                    res.send({ 'ok': false, 'msg': 'password incorrect!' }).end;
                 } else {
                     req.session.user = username;
                     res.send({ 'ok': true, 'msg': 'LogIn success!' }).end;
                }
             }
             //console.log(doc);
        }
    });   
    }
);
module.exports = router;