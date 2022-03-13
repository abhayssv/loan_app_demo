'use strict';
var db = require('../config/sequelize').db;
var Sequelize = require("sequelize");
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')


// Location Controller .............................................................................

exports.getAllState = catchAsync(async (req, res, next) => {
  const states = await db.models.appState.findAll({
    attributes: ['state_id', 'state_name', 'country_id'],
    where: {
      deleted_at: null
    }
  })
  if (JSON.stringify(states) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'State found', error: false, data: states });
});

exports.getAllCity = catchAsync(async (req, res, next) => {
    const states = await db.models.appCity.findAll({
      attributes: ['city_id', 'city_name', 'state_id'],
      where: {
        deleted_at: null,
        state_id: req.params.state_id
      }
    })
    if (JSON.stringify(states) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({ message: 'State found', error: false, data: states });
});

exports.getStateId = catchAsync(async (req, res, next) => {
    const state = await db.models.appState.findOne({
      attributes: ['state_id', 'state_name', 'country_id'],
      where: {
        deleted_at: null,
        state_name: req.params.state
      }
    })
    if (!state) return next(new AppError('Not Found', 404))
    res.json({ message: 'State found', error: false, data: state });
});