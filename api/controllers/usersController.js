'use strict';
var db = require('../config/sequelize').db;
var Sequelize = require("sequelize");
var _ = require('lodash');
const catchAsync = require('../utils/catchAsync')
const Op = Sequelize.Op;
var generalConfig = require('../config/generalConfig');
var commonLib = require('../lib/common');
const url = require('url'); 

exports.getAllUsers = function(req, res, next) {
    db.models.user.findAll({
        include: [{
            model: db.models.adminSubCategory, 
            attributes: ['name']
        }],
        attributes: ['id', 'email', 'firstname', 'lastname', 'password', 'profile_image', 'mobile_no', 'user_type', 'has_role', 'contact_per', 'active'],
        where: {
            deleted_at: null
        }
    })
    .then(function(users) {
        if (users) {
            res.json({
                message: 'Users found',
                error: false,
                data: users
            });
        } else {
            res.json({
                message: 'No Users found',
                error: true,
                data: null
            });
        }
    })
    .catch(function(err) {
        console.log(err);
        res.json({
            message: 'Oops! Something went wrong.',
            error: true,
            data: null
        });
    })
};

exports.getUsers = function(req, res, next) {
    db.models.user.findAll({
            attributes: ['id', 'email', 'firstname', 'lastname', 'password', 'profile_image', 'mobile_no', 'user_type', 'has_role', 'active'],
            where: {
                deleted_at: null,
                active: 1
            }
        })
        .then(function(users) {
            if (users) {
                res.json({
                    message: 'Users found',
                    error: false,
                    data: users
                });
            } else {
                res.json({
                    message: 'No Users found',
                    error: true,
                    data: null
                });
            }
        })
        .catch(function(err) {
            res.json({
                message: 'Oops! Something went wrong.',
                error: true,
                data: null
            });
        })
};
exports.getUser = catchAsync(async (req, res, next) => { 
    const user = await db.models.user.findOne({
        attributes: ['id', 'email', 'firstname', 'lastname', 'profile_image', 'mobile_no', 'has_role', 'user_type', 'active'],
      where: {
        deleted_at: null,
        id: req.params.id
      }
    }) 
    if (JSON.stringify(user) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    var users = [];
    // kyc_images.forEach(function (kyc_image, index) {
      commonLib.getProFileImage(user, function () {
        users.push(user)
      });
    // }) 
    if (!users) return next(new AppError('Not Found', 404))
    res.json({ message: 'User found', error: false, data: users });
}); 

exports.changeStatus = function(req, res, next) { 
    if (req.body.key == 'active') {
        db.models.user.update({
                active: (req.body.status == true) ? '1' : '0'
            }, {
                where: {
                    deleted_at: null,
                    id: req.body.user_id
                }
            })
            .then(function(updated) {
                if (updated) {
                    res.json({
                        message: 'Status updated successfully',
                        error: false,
                        data: updated
                    });
                } else {
                    res.json({
                        message: 'Error in updating user',
                        error: true,
                        data: null
                    });
                }
            })
            .catch(function(err) {
                res.json({
                    message: 'Oops! Something went wrong.',
                    error: true,
                    data: null
                });
            })
    } else if (req.body.key == 'has_role') {
        db.models.user.update({
                has_role: (req.body.active == true) ? '1' : '0'
            }, {
                where: {
                    deleted_at: null,
                    id: req.body.id
                }
            })
            .then(function(updated) {
                if (updated) {
                    res.json({
                        message: 'Status updated successfully',
                        error: false,
                        data: updated
                    });
                } else {
                    res.json({
                        message: 'Error in updating question',
                        error: true,
                        data: null
                    });
                }
            })
            .catch(function(err) {
                res.json({
                    message: 'Oops! Something went wrong.',
                    error: true,
                    data: null
                });
            })
    } else {
        res.json({
            message: 'Invalid argument provided.',
            error: true,
            data: null
        });
    }
}

// Change Contact Permission

exports.changeContactPermission = function(req, res, next) {  
    if (req.body.key == 'contact_per') {
        db.models.user.update({
                contact_per: (req.body.status == true) ? '1' : '0'
            }, {
                where: {
                    deleted_at: null,
                    id: req.body.user_id
                }
            })
            .then(function(updated) {
                if (updated) {
                    res.json({
                        message: 'Contact Permission updated successfully',
                        error: false,
                        data: updated
                    });
                } else {
                    res.json({
                        message: 'Error in updating user',
                        error: true,
                        data: null
                    });
                }
            })
            .catch(function(err) {
                res.json({
                    message: 'Oops! Something went wrong.',
                    error: true,
                    data: null
                });
            })
    } else {
        res.json({
            message: 'Invalid argument provided.',
            error: true,
            data: null
        });
    }
}

exports.saveUser = catchAsync(async (req, res, next) => {  
    var {profile_image} = req.files;  
    let updateQuery;
    if(profile_image){
        var pro_image = profile_image.map(value => value.filename);
    } 
    var { id, firstname, lastname, email, password, mobile_no, user_type, has_role, active } = req.body; 
    if (password) {
        var passwords = generalConfig.encryptPassword(password);
    }  
    if (id) {
        var users =await db.models.user.findOne({
            attributes: ['id', 'email', 'firstname', 'lastname', 'password', 'profile_image', 'mobile_no', 'has_role', 'user_type', 'active'],
            where: {
                deleted_at: null,
                id
            }
        })   
        if(users.profile_image != null && profile_image){
          const profileImage = {"profile_image": users.profile_image}
          commonLib.removeAdminPorfileImages(profileImage);
        }
        
        if(password){
            updateQuery = { firstname, lastname, email, password: passwords, profile_image: pro_image, mobile_no, user_type, has_role, active }
        }else{
            updateQuery = { firstname, lastname, email, profile_image: pro_image, mobile_no, user_type, has_role, active }
        }
        
        db.models.user.update(updateQuery, {
            where: {
                id
            }
        })
        .then(function(updated) {
        if (updated) {
            res.json({
                message: 'User updated successfully',
                error: false,
                data: updated
            });
        } else {
            res.json({
                message: 'Error in updating status',
                error: true,
                data: null
            });
        }
        })
        .catch(function(err) {
        res.json({
            message: 'Oops! Something went wrong.',
            error: true,
            data: null,
            err: err.message
        });
        })
    } else {
        db.models.user.create({
            firstname, lastname, email, password: passwords, profile_image: pro_image, mobile_no, user_type, has_role, active
        })
        .then(function(users) {
        if (users) {
            res.json({
                message: 'User created successfully',
                error: false,
                data: users
            });
        } else {
            res.json({
                message: 'Error in creating user',
                error: true,
                data: null
            });
        }
        })
        .catch(function(err) {
            res.json({
                message: 'Oops! Something went wrong.',
                error: true,
                data: null,
                err: err.message
            });
        })
    }
})

// exports.deleteUser = function(req, res, next) {
//   db.models.user.destroy({
//     where: {
//         id: req.params.id
//     },
//     force: false
//   })
//   .then(function(deleted) {
//     if (deleted) {
//       res.json({
//           message: 'User has been deleted successfully.',
//           error: false,
//           data: null
//       });
//     } else {
//       res.json({
//           message: 'Error in deleting user.',
//           error: true,
//           data: null
//       });
//     }
//   })
//   .catch(function(err) {
//     res.json({
//         message: 'Oops! Something went wrong',
//         error: true,
//         data: null
//     });
//   })
// }
exports.deleteUser = catchAsync(async (req, res, next) => {
    const current_date = new Date(); 
    const user = await db.models.user.update({
      deleted_at : current_date,
      }, {where: {
        id: req.body.user_id
      },
      force: false
    })
    if (!user) return next(new AppError('Not Found', 404))
    res.json({ message: 'Users delete sucessfully', error: false, data: user });
});

// Get First Reviewer
exports.getFirstReviewer = catchAsync(async (req, res, next) => { 
    const user = await db.models.user.findAll({
        attributes: ['id', 'firstname', 'lastname'],
      where: {
        deleted_at: null,
        user_type: 2,
        has_role: 4
      }
    })  
    if (!user) return next(new AppError('Not Found', 404))
    res.json({ message: 'User found', error: false, data: user });
}); 
 
// Get Second Reviewer
exports.getSecondReviewer = catchAsync(async (req, res, next) => { 
    const user = await db.models.user.findAll({
        attributes: ['id', 'firstname', 'lastname'],
      where: {
        deleted_at: null,
        user_type: 2,
        has_role: 5
      }
    })  
    if (!user) return next(new AppError('Not Found', 404))
    res.json({ message: 'User found', error: false, data: user });
}); 

// Search Users

exports.getSearchUsers = catchAsync(async (req, res, next) => { 
    var query = url.parse(req.url, true).query;
    const {name, email, mobile_no, user_type, user_role, user_status } = query;
    let whereClause;
    if(name != ""){
        whereClause = {
            deleted_at : null,
            firstname : name
        }
    } else if(email != ""){
        whereClause = {
            deleted_at : null,
            email : email
        }
    } else if(mobile_no != ""){
        whereClause = {
            deleted_at : null,
            mobile_no : mobile_no
        }
    } else if(user_type != ""){
        whereClause = {
            deleted_at : null,
            user_type : user_type
        }
    } else if(user_role != ""){
        whereClause = {
            deleted_at : null,
            has_role : user_role
        } 
    } else if(user_status != ""){
        whereClause = {
            deleted_at : null,
            active : user_status
        } 
    } else {
        whereClause = {
            deleted_at : null
        }
    }
    const user = await db.models.user.findAll({
        include: [{
            model: db.models.adminSubCategory, 
            attributes: ['name']
        }],
        attributes: ['id', 'email', 'firstname', 'lastname', 'mobile_no', 'user_type', 'has_role', 'contact_per','active'],
        where: whereClause
    })
    if (!user) return next(new AppError('Not Found', 404))
    res.json({ message: 'User found', error: false, data: user });
}); 
