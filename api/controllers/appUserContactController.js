'use strict';
var db = require('../config/sequelize').db;
var Sequelize = require("sequelize");
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await db.models.appUserContact.findAll({
    attributes: ['id', 'user_id', 'name', 'mobile_no', 'email'],
    where: {
      deleted_at: null
    }
  })
  if (JSON.stringify(users) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Users contact found', error: false, data: users });
});

exports.getContactByUserId = catchAsync(async (req, res, next) => { 
  const users = await db.models.appUserContact.findAll({
    attributes: ['id', 'user_id', 'name', 'mobile_no', 'email'],
    where: {
      deleted_at: null,
      user_id: req.params.user_id,
    }
  })
  if (!users) return next(new AppError('Not Found', 404))
  res.json({ message: 'User contact found', error: false, data: users });
});

exports.saveappUserContact = catchAsync(async (req, res, next) => {
  const {user_id, name, mobile_no, email} = req.body;
   const user = await db.models.appUserContact.findOne({
    attributes: ['id', 'user_id', 'name', 'mobile_no', 'email'],
    where: {
      deleted_at: null,
      user_id,mobile_no,
    }
  })
    if (user) {
      const update = await db.models.appUserContact.update({
        user_id ,name, mobile_no, email,
      }, {
        where: {
        mobile_no,
        user_id
        }
      })
      if (!update) return next(new AppError('Not Found', 404))
      res.json({ message: 'User contact updated sucessfully', error: false, data: update });
    } else {
      const create = await db.models.appUserContact.create({
        user_id,name, mobile_no, email,
      })
      if (!create) return next(new AppError('Not Found', 404))
  res.json({ message: 'User contact create sucessfully', error: false, data: create });
    }
});
exports.saveallAppUserContact = catchAsync(async (req, res, next) => {    
  var responseJson = req.body; 
  const query = await db.models.appUserContact.bulkCreate(
    responseJson
  ); 
  if (!query) return next(new AppError('Not Found', 404))
  res.json({ message: 'User contact create sucessfully', error: false, data: query }); 
});
