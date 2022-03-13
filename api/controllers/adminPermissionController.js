'use strict';
var db = require('../config/sequelize').db; 
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync') 
var passport = require("../config/passport.js")();  
const jwt_decode = require('jwt-decode');
var moment = require('moment');
const {Op} = require('sequelize');

// Page Controller .............................................................................

exports.getAllPermission = catchAsync(async (req, res, next) => {
    const roles = await db.models.adminPermission.findAll({
        attributes: ['id', 'per_name', 'created_at', 'updated_at'], 
        where: {
            deleted_at: null, 
        }
    })
    if (JSON.stringify(roles) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({
        message: 'Permission found',
        error: false,
        data: roles
    });
});

exports.getPermissionById = catchAsync(async (req, res, next) => { 
    const role = await db.models.adminPermission.findOne({
        attributes: ['id', 'per_name', 'created_at', 'updated_at'],
        where: {
            deleted_at: null,
            id: req.params.id
        }
    })
    if (!role) return next(new AppError('Not Found', 404))
    res.json({
        message: 'Role found',
        error: false,
        data: role
    });
}); 

exports.savePermission = catchAsync(async (req, res, next) => { 
    const {id, per_name} = req.body; 
    if (id) {  
        var update = await db.models.adminPermission.update({
            per_name 
            }, {
                where: {
                    id 
                }
            }) 
        if (!update) return next(new AppError('Not Found', 404))
        res.json({
            message: 'Permission Update Sucessfully',
            error: false,
            data: update
        }); 
    } else {
        const create = await db.models.adminPermission.create({
            per_name 
        }) 
        if (!create) return next(new AppError('Not Found', 404))
        res.json({
            message: 'Permission Create Sucessfully',
            error: false,
            data: create
        });
    }
});

exports.deletePermission = catchAsync(async (req, res, next) => { 
    const current_date = new Date();
    const role = await db.models.adminPermission.update({
        deleted_at : current_date,
        }, {
        where: {
            id: req.body.id
        },
        force: false
    })
    if (!role) return next(new AppError('Not Found', 404))
    res.json({ message: 'Interest Penality delete sucessfully', error: false, data: role });
});

exports.checkPermission = catchAsync(async (req, res, next) => {   
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id; 
    const user = await db.models.user.findOne({ 
        attributes: ['id', 'email', 'user_type', 'has_role', 'contact_per'],
        where: {
            deleted_at: null,
            id: user_id
        }
    })
    
    const role = await db.models.adminSubCategory.findOne({
        include: [{
            model: db.models.userCategory,
            as: 'userCategory',
            attributes: ['user_type', 'category']
        }],
        attributes: ['id', 'user_type', 'name', 'permission','created_at', 'updated_at'],
        where: {
            deleted_at: null,
            id: user.has_role
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
        permission: permission,
        user:user 
    });
});

// Get State List
exports.getStateList = catchAsync(async (req, res, next) => {     
    const stateList = await db.models.appState.findAll({
        attributes: ['state_id', 'state_name'], 
    }) 
    if (!stateList) return next(new AppError('Not Found', 404)) 
    res.json({
        message: 'State List found',
        error: false,
        data: stateList, 
    });
});

// Get City List
exports.getCityList = catchAsync(async (req, res, next) => {  
    const {state_id} = req.params;
    const cityList = await db.models.appCity.findAll({
        attributes: ['city_id', 'city_name'], 
        where:{
            state_id: state_id
        }
    })  
    if (!cityList) return next(new AppError('Not Found', 404)) 
    res.json({
        message: 'State List found',
        error: false,
        data: cityList, 
    });
});

// Save Location Restriction 

exports.saveLocationRestriction = catchAsync(async (req, res, next) => { 
    const {state, city} = req.body;  
    let created;
    if(city === ""){
        created = {state:state} 
        var result = await db.models.locationRestriction.findOne({
            attributes: ['state', 'city'], 
            where:{
                state: state,
                deleted_at:null
            }
        }) 
        var message = state + " state is already Banned";
    }else{ 
        created = {state:state, city:city}
        var result = await db.models.locationRestriction.findOne({
            attributes: ['state', 'city'], 
            where:{
                state: state,
                city: null, 
                deleted_at:null
            } 
        })  
        var message = state + " state is already Banned";
    }
    if(result == null){ 
        var result = await db.models.locationRestriction.findOne({
            attributes: ['state', 'city'], 
            where:{
                state: state,
                city: city,
                deleted_at:null
            } 
        })     
        var message = state + " state and "+ city+ " city are already Banned"; 
    } 
    if(result != null){
        res.json({
            message: message,
            error: true, 
            status_code: 202
        });  
    }else{
        const create = await db.models.locationRestriction.create(created) 
        if (!create) return next(new AppError('Not Found', 404))
        res.json({
            message: 'Location Restriction save sucessfully',
            error: false,
            data: create,
            status_code: 200
        });
    } 
});

// Get Location Restriction List
exports.getLocationRestriction = catchAsync(async (req, res, next) => {  
    const locationRestriction = await db.models.locationRestriction.findAll({
        attributes: ['id', 'state', 'city'],  
        where: {
            deleted_at:null
        }
    })  
    if (!locationRestriction) return next(new AppError('Not Found', 404)) 
    res.json({
        message: 'Location restriction List found',
        error: false,
        data: locationRestriction, 
    });
});

// Delete Location Restriction 

exports.deleteLocationRestriction = catchAsync(async (req, res, next) => {  
    var c_Date = moment().format("YYYY-MM-DD HH:mm:ss");
    const deleted = await db.models.locationRestriction.update({
            deleted_at: c_Date,
        },{
            where:{
                id: req.body.id
            } 
        })
    if (!deleted) return next(new AppError('Not Found', 404)) 
    res.json({
        message: 'Location restriction deleted',
        error: false, 
    });
});

// Check location Restriction

exports.getCheckLoacationRestriction = catchAsync(async (req,res, next) =>{
    const {state, city} = req.body; 
    let locationRestriction = await db.models.locationRestriction.findOne({
        attributes: ['id', 'state', 'city'],  
        where: {
            deleted_at:null,
            state: state,
            city: city      
        }
    })  
    if(!locationRestriction){ 
        locationRestriction = await db.models.locationRestriction.findOne({
            attributes: ['id', 'state', 'city'],  
            where: {
                deleted_at:null,
                state: state,
                city: null      
            }
        })  
    }
    if (!locationRestriction) return next(new AppError('Not Found', 404)) 
    res.json({
        message: 'Location restriction List found',
        error: false,
        code: locationRestriction, 
    });
})

