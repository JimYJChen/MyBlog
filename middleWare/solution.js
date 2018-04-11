var mongnquery = require('../middleWare/mongo');
var async = require('async');
/**
 * @name getTotalReferrals
 * @description Get total referrals of the user
 * 
 * @param {Object} user
 * @return {Number} the number of total referrals
 */
 async function getTotalReferrals(userName) {
     var arr = new Array();
     var queryList = userName;
     async.series([
         () => {
             while (queryList != null) {
                 mongnquery.query.queryScanInfo({ userId: { $in: [queryList] } }, (err, doc) => {
                     if (err) {
                         console.log("Filed to read db : " + err);
                     } else if (doc == null) {
                         queryList = null;
                     } else {
                         doc.forEach((obj) => {
                             try {
                                 if (obj.referralId) {
                                     arr.push(obj.referralId);
                                     queryList = queryList + ',' + obj.referralId;
                                 }
                             } catch{
                                 console.log(err);
                             }

                         }, this)
                     }
                 })
             };
         },
         () => {
             arr = Array.from(new Set(arr));
         }
     ]);
     return arr.length;
 }