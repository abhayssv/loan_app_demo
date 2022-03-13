'use strict';
var db = require('../config/sequelize').db;
var Sequelize = require("sequelize");
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')
var generalConfig = require('../config/generalConfig');

// User OTP ...................................................................

exports.getAllUsersOtp = catchAsync(async (req, res, next) => {
  const usersOtp = await db.models.userOtp.findAll({
    attributes: ['id', 'mobile_no', 'otp', 'expire_time'],
    where: {
      deleted_at: null
    }
  })
  if (JSON.stringify(usersOtp) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Users Found', error: false, data: usersOtp });
});

exports.getUserOtpByNumber = catchAsync(async (req, res, next) => {
  const userOtp = await db.models.userOtp.findOne({
    attributes: ['id', 'mobile_no', 'otp', 'expire_time'],
    where: {
      deleted_at: null,
      mobile_no: req.body.mobile_no,
    }
  })
  if (!userOtp) return next(new AppError('OTP not found', 404))
  const otp =  generalConfig.decryptOtp(userOtp.otp);
  userOtp['otp'] = otp;
  res.json({ message: 'Users OTP found', error: false, data: userOtp });
});

exports.getUserbyMobileNum = catchAsync(async (req, res, next) => {
  const userOtp = await db.models.userOtp.findOne({
    attributes: ['id', 'mobile_no', 'otp', 'expire_time'],
    where: {
      deleted_at: null,
      mobile_no: req.body.mobile_no,
    }
  })
  if (!userOtp) return next(new AppError('OTP not found', 404))
   const otp = generalConfig.decryptOtp(userOtp.otp);
  req.body.otp == otp ?
  res.json({ message: 'Users OTP found', error: false, data: userOtp }) :
  next(new AppError('OTP not found', 404));
});

exports.saveUserOtp = catchAsync(async (req, res, next) => {
  const otp = generalConfig.encryptOtp(Math.floor(1000 + Math.random() * 9000).toString());
  const userOtp = await db.models.userOtp.findOne({
    attributes: ['id', 'mobile_no', 'otp', 'expire_time'],
    where: {
      deleted_at: null,
      mobile_no: req.body.mobile_no,
    }
  })
    if (userOtp) {
      const update = await db.models.userOtp.update({
        mobile_no: req.body.mobile_no,
        otp: otp,
        expire_time: req.body.expire_time,
      }, {
        where: {
        mobile_no: req.body.mobile_no,
        }
      })
      if (!update) return next(new AppError('Not Found', 404))
      res.json({ message: 'OTP re-generate sucessfully', error: false, data: update });
    } else {
      const create = await db.models.userOtp.create({
        mobile_no: req.body.mobile_no,
        otp: otp,
        expire_time: req.body.expire_time,
      })
      if (!create) return next(new AppError('Not Found', 404))
      res.json({ message: 'OTP generate sucessfully', error: false, data: create });
    }
});
