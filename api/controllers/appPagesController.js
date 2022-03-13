'use strict';
var db = require('../config/sequelize').db;
var Sequelize = require("sequelize");
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')
var generalConfig = require('../config/generalConfig');
var passport = require("../config/passport.js")();
const { Op } = require("sequelize");

// Page Controller .............................................................................

exports.getAllPages = catchAsync(async (req, res, next) => {
  const pages = await db.models.appPage.findAll({
    attributes: ['page_id', 'slug', 'title', 'description'],
    where: {
      deleted_at: null
    }
  })
  if (JSON.stringify(pages) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Pages found', error: false, data: pages });
});

exports.getPages = catchAsync(async (req, res, next) => {
  const pages = await db.models.appPage.findAll({
    attributes: ['page_id', 'slug', 'title', 'description'],
    where: {
      deleted_at: null, 
    }
  })
  if (JSON.stringify(pages) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Pages found', error: false, data: pages });
});

exports.getPage = catchAsync(async (req, res, next) => {
  const pages = await db.models.appPage.findOne({
    attributes: ['page_id', 'slug', 'title', 'description'],
    where: {
      deleted_at: null,
      page_id: req.params.page_id
    }
  })
  if (!pages) return next(new AppError('Not Found', 404))
  res.json({ message: 'Pages found', error: false, data: pages });
});

exports.getPageBySlug = catchAsync(async (req, res, next) => {
  const pages = await db.models.appPage.findOne({
    attributes: ['page_id', 'slug', 'title', 'description'],
    where: {
      deleted_at: null,
      slug: req.params.slug
    }
  })
  if (!pages) return next(new AppError('Not Found', 404))
  res.json({ message: 'Pages found', error: false, data: pages });
});


exports.savePage = catchAsync(async (req, res, next) => {
  const {page_id,title,description} = req.body;
  const Title = title.toLowerCase();
  const Slug = Title.replace(/\s/g, "-");
    if (page_id) { 
      const update = await db.models.appPage.update({
        title,description,
      }, {
        where: {
          page_id
        }
      })
      if (!update) return next(new AppError('Not Found', 404))
      res.json({ message: 'Page update sucessfully', error: false, data: update });
    } else {
      const slugs = await db.models.appPage.findOne({
        attributes: ['slug' ],
        where: {
          deleted_at: null, 
          slug: Slug
        }
      }) 
      if(!slugs){
        const create = await db.models.appPage.create({
          slug: Slug,title,description,
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'Pages create sucessfully', error: false, data: create });
      }else{
        res.json({ message: 'This Page is Already Exits', error: true, data: null });
      }       
    }
});
 
// exports.deletePage = catchAsync(async (req, res, next) => {
//   const current_date = new Date(); 
//   const page = await db.models.appPage.update({
//     deleted_at : current_date,
//     }, {where: {
//       page_id: req.body.page_id
//     },
//     force: false
//   })
//   if (!page) return next(new AppError('Not Found', 404))
//   res.json({ message: 'Pages delete sucessfully', error: false, data: page });
// });