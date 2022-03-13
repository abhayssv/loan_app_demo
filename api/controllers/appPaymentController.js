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
const {
  PAYOUT_CLIENT_ID,
  PAYOUT_CLIENT_SECRET_ID,
  PAYMENT_GATEWAY_APP_ID,
  PAYMENT_GATEWAY_SECRET_KEY
} = process.env;
const {Payouts} = cfSdk;
const {Beneficiary, Transfers} = Payouts;
const generalConfig = require('../config/generalConfig');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(generalConfig.saltKey);
const path = require('path');
const fetch = require('node-fetch');
const config = {
  Payouts: {
    env:'PRODUCTION',
    ClientID: PAYOUT_CLIENT_ID,
    ClientSecret: PAYOUT_CLIENT_SECRET_ID,
    ENV: 'PRODUCTION',
    PathToPublicKey: path.resolve(
      __dirname,
      '../publicKeys/accountId_6082_public_key.pem'
    )
  }
};
 
const sdk = require('api')('@cashfreedocs-new/v1#5232kkwyp8vyl');

Payouts.Init(config.Payouts);



// Page Controller .............................................................................

  exports.savePaymentDetail = catchAsync(async (req, res, next) => { 
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id;
    const {loan_id, payment_detail, paid_redeem_coins, penality} = req.body;
    const orderAmount = payment_detail.orderAmount;
    const paidAmount = orderAmount - penality;
    const loanDetails = await db.models.appApplyLoan.findOne({
      attributes: ['user_id', 'loan_id', 'remaining_amount'],
      where: {
        user_id, loan_id,
      }
    })  
    const create = await db.models.appPayment.create({
      user_id, loan_id, payment_detail, paid_redeem_coins, penality
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
              remaining_amount: Number(loan.remaining_amount)  - order_amount,
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

  exports.saveFlatBusinessDetail = catchAsync(async (req, res, next) => {  
      var {loan_id, order_amount, penality, tx_time, overallPenality } = req.body; 
      var c_Date = moment().format('YYYY-MM-DD HH:mm:ss');

      var currentDay = moment(c_Date).format('YYYY-MM-DD');
      var dayPayment = moment(tx_time).format('YYYY-MM-DD');

      var loan = await db.models.appApplyLoan.findOne({
          attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
          where: {
              deleted_at: null,
              loan_id,
          }
      })

     
      
      var paid_redeem_coins = 0;

      if (dayPayment === currentDay) {
        paid_redeem_coins = 100;
      }

      const create = await db.models.appBusinessPayment.create({
          user_id: loan.user_id, 
          loan_id,  
          paid_redeem_coins, 
          penality,
          order_amount,
          payment_mode: 'Offline',
          tx_msg: "00::Transaction success",
          tx_time,
          tx_status: 'SUCCESS'
      }) 
      
      if(create){ 
        var appBusinessPayment = await db.models.appBusinessPayment.findAll({
          attributes: ['penality'],
          where: {
            deleted_at: null,
            loan_id,
          }
        });

        var totalPen = appBusinessPayment.reduce((s,c) => {
          s+=Number(c.dataValues.penality|| 0);
          return s;
        }, 0);

        const status = (loan.remaining_amount <= Number(order_amount) && (totalPen >= overallPenality)) ? "4": loan.status;
       
        var dedRemainingAmount = await db.models.appApplyLoan.update({
            remaining_amount: Number((loan.remaining_amount - order_amount).toFixed(2)),
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

  exports.saveInstallmentFlatDetail = catchAsync(async (req, res, next) => {  
    var {loan_id, order_amount, penality, tx_time } = req.body;  
    var c_Date = moment().format('YYYY-MM-DD HH:mm:ss');

    var currentDay = moment(c_Date).format('YYYY-MM-DD');
    var dayPayment = moment(tx_time).format('YYYY-MM-DD');

    var loan = await db.models.appApplyLoan.findOne({
      attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
      where: {
        deleted_at: null,
        loan_id,
      }
    })
    var paid_redeem_coins = 0;

    if (dayPayment === currentDay) {
      paid_redeem_coins = 100;
    }

    var payment_detail = {      
      "txTime": tx_time,
      "txStatus": "Cash Flat",
      "orderAmount": order_amount,
      "paymentMode": "Offline"
    } 
    const create = await db.models.appPayment.create({
        user_id: loan.user_id, 
        loan_id, 
        payment_detail, 
        paid_redeem_coins: 0, 
        penality,
        tx_date:tx_time
    }) 

    // const create = await db.models.appBusinessPayment.create({
    //   user_id: loan.user_id, 
    //   loan_id,  
    //   paid_redeem_coins, 
    //   penality,
    //   order_amount,
    //   payment_mode: 'Offline',
    //   tx_msg: "00::Transaction success",
    //   tx_time,
    //   tx_status: 'SUCCESS'
      
    // }) 
    
    if(create){ 
      const status = (loan.remaining_amount == Number(order_amount) ) ? "4": loan.status;
      var dedRemainingAmount = await db.models.appApplyLoan.update({
          remaining_amount: Number((loan.remaining_amount - order_amount).toFixed(2)),
          status
      }, {
          where: {
              loan_id
          }
      })
      if (!create) return next(new AppError('Not Found', 404))
      res.json({ message: 'Payment sucessfully!!', error: false, data: create });
    } else{
        res.json({ message: 'Payment detail Not added sucessfully', error: true });
    }     
  });

 

  exports.saveExtendDetail = catchAsync(async (req, res, next) => {  
      var decoded = jwt_decode(req.headers.authorization);
      var admin_user_id = decoded.id;  
      var {loan_id, ext_days, ext_required_amount, interest, required_amount} = req.body;
      var total_payable_amount = parseInt(interest) + parseInt(required_amount) + 1; 
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

  exports.saveCustomExtendBusinessDetail = catchAsync(async (req, res, next) => {  
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
    const create = await db.models.appBusinessPayment.create({
        user_id: loan.user_id, 
        loan_id, 
        paid_redeem_coins: 0, 
        penality: 0,
        order_amount: partial_amount,
        tx_msg: "00::Transaction success",
        tx_status: "Partial Extend",
        payment_mode: 'Offline',
        tx_time: c_Date,
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
                disbursed_date: c_Date,
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

  exports.createBenificiary = catchAsync(async (req, res, next) => { 
    const user_id = req.body.user_id; 
    const bankDetails = await db.models.appBankInfo.findOne({
      include: [
        {
          model: db.models.appUser,
          as: 'appUser',
          attributes: ['username', 'email', 'mobile_no']
        },
        {
          model: db.models.appBasicInfo,
          attributes: ['permanent_address']
        }
      ],
      attributes: [`account_no`, `ifsc_code`, `user_id`],
      where: {
        user_id: user_id
      }
    });
    const {
      dataValues: {
        account_no,
        ifsc_code,
        appUser: {username, email, mobile_no},
        appBasicInfo: {permanent_address},
      }
    } = bankDetails;
    const decryptedAccount = cryptr.decrypt(account_no);
    const decryptedIfsc = cryptr.decrypt(ifsc_code);
    const beneficiaryId = `VIZZVEE_${user_id}_${Math.round(
      Math.pow(36, 4 + 1) - Math.random() * Math.pow(36, 4)
    )
    .toString(36)
    .slice(1)}${decryptedAccount.slice(decryptedAccount.length - 4, decryptedAccount.length)}`;
    const bene = {
      beneId: beneficiaryId,
      name: username,
      email: email,
      phone: mobile_no,
      bankAccount: decryptedAccount,
      ifsc: decryptedIfsc,
      address1: permanent_address
    }; 
    let response
    try{
      response = await Beneficiary.Add(bene);
      if(response.status == "SUCCESS" && response.subCode == "200" ){ 
        await db.models.appUser.update({
          beneficiary_id: beneficiaryId
        }, {
          where: {
            user_id
          }
        }) 
      } 
    }catch(err){
      response = err;
      return next(new AppError('Not Found', 404));
    }   
    res.json(response);
  })

  exports.disburseAmount = catchAsync(async (req, res, next) => {   
    const {beneficiaryId, transferId, amount} = req.body;  
    const transfer = {
      beneId: beneficiaryId,
      transferId: transferId,
      amount: amount
    };
     let response;
     try {
       response = await Beneficiary.GetDetails({
         beneId:beneficiaryId
       });
        if (
          !(response.status === 'ERROR' &&
          response.subCode === '404' &&
          response.message === 'Beneficiary does not exist')
        ) {
            try{
                const paymentResponse = await Transfers.RequestTransfer(transfer);
                response = paymentResponse;
            } catch (err){
                response = err;
                return;
            }
        }
      } catch (err) {
        response=err;
        return;
      }
    res.json(response);
  });

  exports.getAllApplyloanWithPayment = catchAsync(async (req, res, next) => {
    const { limit, offset } = req.query;
    const queryObj = {
      include: [{
        model: db.models.appUser,
        as: 'appUser',
        attributes: ['username', 'email','mobile_no']
      }, {
        model:db.models.appApplyLoan,
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
      }],
      attributes: ['loan_id', 'payment_detail', 'paid_redeem_coins', 'penality'], 
      where: {
        deleted_at: null
      }
    }  
    const totalCount = await db.models.appPayment.count(queryObj);
    queryObj.limit = Number(limit);
    queryObj.offset = Number(offset);
    const applyloan = await db.models.appPayment.findAll(queryObj);

    res.json({ message: 'Repayment Details found', error: false, data: applyloan, total: totalCount});
  })

  exports.getSearchAllApplyloanPayment = catchAsync(async (req, res, next) => {  
    var query = url.parse(req.url, true).query;
    const {loan_id, email, mobile_no, name, from_date, to_date, status, payment_method, trans_id, order_id, id_number, limit, offset } = query;  
    let whereClause = { deleted_at: null};
    let whereClause2 = {};
    whereClause2['payment_detail'] = {};
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
       whereClause2['payment_detail']['txStatus'] = status;
    }

    if (payment_method != '') {
       whereClause2['payment_detail']['paymentMode'] = payment_method;
    }

    if (trans_id != '') {
       whereClause2['payment_detail']['referenceId'] = trans_id;
    }

    if (order_id != '') {
      whereClause2['payment_detail']['orderId'] = order_id;
    }

    const queryObj = {
      include: [{
          model: db.models.appUser,
          as: 'appUser',
          attributes: ['username', 'email','mobile_no'],
          where:whereClause
        },{
          model:db.models.appApplyLoan,
          attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
        },{      
          model: db.models.appKycDetails, 
          attributes: ['adhaar_no', 'reg_mob_no', 'pan_no'],
          where: whereClause3 
        } 
      ],
      attributes: ['loan_id', 'payment_detail', 'paid_redeem_coins', 'penality'], 
      where:whereClause2
    }
    
    const totalCount = await db.models.appPayment.count(queryObj);

    queryObj.limit = Number(limit);
    queryObj.offset = Number(offset);

    const applyloan = await db.models.appPayment.findAll(queryObj);

    res.json({ message: 'Repayment Details found', error: false, data: applyloan, total: totalCount });
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
  
  exports.checkTransferStatus = catchAsync(async (req, res, next) => {
    const { transferId } = req.body;
    try{
      const response = await Transfers.GetTransferStatus({
          "transferId": transferId,
      }); 
      // handleResponse(response);
      res.json({
        message: response,
        error: false,
      });
    }
    catch(err){
      // console.log("err caught in getting transfer status");
      // console.log(err);
      // return; 
      res.json({
        message: err,
        error: true,
      });
    }
  });

  exports.getToken = catchAsync(async (req, res, next) => {
    const {orderId, amount} = req.body;
    var response = await fetch(process.env.PROD_PAYMENT_URL, {
      method: 'POST',
      headers: {
        'x-client-id': process.env.APP_ID,
        'x-client-secret': process.env.SECRET_KEY,
        'Content-Type': "application/json"
      },
      body: {
        "orderId": orderId,
        "orderAmount": amount,
        "orderCurrency":"INR"
      },
    })
    if (response.statusCode == 200) return next(new AppError('Not Found', 404))
    res.json({ message: 'Pay Authentication', error: false, data: response });
  })

  // Generate editable amount repayment link

  exports.getPayLink = catchAsync(async (req, res, next) => {
    const { loan_id, customer_name, mobile_no, email, amount } = req.body;
    const today = new Date();
    var myDate = new Date(today) // your date object
    myDate.setHours(myDate.getHours() + 10)
    // myDate.setMinutes(myDate.getMinutes() + 10) 
    const linkId = moment().unix();
      sdk.server('https://api.cashfree.com/pg');
       var header= {
      'x-client-id': PAYMENT_GATEWAY_APP_ID,
      'x-client-secret': PAYMENT_GATEWAY_SECRET_KEY,
      'x-api-version': '2021-05-21'
      }
      sdk.CreatePaymentLink({
        customer_details: { 
          customer_name: customer_name,
          customer_phone: mobile_no,
          customer_email: email
        },
        link_notify: {send_sms: true, send_email: true},
         link_meta: {
          notify_url: 'https://ee08e626ecd88c61c85f5c69c0418cb5.m.pipedream.net',
          upi_intent: false
        },
        link_amount: amount,
        link_currency: 'INR',
        link_id: linkId.toString(),
        link_partial_payments: false,
        link_expiry_time: myDate,
        link_purpose: 'Pay',
      }, header)
      .then(result =>{
        db.models.payLink.create({
          loan_id, link_id: linkId, status: "ACTIVE" 
        }).then(create =>{
          if (!create) return next(new AppError('Not Found', 404));
          res.json({ message: 'Pay link create sucessfully', error: false, data: result });
          console.log("RESPONSE", result);
        }) 
      })
      .catch(err => next(new AppError(err, 404)));
  });
  
  exports.saveEmpIntallmentPaymentDetail = catchAsync(async (req, res, next) => { 
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id; 
    const {loan_id, payment_detail, paid_redeem_coins, penality, tx_date} = req.body;
    const orderAmount = payment_detail.orderAmount;
    const paidAmount = orderAmount - penality;
    const loanDetails = await db.models.appApplyLoan.findOne({
      attributes: ['user_id', 'loan_id', 'remaining_amount', 'payable_date'],
      where: {
        user_id, loan_id,
      }
    }) 
    // let payable_date = moment(loanDetails.payable_date).format("YYYY-MM-DD");
    // let payment_date = moment(payment_detail.txTime).format("YYYY-MM-DD");
    // if(moment(payable_date).isSame(payment_date)){
    //   console.log(11111111111);
    // }else{
    //   console.log(22222222222);
    // } 
    const create = await db.models.appPayment.create({
      user_id, loan_id, payment_detail, paid_redeem_coins, penality, tx_date
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



 exports.saveEmployeeFlat = catchAsync(async (req, res, next) => {  
    var {loan_id, order_amount, penality, tx_time } = req.body;  
    var c_Date = moment().format('YYYY-MM-DD HH:mm:ss');

    var currentDay = moment(c_Date).format('YYYY-MM-DD');
    var dayPayment = moment(tx_time).format('YYYY-MM-DD');

    var loan = await db.models.appApplyLoan.findOne({
      attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
      where: {
        deleted_at: null,
        loan_id,
      }
    })

    var paid_redeem_coins = 0;

    if (dayPayment === currentDay) {
      paid_redeem_coins = 100;
    }

    var payment_detail = {      
      "txTime": tx_time,
      "txStatus": "Cash Flat",
      "orderAmount": order_amount,
      "paymentMode": "Offline"
    } 
    const create = await db.models.appPayment.create({
        user_id: loan.user_id, 
        loan_id, 
        payment_detail, 
        paid_redeem_coins: 0, 
        penality,
        tx_date:tx_time
    }) 

    
    if(create){ 
      const status = (loan.remaining_amount == Number(order_amount) ) ? "4": loan.status;
      var dedRemainingAmount = await db.models.appApplyLoan.update({
          remaining_amount: Number((loan.remaining_amount - order_amount).toFixed(2)),
          status
      }, {
          where: {
              loan_id
          }
      })
      if (!create) return next(new AppError('Not Found', 404))
      res.json({ message: 'Payment sucessfully!!', error: false, data: create });
    } else{
        res.json({ message: 'Payment detail Not added sucessfully', error: true });
    }     
  });
  