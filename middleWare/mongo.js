'use strict';

const config = require('../config/config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Objid = Schema.Types.ObjectId;

exports.query = {//set the query interface
    queryUserDetail: queryUserDetail,
    queryArticleDetail: queryArticleDetail,
    queryScanInfo : queryScanInfo
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

const UserInfo = new Schema({//Schema of UserInfo
    userId: {
        type: Number,
        required: true,
        _id: true,
        unique : true
    },
    username: {
        type: String,
        required: true,
        ObjectId: true,
        _id: false,
        unique:true
    },
    createTime: {
        type: Date,
        default: Date.now
    }
}, {
        connection: 'UserName'
    });



const scanInfo = new Schema({//Schema of scanInfo
    referralId: {
        
        type: Number,
        required: true,
        ObjectId: true,
        _id: false,
        unique :false
    },
    userId : {
        type: Number,
        required: true,
    },
    createTime: {
        type: Date,
        default: Date.now
    }
}, {
        connection: 'scanInfo'
    });

function queryScanInfo(query, callback) {
    mongoose.model("scanInfo", scanInfo, "scanInfo").find(query, (err, cond) => {
        if (err) {
            return callback(err);
        } else {
            return callback(err, cond);
        }
    });
}

/*
我使用的方法是：
1.	得到要查询的人名。
2.	查表，查出子节点。
3.	根据子节点返回的ID,继续查表查出子节点的子节点。(如此循环)
我是用的MongoDB 首先创建了创建了一个中间件去做查询的功能。


第二题：
1.将数组以长度进行排序。
2.var resultArr = 最长长度的数组
3.累加剩余的数组(while((最小的+次长的)>resultArr.lenght))
4.循环以index+1的方法将刚才得到的数组插入到resultArr
5.循环3,4两步。





*/