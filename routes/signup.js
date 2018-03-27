var express = require('express');
var router = express.Router();

var mongodb = require('mongodb').MongoClient;
const dburl = "mongodb://127.0.0.1:27017/";

function insertdata(insertRecord, dbName, callback ) {

    //console.log("asdasd : " + insertRecord + "asdasd : " + dbName);
    return mongodb.connect(dburl, function (err, db) {
        if (err) throw err;
        var dbCollection = db.db('jimtest');
        dbCollection = dbCollection.collection(dbName)
        return dbCollection.insert(insertRecord, (err, result) => {
            db.close();
            if (err) {
                console.log("ERR : " + err);
                //return 0;
            } else {
                console.log("Successful : " + result);
               // return 1;
            }
            callback(err, result);

        });


    });
}

router.use('/regist', (req, res) => {

    insertdata({
        "name": req.query["user"],
        "password": req.query["password"]
    }, 'demo', (err, result) => {
        if (err) {
            res.send({ 'ok': false, 'msg': 'Failed to create the Client ! Root cause : ' + err });
        } else {
            res.send({ 'ok': true, 'msg': 'Have create this client ! '});
        }
    });
});

module.exports = router;
