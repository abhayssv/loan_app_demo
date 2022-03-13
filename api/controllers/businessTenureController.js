'use strict';
var db = require('../config/sequelize').db;
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')


// Page Controller .............................................................................

exports.getAllBusinessTenure = catchAsync(async (req, res, next) => {
  const interestPenalities = await db.models.appBusinessTenure.findAll({
    attributes: ['id', 'days', 'processing_fee', 'interest', 'gst', 'penality', 'status'],
    where: {
      deleted_at: null
    }
  })
  if (JSON.stringify(interestPenalities) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Business Tenure and Interset found', error: false, data: interestPenalities });
});
 
exports.getInterestPenality = catchAsync(async (req, res, next) => {  
  var interestPenality = await db.models.appBusinessTenure.findOne({
        attributes: ['id', 'days', 'processing_fee', 'interest', 'gst', 'penality', 'status'],
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
    
    var percentageCalculation = { "id": interestPenality.id, "days": interestPenality.days, "processing_fee": processingFee, "interest": Interest, "gst": Gst, "penality": Penality, "active": interestPenality.status == false ? 0 : 1 }
    if (!interestPenality) return next(new AppError('Not Found', 404))
    res.json({ message: 'Business Tenure and Interset found', error: false, data: percentageCalculation });
}); 

exports.getBusinessTenure = catchAsync(async (req, res, next) => { 
  var interestPenality = await db.models.appBusinessTenure.findAll({
      attributes: ['id', 'days', 'processing_fee', 'interest', 'gst', 'penality', 'status'],
      where: {
      deleted_at: null,
      status: 1
      }
  })
  if (JSON.stringify(interestPenality) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Business tenure found', error: false, data: interestPenality });
}); 


exports.getBusinessInterest = catchAsync(async (req, res, next) => { 
  var interestPenality = await db.models.appBusinessTenure.findOne({
      attributes: ['id', 'days', 'processing_fee', 'interest', 'gst', 'penality', 'status'],
      where: {
      deleted_at: null,
      days: req.params.days
      }
  })
  if (!interestPenality) return next(new AppError('Not Found', 404))
  res.json({ message: 'Business Interset found', error: false, data: interestPenality });
}); 

exports.saveInterestPenality = catchAsync(async (req, res, next) => {   
  console.log("BODY", req.body);
  var {id, days, processing_fee, interest, gst, penality, active} = req.body;  
    var processingFee = processing_fee / 100;
    var Interest = interest / 100;
    var Gst = gst / 100;
    var Penality = penality != null ? penality / 100: null;
    if (id) {    
      const update = await db.models.appBusinessTenure.update({
            days, processing_fee:processingFee, interest:Interest, gst:Gst, penality:Penality, status: active == true ? 1 : 0
        }, {
            where: {
                id
            }
        })
        if (!update) return next(new AppError('Not Found', 404))
        res.json({ message: 'Business Tenure and Interset update sucessfully', error: false, data: update });
    } else {   
        const create = await db.models.appBusinessTenure.create({
            id, days, processing_fee:processingFee, interest:Interest, gst:Gst, penality:Penality, status: active == true ? 1 : 0
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'Business Tenure and Interset create sucessfully', error: false, data: create });
    }
});
 
exports.deleteInterestPenality = catchAsync(async (req, res, next) => {
  const current_date = new Date(); 
  const faq = await db.models.appBusinessTenure.update({
    deleted_at : current_date,
    }, {where: {
      id: req.body.id
    },
    force: false
  })
  if (!faq) return next(new AppError('Not Found', 404))
  res.json({ message: 'Interest Penality delete sucessfully', error: false, data: faq });
});