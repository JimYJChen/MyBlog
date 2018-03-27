'use strict';
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var mongodb = require('mongodb').MongoClient;
const dburl = "mongodb://127.0.0.1:27017/";

router.use(cookieSession({
    secret: "thisIsRandomString",
    path: "/login",
    maxAge: 60 * 60 * 1000
}));

router.use('/', (req, res) => {
    //console.log()
    var username = req.query['user'];
    var password = req.query['password'];

    mongodb.connect(dburl, function (err, db) {
        if (err) throw err;
        var dbtest = db.db("jimtest");
        dbtest.collection("demo").find({ "name": username }).toArray(function (err, result) {
            if (err) {
                console.log('Error:' + err);
                return;
            } else {
                console.log(result[0]);
                //var selectdata = JSON.parse(JSON.stringify(result));
                db.close();
                if (result[0] == null) {
                    res.send({ 'ok': false, 'msg': 'User not found!' });
            } else {
                    if (result[0].password != password) {
                        res.cookie('loged', true, {
                            maxAge: 30 * 60 * 1000
                        });
                        res.send({ 'ok': false, 'msg': 'password incorrect!' });
                    } else {
                        res.send({ 'ok': true, 'msg': 'LogIn success!' });
                    }
                }
            }
        });
        
    });
    
    }
);
module.exports = router;