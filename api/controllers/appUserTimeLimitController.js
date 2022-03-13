'use strict';
var db = require('../config/sequelize').db;
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')


// Page Controller .............................................................................

exports.getAllUserTimeList = catchAsync(async (req, res, next) => {
  const user = await db.models.appUserTimeList.findAll({
    attributes: ['id', 'time', 'status'],
    where: {
      deleted_at: null,
      status: 1,
    }
  })
  if (JSON.stringify(user) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'User list found', error: false, data: user });
});

exports.getAllUserTimeListforAdmin = catchAsync(async (req, res, next) => {
  const user = await db.models.appUserTimeList.findAll({
    attributes: ['id', 'time', 'status'],
    where: {
      deleted_at: null,
    }
  })
  if (JSON.stringify(user) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'User list found', error: false, data: user });
});

exports.saveUserTimeList = catchAsync(async (req, res, next) => { 
    const {id, time, status} = req.body;
    if (id) {  
        const update = await db.models.appUserTimeList.update({
        time, status,
      }, {
        where: {
          id
        }
      })
      if (!update) return next(new AppError('Not Found', 404))
      res.json({ message: 'User list update sucessfully', error: false, data: update });
    } else { 
        const create = await db.models.appUserTimeList.create({
            time
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'User type add in list sucessfully', error: false, data: create });
    }
});

exports.changeStatus = catchAsync(async (req, res, next) => {
  const {id, key, status} = req.body;
  if (key == 'status') {
    const update = await db.models.appUserTimeList.update({
      status: (status == true) ? '1' : '0',
    }, {
      where: {
        id
      }
    })
    if (!update) return next(new AppError('Error in updating user', 404))
    res.json({ message: 'Status updated successfully', error: false, data: update });
  }
});