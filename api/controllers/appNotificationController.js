'use strict';
var db = require('../config/sequelize').db; 
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')
const jwt_decode = require('jwt-decode');
var moment = require('moment');

// Notification Controller .............................................................................

exports.getAllNotification = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    const notify = await db.models.appNotify.findAll({
        attributes: ['id', 'user_id' ,'message', 'status','created_at', 'updated_at'], 
        order: [["id", "DESC"]],
        where: {
            deleted_at: null,
            user_id
        }
    })
    if (JSON.stringify(notify) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({
        message: 'Notification Found',
        error: false,
        data: notify
    });
});

exports.updateNotification = catchAsync(async (req, res, next) => { 
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    const {id} = req.body; 
        var update = await db.models.appNotify.update({
            status: 1
            }, {
            where: {
                id,user_id
                }
            }) 
    if (!update) return next(new AppError('Not Found', 404))
    res.json({ message: 'Notification Update Sucessfully', error: false, data: update }); 
});

exports.saveNotification = catchAsync(async (req, res, next) => { 
    var c_Date = moment().format("YYYY-MM-DD h:mm a");
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    const create = await db.models.appNotify.create({
        user_id, message: req.body.message, created_at: c_Date
    }) 
    if (!create) return next(new AppError('Not Found', 404))
    res.json({ message: 'Notification Create Sucessfully', error: false, data: create });
});