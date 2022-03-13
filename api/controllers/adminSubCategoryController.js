'use strict';
var db = require('../config/sequelize').db; 
var _ = require('lodash');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync') 
var passport = require("../config/passport.js")();  

// Page Controller .............................................................................

exports.getAllSubCategory = catchAsync(async (req, res, next) => {
    const roles = await db.models.adminSubCategory.findAll({
        include: [{
            model: db.models.userCategory,
            as: 'userCategory',
            attributes: ['user_type', 'category']
        }],
        attributes: ['id', 'user_type', 'name', 'permission','created_at', 'updated_at'], 
        where: {
            deleted_at: null, 
        }
    })
    if (JSON.stringify(roles) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({
        message: 'Sub category found',
        error: false,
        data: roles
    });
});

exports.getAllSubCategoryByCatId = catchAsync(async (req, res, next) => {
    const roles = await db.models.adminSubCategory.findAll({ 
        attributes: ['id', 'user_type', 'name', 'permission','created_at', 'updated_at'], 
        where: {
            deleted_at: null, 
            user_type: req.params.id
        }
    })
    if (JSON.stringify(roles) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({
        message: 'Sub category found',
        error: false,
        data: roles
    });
});

exports.getRoles = catchAsync(async (req, res, next) => {
    const roles = await db.models.adminSubCategory.findAll({ 
        attributes: ['id', 'user_type', 'name', 'permission','created_at', 'updated_at'], 
        where: {
            deleted_at: null,  
        }
    })
    if (JSON.stringify(roles) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({
        message: 'Sub category found',
        error: false,
        data: roles
    });
});

exports.getSubCategoryById = catchAsync(async (req, res, next) => { 
    const role = await db.models.adminSubCategory.findOne({
        include: [{
            model: db.models.userCategory,
            as: 'userCategory',
            attributes: ['user_type', 'category']
        }],
        attributes: ['id', 'user_type', 'name', 'permission','created_at', 'updated_at'],
        where: {
            deleted_at: null,
            id: req.params.id
        }
    })
    
    const id = role.permission;
    const permission = await db.models.adminPermission.findAll({
        attributes: ['id', 'per_name', 'created_at', 'updated_at'], 
        where: {
            deleted_at: null, 
            id: id,
        }
    })  
    if (!role) return next(new AppError('Not Found', 404)) 
    res.json({
        message: 'Sub category found',
        error: false,
        data: role,
        permission: permission 
    });
}); 

exports.saveSubCategory = catchAsync(async (req, res, next) => {  
    const {id, user_type, name, permission} = req.body; 
    if (id) {  
        var update = await db.models.adminSubCategory.update({
            user_type, name, permission
            }, {
                where: {
                    id 
                }
            }) 
        if (!update) return next(new AppError('Not Found', 404))
        res.json({
            message: 'SubCategory Update Sucessfully',
            error: false,
            data: update
        }); 
    } else {
        const create = await db.models.adminSubCategory.create({
            user_type, name, permission 
        }) 
        if (!create) return next(new AppError('Not Found', 404))
        res.json({
            message: 'Sub category create Sucessfully',
            error: false,
            data: create
        });
    }
});

exports.deleteSubCategory = catchAsync(async (req, res, next) => { 
    const current_date = new Date();
    const role = await db.models.adminSubCategory.update({
        deleted_at : current_date,
        }, {
        where: {
            id: req.body.id
        },
        force: false
    })
    if (!role) return next(new AppError('Not Found', 404))
    res.json({ message: 'Sub category delete sucessfully', error: false, data: role });
});