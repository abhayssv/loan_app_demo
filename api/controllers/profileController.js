'use strict';

var db = require('../config/sequelize').db;
var generalConfig = require('../config/generalConfig');
var commonLib = require('../lib/common');
var thumb = require('node-thumbnail').thumb;

const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync'); 
const jwt_decode = require('jwt-decode');

/*
 * Get Profile
 */
exports.getProfile = function (req, res, next) {
  // var userId = generalConfig.getUserId(req); 
  var decoded = jwt_decode(req.headers.authorization);  
  var userId = decoded.id;  
  if (!userId) {
    return res.json({
      error: true,
      data: null,
      message: 'No access. Please login again'
    });
  }

  db.models.user
    .findOne({
      attributes: [
        'firstname',
        'lastname',
        'email',
        'profile_image',
        'mobile_no', 
        [db.fn("concat", generalConfig.blankUserImage), 'blank_user_image'],
        [db.fn("concat", generalConfig.blankUserImageThumb), 'blank_user_image_thumb']
      ],
      where: {
        id: userId
      }
    })
    .then(function (user) {
      commonLib.getProfileImage(user, function () { 
        res.json({
          error: false,
          data: user,
          message: 'User found'
        });
      });
    })
    .catch(function (err) {
      res.json({
        error: true,
        data: null,
        message: err + ''
      });
    });
};

/**
 * update login user profile
 * @return json
 */
exports.updateProfile = catchAsync(async (req, res, next) => { 
  var decoded = jwt_decode(req.headers.authorization);  
  var id = decoded.id;    
  const { email, firstname, lastname, newpassword, mobile_no} = req.body; 
  if(req.files.profile_image){
    var profileImage = req.files.profile_image.map(value => value.filename);
  } 
  const user = await db.models.user.findOne({
      attributes: ['profile_image'],
        where: { 
        id, 
      }
  })   
  if (user) {   
      (user.profile_image != null && req.files.profile_image ? commonLib.removeAdminPorfileImages(user): "");
      if (newpassword == "undefined") { 
        var update = await db.models.user.update({
          firstname, lastname, mobile_no, profile_image: profileImage
        }, {
            where: {
              id, email
            }
        })  
        if (!update) return next(new AppError('Not Found', 404))
        res.json({ message: 'Profile Update sucessfully', error: false, data: update });
      } else {
        var update = await db.models.user.update({
          password : generalConfig.encryptPassword(newpassword),
        }, {
            where: {
              id, email
            }
        })  
        if (!update) return next(new AppError('Not Found', 404))
        res.json({ message: 'Password Update sucessfully', error: false, data: update });
    }
  } else { 
    return next(new AppError('Not Found', 404))  
  }
});