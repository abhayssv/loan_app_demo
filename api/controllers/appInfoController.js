'use strict';
var db = require('../config/sequelize').db;
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')
const jwt_decode = require('jwt-decode');
const FCM = require('fcm-node')
 
// Page Controller .............................................................................

exports.getInfoById = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;  
  const app = await db.models.appInfo.findOne({
    attributes: ['id', 'user_id', 'token', 'imei_1', 'imei_2'],
    where: {
      deleted_at: null, 
      user_id
    }
  })
  if (!app) return next(new AppError('Data Not Found', 404));
  res.json({ message: 'App info found', error: false, data: app });
});

exports.saveInfo = catchAsync(async (req, res, next) => {  
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id; 
    const {token, imei_1, imei_2} = req.body;
    var app = await db.models.appInfo.findOne({
        attributes: ['id', 'user_id', 'token', 'imei_1', 'imei_2'],
        where: {
            deleted_at: null,
            user_id
        }
    })
    if(app){    
      const update = await db.models.appInfo.update({
        token, imei_1, imei_2
        }, {
            where: {
            user_id: user_id
        }
      })
      if (!update) return next(new AppError('Not Found', 404))
      res.json({ message: 'App Info Update sucessfully', error: false, data: update });
    } else { 
        const create = await db.models.appInfo.create({
            user_id, token, imei_1, imei_2
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'App info save sucessfully', error: false, data: create });
    }
});

exports.sendNotification = catchAsync(async (req, res, next) => {  
  const {title, body} = req.body; 
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
    if (err) return next(new AppError( err, 404))
    res.json({ message: "Successfully sent with response", error: false, data: message });
  })
});

// Get All Collection Team Management


exports.getAllCollectionTeamManagement = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;  
  const app = await db.models.collectionManagement.findAll({
    attributes: ['id', 'role_id', 'min_days', 'max_days'], 
  })
  if (!app) return next(new AppError('Data Not Found', 404));
  res.json({ message: 'Collection Team Data found', error: false, data: app });
});

// get Collection Team Management ById
exports.getCollectionTeamManagementById = catchAsync(async (req, res, next) => {
  console.log(11111111111111111111);
  const id = req.params.id
  const app = await db.models.collectionManagement.findOne({
    attributes: ['id', 'role_id', 'min_days', 'max_days'], 
    where:{
      id
    }
  })
  if (!app) return next(new AppError('Data Not Found', 404));
  res.json({ message: 'Collection Team Data found', error: false, data: app });
});

// Save Collection Team Management

exports.saveCollectionTeamManagement = catchAsync(async (req, res, next) => {  
  const {id, min_days, max_days} = req.body;
  console.log("req.body",req.body);
  const update = await db.models.collectionManagement.update({
      min_days, max_days 
    }, {
    where: { id }
  })
  if (!update) return next(new AppError('Data Not Found', 404));
  res.json({ message: 'Collection Team Data found', error: false, data: update });
});