'use strict';
var db = require('../config/sequelize').db;
var Sequelize = require("sequelize");
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')
var generalConfig = require('../config/generalConfig');
var passport = require("../config/passport.js")();
const jwt_decode = require('jwt-decode');
var moment = require('moment')  


// Page Controller .............................................................................

exports.getAllCredit = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;  
  const user = await db.models.appCredit.findAll({
    attributes: ['id', 'user_id', 'level', 'credit'],
    where: {
      deleted_at: null, 
      user_id
    }
  })
  if (JSON.stringify(user) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Credit found', error: false, data: user });
});
  
exports.getCreditById = catchAsync(async (req, res, next) => {     
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;   
  const credit = await db.models.appCredit.findOne({
    attributes: ['id', 'user_id', 'level', 'credit'],
    where: {
      deleted_at: null,
      user_id, level: req.body.level
    }
  }) 
  if (!credit) return next(new AppError('Not Found', 404))
  res.json({ message: 'Credit found', error: false, data: credit });
});  

exports.saveCredit = catchAsync(async (req, res, next) => {  
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id; 
    var applyLoan = await db.models.appApplyLoan.findOne({
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
        order: [
            ['id', 'DESC']
        ],
        where: {
            deleted_at: null,
            user_id
        }
    })
    if(applyLoan){ 
      var current_date = moment().format('YYYY-MM-DD');
      var payable_date = moment(applyLoan.payable_date).format('YYYY-MM-DD');
    
      const status = await db.models.appApplyLoan.update({
        status : 4,
        }, {where: {
            loan_id: applyLoan.loan_id
        },
        force: false
      })
      if(payable_date >= current_date){
        var getUserRefCoins = await db.models.manageCoins.findOne({
            attributes: ['user_id', 'v_coins'],
            where: {
                user_id : applyLoan.user_id
            }
        })
        if(getUserRefCoins){
          var addCoinsRefUserAccount = getUserRefCoins.v_coins + 100;  
          var addCoins = await db.models.manageCoins.update({
              v_coins: addCoinsRefUserAccount
          }, {
              where: {
              user_id: getUserRefCoins.user_id
              }
          })  
        } else{ 
          const addCoins = await db.models.manageCoins.create({ 
              user_id : applyLoan.user_id,
              v_coins: 100
          })
        }
      } 
    }
    const {level} = req.body;
    const user = await db.models.appCredit.findOne({ 
        where: { 
        user_id, level
        }
    })   
    if (user) {
        if(user.credit != 10) var credit = user.credit + 1;
        const update = await db.models.appCredit.update({
        level, credit
      }, {
        where: {
          user_id
        }
      })
      if (!update) return next(new AppError('Not Found', 404))
      res.json({ message: 'Credit Update sucessfully', error: false, data: update });
    } else { 
        const create = await db.models.appCredit.create({
            user_id, level,credit: 1,
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'Credit create sucessfully', error: false, data: create });
    }
});
 
exports.savePendingCredit = catchAsync(async (req, res, next) => {  
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id; 
  var applyLoan = await db.models.appApplyLoan.findOne({
      attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
      order: [
          ['id', 'DESC']
      ],
      where: {
          deleted_at: null,
          user_id
      }
  })
  if(applyLoan){ 
    var current_date = moment().format('YYYY-MM-DD');
    var payable_date = moment(applyLoan.payable_date).format('YYYY-MM-DD');
    const {loanStatus} = req.body;
    const status = await db.models.appApplyLoan.update({
      status : loanStatus,
      }, {where: {
          loan_id: applyLoan.loan_id
      },
      force: false
    })
    if(payable_date >= current_date){
      var getUserRefCoins = await db.models.manageCoins.findOne({
          attributes: ['user_id', 'v_coins'],
          where: {
              user_id : applyLoan.user_id
          }
      })
      if(getUserRefCoins){
        var addCoinsRefUserAccount = getUserRefCoins.v_coins + 100;  
        var addCoins = await db.models.manageCoins.update({
            v_coins: addCoinsRefUserAccount
        }, {
            where: {
            user_id: getUserRefCoins.user_id
            }
        })  
      } else{ 
        const addCoins = await db.models.manageCoins.create({ 
            user_id : applyLoan.user_id,
            v_coins: 100
        })
      }
    } 
  }
  const {level} = req.body;
  const user = await db.models.appCredit.findOne({ 
      where: { 
      user_id, level
      }
  })   
  if (user) {
      if(user.credit != 10) var credit = user.credit + 1;
      const update = await db.models.appCredit.update({
      level, credit
    }, {
      where: {
        user_id
      }
    })
    if (!update) return next(new AppError('Not Found', 404))
    res.json({ message: 'Credit Update sucessfully', error: false, data: update });
  } else { 
      const create = await db.models.appCredit.create({
          user_id, level,credit: 1,
      })
      if (!create) return next(new AppError('Not Found', 404))
      res.json({ message: 'Credit create sucessfully', error: false, data: create });
  }
});

