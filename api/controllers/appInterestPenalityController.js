'use strict';
var db = require('../config/sequelize').db;
var Sequelize = require("sequelize");
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')
var generalConfig = require('../config/generalConfig');
var passport = require("../config/passport.js")();


// Page Controller .............................................................................

exports.getAllInterestPenalities = catchAsync(async (req, res, next) => {
  const interestPenalities = await db.models.appInterestPenality.findAll({
    attributes: ['id', 'days', 'processing_fee', 'interest', 'gst', 'penality'],
    where: {
      deleted_at: null
    }
  })
  if (JSON.stringify(interestPenalities) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Interest Penality found', error: false, data: interestPenalities });
});
 
exports.getInterestPenality = catchAsync(async (req, res, next) => { 
    var interestPenality = await db.models.appInterestPenality.findOne({
        attributes: ['id', 'days', 'processing_fee', 'interest', 'gst', 'penality'],
        where: {
        deleted_at: null,
        id: req.params.id
        }
    })
    var processingFee = interestPenality.processing_fee * 100;
    var processingFee = parseFloat(processingFee.toFixed(1))
    var Interest = interestPenality.interest * 100;
    var Interest = parseFloat(Interest.toFixed(1))
    var Gst = interestPenality.gst * 100;
    var Gst = parseFloat(Gst.toFixed(1)) 
    var Penality = interestPenality.penality * 100;
    var Penality = parseFloat(Penality.toFixed(1)) 
    
    var percentageCalculation = { "id": interestPenality.id, "days": interestPenality.days, "processing_fee": processingFee, "interest": Interest, "gst": Gst, "penality": Penality, }
    if (!interestPenality) return next(new AppError('Not Found', 404))
    res.json({ message: 'Interest Penality found', error: false, data: percentageCalculation });
}); 

exports.getInterest = catchAsync(async (req, res, next) => { 
  var interestPenality = await db.models.appInterestPenality.findOne({
      attributes: ['id', 'days', 'processing_fee', 'interest', 'gst', 'penality'],
      where: {
      deleted_at: null,
      id: req.params.id
      }
  })
  if (!interestPenality) return next(new AppError('Not Found', 404))
  res.json({ message: 'Interest Penality found', error: false, data: interestPenality });
}); 

exports.saveInterestPenality = catchAsync(async (req, res, next) => {   
  var {id, days, processing_fee, interest, gst, penality} = req.body;  
    var processingFee = processing_fee / 100;
    var Interest = interest / 100;
    var Gst = gst / 100;
    var Penality = penality != null ? penality / 100: null;
    if (id) {    
      const update = await db.models.appInterestPenality.update({
            days, processing_fee:processingFee, interest:Interest, gst:Gst, penality:Penality
        }, {
            where: {
                id
            }
        })
        if (!update) return next(new AppError('Not Found', 404))
        res.json({ message: 'Interest Penality update sucessfully', error: false, data: update });
    } else {   
        const create = await db.models.appInterestPenality.create({
            id, days, processing_fee:processingFee, interest:Interest, gst:Gst, penality:Penality
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'Interest Penality create sucessfully', error: false, data: create });
    }
});
 
exports.deleteInterestPenality = catchAsync(async (req, res, next) => {
  const current_date = new Date(); 
  const faq = await db.models.appInterestPenality.update({
    deleted_at : current_date,
    }, {where: {
      id: req.body.id
    },
    force: false
  })
  if (!faq) return next(new AppError('Not Found', 404))
  res.json({ message: 'Interest Penality delete sucessfully', error: false, data: faq });
});