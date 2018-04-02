'use strict';

const config = require('../config/config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Objid = Schema.Types.ObjectId;

exports.query = {//set the query interface
    queryUserDetail: queryUserDetail,
    queryArticleDetail : queryArticleDetail
};

exports.insert = {//set the insert interface
    insertUserInfo: insertUserInfo
};

mongoose.connect(config.mongodb);

mongoose.connection.on('connected', () => {
    console.log('Have connected to Mongo! ');
});

mongoose.connection.on('error', () => {
    console.log('Failed to connected to Mongo !');
});

mongoose.connection.on('disconnected', () => {
    console.log('Monogo disconnected !');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose disconnected through app termation ');
    });
});

const UserInfo = new Schema({//Schema of UserInfo
    name: {
        type: String,
        required: true,
        ObjectId: true,
        _id: false,
    },
    password: {
        type: String,
        required: true,
    },
    createTime: {
        type: Date,
        default: Date.now
    }
}, {
        connection: 'userinfo'
    });

function queryUserDetail(query, callback) {
    mongoose.model("userinfo", UserInfo, "userinfo").findOne(query, (err, doc) => {
            if (err) {
                return callback(err);
            } else {
                return callback(err, doc);
            }
    });        //findOne(query, (err, doc));
};
function insertUserInfo(docs, callback) {
    mongoose.model("userinfo", UserInfo, "userinfo").create(docs, (err,res) => {
        if (err) {
            return callback(err);
        } else {
            return callback(err, res);
        }
    });
};

const ArticleDetail = new Schema({//Schema of ArticleDetail
    ArticleName: {
        type: String,
        required: true,
        ObjectId: true,
        _id: false,
    },
    ArticleID: {
        type: String,
        required: true,
    },
    ArticleContent: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        default: Date.now
    }
}, {
        connection: 'ArticleBlog'
    });

function queryArticleDetail(query, callback) {
    mongoose.model("ArticleBlog", ArticleDetail, "ArticleBlog").find(query, (err, cond) => {
        if (err) {
            return callback(err);
        } else {
            return callback(err, cond);
        }
    });

}



