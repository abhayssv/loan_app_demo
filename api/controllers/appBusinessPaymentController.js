'use strict';
var db = require('../config/sequelize').db;
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt_decode = require('jwt-decode');
const url = require('url'); 
var moment = require('moment');
const cfSdk = require('cashfree-sdk');
const FormData = require('form-data');
const { Op } = require("sequelize");

  exports.savePaymentDetail = catchAsync(async (req, res, next) => { 
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id; 
    const {loan_id, paid_redeem_coins, penality, type, tx_msg, tx_time, order_id, tx_status, signature, order_amount, payment_mode, reference_id } = req.body;
    const ordersAmount = order_amount;
    const paidAmount = ordersAmount - penality;
    const loanDetails = await db.models.appApplyLoan.findOne({
      attributes: ['user_id', 'loan_id', 'remaining_amount'],
      where: {
        user_id, loan_id,
      }
    })  
    const create = await db.models.appBusinessPayment.create({
      user_id, loan_id, paid_redeem_coins, penality, type, tx_msg, tx_time, order_id, tx_status, signature, order_amount, payment_mode, reference_id
    }); 
    if (!create) return next(new AppError('Not Found', 404)) 
    const dedRemainingAmount = loanDetails.remaining_amount - paidAmount - paid_redeem_coins / 10; 
    const updated = await db.models.appApplyLoan.update({
      remaining_amount: dedRemainingAmount
    }, {
        where: {
        user_id, loan_id
        }
    })
    if (!updated) return next(new AppError('Not Found', 404))
    if(paid_redeem_coins != 0){
    const updated = await db.models.manageCoins.update({
        v_coins: 0
    }, {
        where: {
        user_id
        }
    })
    if (!updated) return next(new AppError('Not Found', 404))
    res.json({ message: 'Payment detail and coin remove sucessfully', error: false, data: updated });
    }  
    res.json({ message: 'Payment detail added sucessfully', error: false, data: updated });
  });

  exports.saveFlatDetail = catchAsync(async (req, res, next) => {  
      var {loan_id, order_amount, penality} = req.body; 
      var c_Date = moment().format('YYYY-MM-DD HH:mm:ss');
      var loan = await db.models.appApplyLoan.findOne({
          attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
          where: {
              deleted_at: null,
              loan_id,
          }
      })
      var payment_detail = {      
          "txTime": c_Date,
          "txStatus": "Cash Flat",
          "orderAmount": order_amount,
          "paymentMode": "Offline"
      } 
      const create = await db.models.appPayment.create({
          user_id: loan.user_id, 
          loan_id, 
          payment_detail, 
          paid_redeem_coins: 0, 
          penality
      }) 
      if(create){ 
          const status = (loan.remaining_amount == order_amount ) ? "4": loan.status;
          var dedRemainingAmount = await db.models.appApplyLoan.update({
              remaining_amount: loan.remaining_amount - order_amount,
              status
          }, {
              where: {
                  loan_id
              }
          })
          if (!create) return next(new AppError('Not Found', 404))
          res.json({ message: 'Payment sucessfully', error: false, data: create });
      } else{
          res.json({ message: 'Payment detail Not added sucessfully', error: true });
      }     
  });

  exports.saveExtendDetail = catchAsync(async (req, res, next) => {  
      var decoded = jwt_decode(req.headers.authorization);
      var admin_user_id = decoded.id;  
      var {loan_id, ext_days, ext_required_amount, interest, required_amount} = req.body;
      var total_payable_amount = parseInt(interest) + parseInt(required_amount); 
      var c_Date = moment().format('YYYY-MM-DD HH:mm:ss');
      var loan = await db.models.appApplyLoan.findOne({
          attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
          where: {
              deleted_at: null,
              loan_id,
          }
      })
      var payment_detail = {      
          "txTime": c_Date,
          "txStatus": "Extend",
          "orderAmount": ext_required_amount,
          "paymentMode": "Offline"
      } 
      const create = await db.models.appPayment.create({
          user_id: loan.user_id, 
          loan_id, 
          payment_detail, 
          paid_redeem_coins: 0, 
          penality: 0
      }) 
      if(create){  
          var loanExtend = await db.models.appApplyLoan.update({
              status: 8
          }, {
              where: {
                  loan_id
              }
          })
          if(loanExtend){ 
              var p_Date = moment().add(ext_days, "d").format("YYYY-MM-DD HH:mm:ss");
              var loanId = await db.models.appApplyLoan.findOne({
                  attributes: ["id"],
                  order: [["id", "DESC"]],
              });
              var loan_id = loanId ? 100000 + loanId.id + 1 : 100001;  
              const createLoan = await db.models.appApplyLoan.create({
                  user_id : loan.user_id,
                  loan_id,
                  days : ext_days,
                  required_amount,
                  disbursed_amount: 0,
                  apply_date: c_Date,
                  payable_date: p_Date,
                  total_payable_amount,
                  remaining_amount:total_payable_amount,
                  reviewer_1:admin_user_id,
                  reviewer_2:admin_user_id,
                  customer_care:0,
                  s1:0,
                  s2:0,
                  s3:0,
                  m1:0,
                  m2:0,
                  collection_manager:0,
                  status:3,
                  redeem_coins: 0,
              }); 
              if (!createLoan) return next(new AppError('Not Found', 404))
              res.json({ message: 'Loan Extend sucessfully', error: false, data: create });
          }
          if (!create) return next(new AppError('Not Found', 404))
          res.json({ message: 'Payment sucessfully', error: false, data: create });
      } else{
          res.json({ message: 'Payment detail Not added sucessfully', error: true });
      }     
  });
  
  exports.saveCustomExtendDetail = catchAsync(async (req, res, next) => {  
    var decoded = jwt_decode(req.headers.authorization);
    var admin_user_id = decoded.id;  
    var {loan_id, ext_days, partial_amount, penality_deduct, required_amount} = req.body;
    var total_paid_amount = penality_deduct ? parseInt(partial_amount) + parseInt(penality_deduct): parseInt(partial_amount);
    var total_payable_amount = parseInt(required_amount) - parseInt(total_paid_amount); 
    var c_Date = moment().format('YYYY-MM-DD HH:mm:ss'); 
    var loan = await db.models.appApplyLoan.findOne({
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
        where: {
            deleted_at: null,
            loan_id,
        }
    })
    var payment_detail = {      
        "txTime": c_Date,
        "txStatus": "Partial Extend",
        "orderAmount": partial_amount,
        "paymentMode": "Offline"
    } 
    const create = await db.models.appPayment.create({
        user_id: loan.user_id, 
        loan_id, 
        payment_detail, 
        paid_redeem_coins: 0, 
        penality: 0
    }) 
    if(create){  
        var loanExtend = await db.models.appApplyLoan.update({
            status: 8,
            deduct_penality:penality_deduct,
            partial_amount:partial_amount
        }, {
            where: {
                loan_id
            }
        })
        if(loanExtend){ 
            var p_Date = moment().add(ext_days, "d").format("YYYY-MM-DD HH:mm:ss");
            var loanId = await db.models.appApplyLoan.findOne({
                attributes: ["id"],
                order: [["id", "DESC"]],
            });
            var loan_id = loanId ? 100000 + loanId.id + 1 : 100001;  
            const createLoan = await db.models.appApplyLoan.create({
                user_id : loan.user_id,
                loan_id,
                days : ext_days,
                required_amount:total_payable_amount,
                disbursed_amount: 0,
                apply_date: c_Date,
                payable_date: p_Date,
                total_payable_amount,
                remaining_amount:total_payable_amount,
                reviewer_1:admin_user_id,
                reviewer_2:admin_user_id,
                customer_care:0,
                s1:0,
                s2:0,
                s3:0,
                m1:0,
                m2:0,
                collection_manager:0,
                status:3,
                redeem_coins: 0,
            }); 
            if (!createLoan) return next(new AppError('Not Found', 404))
            res.json({ message: 'Loan Extend sucessfully', error: false, data: create });
        }
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'Payment sucessfully', error: false, data: create });
    } else{
        res.json({ message: 'Payment detail Not added sucessfully', error: true });
    }     
  });

   
  exports.getAllApplyloanWithPayment = catchAsync(async (req, res, next) => {
    const { offset, limit } = req.query;

    const queryObj = {
      include: [{
        model: db.models.appUser,
        as: 'appUser',
        attributes: ['username', 'email','mobile_no']
      }, {
        model:db.models.appApplyLoan,
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
      }],
      attributes: ['id','loan_id', 'paid_redeem_coins', 'penality', 'type', 'tx_msg', 'tx_time', 'order_id', 'tx_status','signature', 'order_amount', 'payment_mode', 'reference_id'], 
      group: ['loan_id'],
      where: {
        deleted_at: null
      }
    }
    
    const totalCount = await db.models.appBusinessPayment.count(queryObj);
    queryObj['limit'] = Number(limit);
    queryObj['offset'] = Number(offset);
    const applyloan = await db.models.appBusinessPayment.findAll(queryObj);

    res.json({ message: 'Repayment Details found', error: false, data: applyloan, total: totalCount.length });
  })

  exports.getPaymentDetailsByLoanId = catchAsync(async (req, res, next) => { 
    const applyloan = await db.models.appBusinessPayment.findAll({
      include: [{
        model: db.models.appUser, 
        attributes: ['username', 'email','mobile_no']
      }, {
        model:db.models.appApplyLoan,
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
      }], 
      attributes: ['id','loan_id', 'paid_redeem_coins', 'penality', 'type', 'tx_msg', 'tx_time', 'order_id', 'tx_status','signature', 'order_amount', 'payment_mode', 'reference_id' ], 
      where: {
        deleted_at: null,
        loan_id: req.params.loan_id
      }
    })  
    console.log(applyloan);
    if (JSON.stringify(applyloan) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({ message: 'Repayment Details found', error: false, data: applyloan });
  })
  

  exports.getSearchAllApplyloanPayment = catchAsync(async (req, res, next) => {  
    var query = url.parse(req.url, true).query;
    const {loan_id, email, mobile_no, name, from_date, to_date, status, payment_method, trans_id, order_id, id_number, limit, offset } = query;  
    
    let whereClause = { deleted_at: null};
    let whereClause2 = { deleted_at: null};
    let whereClause3 = {};

    if (from_date != "") {
      whereClause2['apply_date'] = {
         [Op.gte]: from_date + " 00:00:00"
      }
    }

    if (to_date != "") {
      whereClause2['apply_date'] = {
         [Op.lte]: to_date + " 23:59:59"
      }
    }

    if (from_date != "" && to_date != "") {
      whereClause2['apply_date'] = {
         [Op.gte]: from_date + " 00:00:00",
         [Op.lte]: to_date + " 23:59:59"
      }
    }

    if (loan_id != '') {
       whereClause2['loan_id'] = loan_id;
    }

    if (email != '') {
        whereClause['email'] = email;
    }

    if (name != '') {
        whereClause['username'] = { [Op.substring] : name };
    }

    if (mobile_no != '') {
        whereClause['mobile_no'] = mobile_no;
    }

    if (id_number != '') {
        whereClause3['adhaar_no'] = id_number;
    }

    if (status != '') {
       whereClause2['tx_status'] = status;
    }

    if (payment_method != '') {
       whereClause2['payment_mode'] = payment_method;
    }

    if (trans_id != '') {
       whereClause2['reference_id'] = trans_id;
    }

    if (order_id != '') {
      whereClause2['order_id'] = order_id;
    }
    const queryObj = {
      include: [{
        model: db.models.appUser,
        as: 'appUser',
        attributes: ['username', 'email','mobile_no'],
        where: whereClause
      }, {
        model:db.models.appApplyLoan,
        attributes: ['id', 'user_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'], 
      },
      {      
          model: db.models.appKycDetails, 
          attributes: ['adhaar_no', 'reg_mob_no', 'pan_no'],
          where: whereClause3 
      }],
      attributes: ['id','loan_id', 'paid_redeem_coins', 'penality', 'type', 'tx_msg', 'tx_time', 'order_id', 'tx_status','signature', 'order_amount', 'payment_mode', 'reference_id'], 
      group: ['loan_id'],
      where: whereClause2
    }

    const totalCount = await db.models.appBusinessPayment.count(queryObj);
    queryObj.limit = Number(limit);
    queryObj.offset = Number(offset);
    const applyloan = await db.models.appBusinessPayment.findAll(queryObj);
    res.json({ message: 'Repayment Details found', error: false, data: applyloan, total: totalCount.length });
  })

  exports.generatePaymentLink = catchAsync(async (req, res, next) => {
    const {orderId} = req.body; 
    let response=null;
    let formData = new FormData();
    formData.append('appId', PAYMENT_GATEWAY_APP_ID);
    formData.append('secretKey', PAYMENT_GATEWAY_SECRET_KEY);
    formData.append('orderId', orderId);
    try{
     const response1 = await fetch('https://test.cashfree.com/api/v1/order/info/link', {
      method: 'POST',
      body: formData
    })
    const response2 = await response1.json();
    response = await response2
    } catch(err){
      response=err;
    }
    res.json({
      message: response,
      error: false,
    });
  }); 
  
  // exports.checkTransferStatus = catchAsync(async (req, res, next) => {
  //   const { transferId } = req.body;
  //   try{
  //     const response = await Transfers.GetTransferStatus({
  //         "transferId": transferId,
  //     }); 
  //     // handleResponse(response);
  //     res.json({
  //       message: response,
  //       error: false,
  //     });
  //   }
  //   catch(err){
  //     // console.log("err caught in getting transfer status");
  //     // console.log(err);
  //     // return; 
  //     res.json({
  //       message: err,
  //       error: true,
  //     });
  //   }
  // });

  exports.getPaymentDetailsInApp = catchAsync(async (req, res, next) => { 
    const appPay = await db.models.appBusinessPayment.findAll({
      attributes: ['id','loan_id', 'paid_redeem_coins', 'penality', 'type', 'tx_msg', 'tx_time', 'order_id', 'tx_status','signature', 'order_amount', 'payment_mode', 'reference_id' ], 
      where: {
        deleted_at: null,
        loan_id: req.params.loan_id
      }
    })  
    if (!appPay.length) return next(new AppError('Not Found', 404))
    res.json({ message: 'Repayment Details found', error: false, data: appPay });
  })