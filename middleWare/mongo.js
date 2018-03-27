'use strict';

const config = require('../config/config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Objid = Schema.Types.ObjectId;

exports.query = {//set the query interface
    queryUserDetail: queryUserDetail
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

const UserInfo = new Schema({
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
    });//模型名称,

function queryUserDetail (query, callback) {
    mongoose.model("userinfo", UserInfo, "userinfo").findOne(query, (err,cond)=> {
        if (err) {
            return callback(err);
        } else {
            return callback(err, cond);
        }
    });
};







