'use strict';
var db = require('../config/sequelize').db;
var Sequelize = require("sequelize");
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')
var generalConfig = require('../config/generalConfig');
var passport = require("../config/passport.js")();


// Page Controller .............................................................................

exports.getAllfaqs = catchAsync(async (req, res, next) => {
  const faqs = await db.models.appFaq.findAll({
    attributes: ['faq_id', 'question', 'answer'],
    where: {
      deleted_at: null
    }
  })
  if (JSON.stringify(faqs) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'FAQ found', error: false, data: faqs });
});
 

exports.getFaq = catchAsync(async (req, res, next) => { 
    const faqs = await db.models.appFaq.findOne({
        attributes: ['faq_id', 'question', 'answer'],
        where: {
        deleted_at: null,
        faq_id: req.params.faq_id
        }
    })
    
    if (!faqs) return next(new AppError('Not Found', 404))
    res.json({ message: 'Pages found', error: false, data: faqs });
}); 

exports.saveFaq = catchAsync(async (req, res, next) => { 
    const {faq_id, question, answer} = req.body;    
    const Slug = question.replace(/\s/g, "-");
    if (faq_id) {  
        const update = await db.models.appFaq.update({
        question,answer,
      }, {
        where: {
          faq_id
        }
      })
      if (!update) return next(new AppError('Not Found', 404))
      res.json({ message: 'FAQ update sucessfully', error: false, data: update });
    } else { 
        const create = await db.models.appFaq.create({
            question, answer, slug: Slug
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'FAQ create sucessfully', error: false, data: create });
    }
});
 
exports.deleteFaq = catchAsync(async (req, res, next) => {
  const current_date = new Date(); 
  const faq = await db.models.appFaq.update({
    deleted_at : current_date,
    }, {where: {
      faq_id: req.body.faq_id
    },
    force: false
  })
  if (!faq) return next(new AppError('Not Found', 404))
  res.json({ message: 'FAQ delete sucessfully', error: false, data: faq });
});