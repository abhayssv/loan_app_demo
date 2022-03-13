'use strict';
var db = require('../config/sequelize').db;
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')
const jwt_decode = require('jwt-decode');
const FCM = require('fcm-node')
 
// Fcm Controller ............................................................................. 

const sendNotification = async (title,body) => {  
  const getUserUnpaidLoan = await db.models.appApplyLoan.findAll({
    attributes: ['id', 'user_id'],
    where: {
      status: 3,
      deleted_at: null,
    }
  }) 
  var tokenArray = [];
  for (const element of  getUserUnpaidLoan) { 
    const app = await db.models.appInfo.findOne({
      attributes: ['id', 'user_id', 'token'],
      where: {
        deleted_at: null,
        user_id: element.user_id
      }
    }) 
    if(app != null){   
      tokenArray.push(app.token) 
    } 
  }
  var fcm = new FCM(process.env.FCS_SERVER_TOKEN) 
  var message = {
    registration_ids: tokenArray,
    notification: {
      title: title, 
      body: body,
      sound: 'default'
    }
  } 
  fcm.send(message,  function(err, response){
    if (err) {
        console.log("Something has gone wrong!")
    } else {
        console.log("Successfully sent with response: ", response)
    }
  })
};

module.exports = { 
    sendNotification:sendNotification, 
};

