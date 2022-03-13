'use strict';
var db = require('../config/sequelize').db;
var Sequelize = require("sequelize");
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')
const jwt_decode = require('jwt-decode');


// App List Controller .............................................................................

exports.getAllAppList = catchAsync(async (req, res, next) => {
  const faqs = await db.models.appList.findAll({
    attributes: ['id', 'user_id', 'app_list'],
    where: {
      deleted_at: null
    }
  })
  if (JSON.stringify(faqs) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'App list found.', error: false, data: faqs });
});

exports.saveAppList = catchAsync(async (req, res, next) => { 
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id;
    const {id, app_list} = req.body;
    if (id) {  
        const update = await db.models.appList.update({
        app_list,
      }, {
        where: {
          user_id
        }
      })
      if (!update) return next(new AppError('Not Found', 404))
      res.json({ message: 'App list update sucessfully', error: false, data: update });
    } else { 
        const create = await db.models.appList.create({
            user_id,app_list
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'App list store sucessfully', error: false, data: create });
    }
});