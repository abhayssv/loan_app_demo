'use strict';
var db = require('../config/sequelize').db; 
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')

// Category Controller .............................................................................

exports.getAllCategory = catchAsync(async (req, res, next) => {
    const categ = await db.models.userCategory.findAll({
        attributes: ['user_type', 'category', 'description','created_at', 'updated_at'], 
        where: {
            deleted_at: null, 
        }
    })
    if (JSON.stringify(categ) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({
        message: 'Category found',
        error: false,
        data: categ
    });
});

exports.getCategoryById = catchAsync(async (req, res, next) => { 
    const categ = await db.models.userCategory.findOne({
        attributes: ['user_type', 'category', 'description','created_at', 'updated_at'], 
        where: {
            deleted_at: null,
            user_type: req.params.id
        }
    })
    if (!categ) return next(new AppError('Not Found', 404))
    res.json({
        message: 'Category found',
        error: false,
        data: categ
    });
}); 

exports.saveCategory = catchAsync(async (req, res, next) => { 
    const {user_type, category, description} = req.body; 
    if (user_type) {  
        var update = await db.models.userCategory.update({
            category, description
            }, {
                where: {
                    user_type 
                }
            }) 
        if (!update) return next(new AppError('Not Found', 404))
        res.json({
            message: 'Categry Update Sucessfully',
            error: false,
            data: update
        }); 
    } else {
        const create = await db.models.userCategory.create({
            category, description
        }) 
        if (!create) return next(new AppError('Not Found', 404))
        res.json({
            message: 'Category Create Sucessfully',
            error: false,
            data: create
        });
    }
});

exports.deleteCategory = catchAsync(async (req, res, next) => { 
    const current_date = new Date();
    const categ = await db.models.userCategory.update({
        deleted_at : current_date,
        }, {
        where: {
            user_type: req.body.id
        },
        force: false
    })
    if (!categ) return next(new AppError('Not Found', 404))
    res.json({ message: 'Category delete sucessfully', error: false, data: categ });
});