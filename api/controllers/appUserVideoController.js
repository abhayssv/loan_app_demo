'use strict';
var db = require('../config/sequelize').db; 
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync'); 
const jwt_decode = require('jwt-decode');
var commonLib = require('../lib/common');

exports.getUserVideo = catchAsync(async (req, res, next) => { 
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    const videoInfo = await db.models.appVideoInfo.findOne({ 
        attributes: [ 'selfie_video', 'status', 'full_fill'],
        where: { 
        user_id
        }
    })   
    if (!videoInfo) return next(new AppError('Not Found', 404))
    res.json({ message: 'User video update sucessfully', error: false, data: videoInfo });
});

exports.uploadUserVideo = catchAsync(async (req, res, next) => { 
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    const {selfie_video} = req.files;
    console.log(selfie_video)
    const video = selfie_video.map(value => value.filename);
    const videoInfo = await db.models.appVideoInfo.findOne({ 
        attributes: [ 'selfie_video', 'status', 'full_fill'],
        where: { 
        user_id
        }
    })   
    if (videoInfo) { 
        if(videoInfo.selfie_video != null){
            const videoProof = {"selfie_video": videoInfo.selfie_video}
            commonLib.removeVideoInfo(videoProof);
        }  
      var update = await db.models.appVideoInfo.update({
          selfie_video: video, status: 1
          }, {
          where: {
              user_id
          }
      })
      if (!update) return next(new AppError('Not Found', 404))
      res.json({ message: 'User video update sucessfully', error: false, data: update });
    } else {
        const create = await db.models.appVideoInfo.create({
            user_id: user_id,selfie_video: video, status: 1, full_fill: 1.0
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'User video save sucessfully', error: false, data: create });
    }
});

exports.getUserVideoAdmin = catchAsync(async (req, res, next) => { 
    const videoInfo = await db.models.appVideoInfo.findOne({ 
        attributes: [ 'selfie_video', 'status', 'full_fill'],
        where: { 
        user_id: req.params.id
        }
    })   
    if (!videoInfo) return next(new AppError('Not Found', 404))
    var videoInformation = [];
    commonLib.getVideoProof(videoInfo, function () {
        videoInformation.push(videoInfo)
    });
    res.json({ message: 'User video update sucessfully', error: false, data: videoInformation });
});