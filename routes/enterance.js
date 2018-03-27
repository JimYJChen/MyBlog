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
router.get('/Login', (req, res) => {
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