exports.saveBusinessCredit = catchAsync(async (req, res, next) => {  
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id; 
  var applyLoan = await db.models.appApplyLoan.findOne({
    attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
    order: [
        ['id', 'DESC']
    ],
    where: {
        deleted_at: null,
        user_id
    }
  })
  if(applyLoan){ 
    var current_date = moment().format('YYYY-MM-DD');
    var payable_date = moment(applyLoan.payable_date).format('YYYY-MM-DD');  
    if(payable_date == current_date){ 
      const status = await db.models.appApplyLoan.update({
        status : 4,
        }, {where: {
            loan_id: applyLoan.loan_id
        },
        force: false
      })
      var getUserRefCoins = await db.models.manageCoins.findOne({
        attributes: ['user_id', 'v_coins'],
        where: {
          user_id : applyLoan.user_id
        }
      })
      if(getUserRefCoins){
        var addCoinsRefUserAccount = getUserRefCoins.v_coins + 100;  
          await db.models.manageCoins.update({
            v_coins: addCoinsRefUserAccount
        }, {
          where: {
            user_id: getUserRefCoins.user_id
          }
        })  
      } else{ 
          await db.models.manageCoins.create({ 
            user_id : applyLoan.user_id,
            v_coins: 100
        })
      }
      const {level} = req.body;
      const user = await db.models.appCredit.findOne({ 
          where: { 
          user_id, level
          }
      })   
      if (user) {
          if(user.credit != 10) var credit = user.credit + 1;
          const update = await db.models.appCredit.update({
          level, credit
        }, {
          where: {
            user_id
          }
        })
        if (!update) return next(new AppError('Not Found', 404))
        res.json({ message: 'Credit Update sucessfully', error: false, data: update });
      } else { 
        const create = await db.models.appCredit.create({
          user_id, level, credit: 1,
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'Credit create sucessfully', error: false, data: create });
      }
    }else if(payable_date < current_date){ 
      const status = await db.models.appApplyLoan.update({
        status : 4,
        }, {where: {
            loan_id: applyLoan.loan_id,
        },
        force: false
      })
      if (!status) return next(new AppError('Not Found', 404))
      res.json({ message: 'Sataus change sucessfully', error: false, data: status });
    }else{
      res.json({ message: 'Payment Sucessfully', error: false });
    } 
  } 
});

exports.saveEmpInstallmentCredit = catchAsync(async (req, res, next) => {  
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;  
  var applyLoan = await db.models.appApplyLoan.findOne({
      attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
      order: [
          ['id', 'DESC']
      ],
      where: {
          deleted_at: null,
          user_id
      }
  })
  if(applyLoan){ 
    var current_date = moment().format('YYYY-MM-DD');
    var payable_date = moment(applyLoan.payable_date).format('YYYY-MM-DD');
  
    if(payable_date >= current_date && applyLoan.remaining_amount <=0){
      const status = await db.models.appApplyLoan.update({
        status : 4,
        }, {where: {
            loan_id: applyLoan.loan_id
        },
        force: false
      })
      var getUserRefCoins = await db.models.manageCoins.findOne({
          attributes: ['user_id', 'v_coins'],
          where: {
              user_id : applyLoan.user_id
          }
      })
      if(getUserRefCoins){
        var addCoinsRefUserAccount = getUserRefCoins.v_coins + 100;  
        var addCoins = await db.models.manageCoins.update({
            v_coins: addCoinsRefUserAccount
        }, {
            where: {
            user_id: getUserRefCoins.user_id
            }
        })  
      } else{ 
        const addCoins = await db.models.manageCoins.create({ 
            user_id : applyLoan.user_id,
            v_coins: 100
        })
      }
      const {level} = req.body;
      const user = await db.models.appCredit.findOne({ 
          where: { 
          user_id, level
          }
      })   
      if (user) {
          if(user.credit != 10) var credit = user.credit + 1;
          const update = await db.models.appCredit.update({
          level, credit
        }, {
          where: {
            user_id
          }
        })
        if (!update) return next(new AppError('Not Found', 404))
        res.json({ message: 'Credit Update sucessfully', error: false, data: update });
      } else { 
          const create = await db.models.appCredit.create({
              user_id, level,credit: 1,
          })
          if (!create) return next(new AppError('Not Found', 404))
          res.json({ message: 'Credit create sucessfully', error: false, data: create });
      }
    }
    res.json({ message: 'This is not final payment.', error: false, data: "null" }); 
  } 
});
 