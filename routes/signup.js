var express = require('express');
var router = express.Router();

var mongooes = require('../middleWare/mongo');

router.use('/', (req, res) => {



    mongooes.insert.insertUserInfo({
        name: req.query["user"],
        password: req.query["password"]
    },
        (err, doc) => {
            if (err) {
                res.send({ 'ok': false, 'msg': 'Failed to create the Client ! Root cause : ' + err.message }).end();
            //console.log(err.message);
            } else {
                res.send({ 'ok': true, 'msg': 'Create successful !' }).end();
        }
    });
});

module.exports = router;
