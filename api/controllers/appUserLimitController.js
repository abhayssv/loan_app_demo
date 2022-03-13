'use strict';
var db = require('../config/sequelize').db;
var Sequelize = require("sequelize");
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')
var generalConfig = require('../config/generalConfig');
var passport = require("../config/passport.js")();
const jwt_decode = require('jwt-decode');


// Page Controller .............................................................................

exports.getAllUserLimit = catchAsync(async (req, res, next) => {
  const user_limit = await db.models.appUserLimit.findAll({
    attributes: ['id', 'user_type', 'initial_limit', 'level', 'final_limit'],
    where: {
      deleted_at: null
    }
  })
  if (JSON.stringify(user_limit) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'FAQ found', error: false, data: user_limit });
});
 

exports.getUserLimit = catchAsync(async (req, res, next) => {     
  const user_limit = await db.models.appUserLimit.findOne({
        attributes: ['id', 'user_type', 'initial_limit', 'level', 'final_limit'],
        where: {
        deleted_at: null,
        id: req.params.id
        }
    })
    
    if (!user_limit) return next(new AppError('Not Found', 404))
    res.json({ message: 'Pages found', error: false, data: user_limit });
}); 

exports.getUserLimitLevel = catchAsync(async (req, res, next) => {     
  var decoded = jwt_decode(req.headers.authorization);  
  var user_type = decoded.user_type;  
  const user_limit = await db.models.appUserLimit.findAll({
        attributes: ['id', 'user_type', 'initial_limit', 'level', 'final_limit'],
        where: {
          deleted_at: null,
          user_type
        }
    })
    
    if (JSON.stringify(user_limit) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({ message: 'Pages found', error: false, data: user_limit });
}); 

exports.getUserLimitByUserId = catchAsync(async (req, res, next) => { 
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;  
  const user = await db.models.appUser.findOne({
      attributes: ['user_id', 'level', 'user_type'],
      where: {
      deleted_at: null,
      user_id
      }
  })
  if(user){
    const user_limit = await db.models.appUserLimit.findOne({
      attributes: ['level', 'initial_limit', 'final_limit'],
      where: {
      deleted_at: null,
      user_type: user.user_type, 
      level: user.level
      }
    })
    if (!user_limit) return next(new AppError('Not Found', 404))
    res.json({ message: 'User Limit found', error: false, data: user_limit });
  } else{
    return next(new AppError('Not Found', 404))
  } 
});

exports.saveUserLimit = catchAsync(async (req, res, next) => {  
    const {id, user_type, level, initial_limit, final_limit} = req.body;    
    if (id) {  
        const update = await db.models.appUserLimit.update({
        user_type, level, initial_limit, final_limit,
      }, {
        where: {
          id
        }
      })
      if (!update) return next(new AppError('Not Found', 404))
      res.json({ message: 'User Limit update sucessfully', error: false, data: update });
    } else { 
        const create = await db.models.appUserLimit.create({
            user_type, level, initial_limit, final_limit,
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'User Limit create sucessfully', error: false, data: create });
    }
});
 
exports.deleteUserLimit = catchAsync(async (req, res, next) => {
  const current_date = new Date(); 
  const faq = await db.models.appUserLimit.update({
    deleted_at : current_date,
    }, {where: {
      id: req.body.id
    },
    force: false
  })
  if (!faq) return next(new AppError('Not Found', 404))
  res.json({ message: 'User Limit delete sucessfully', error: false, data: faq });
});