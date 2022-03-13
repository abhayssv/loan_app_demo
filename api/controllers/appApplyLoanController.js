"use strict";
var db = require("../config/sequelize").db;
var Sequelize = require("sequelize");
var _ = require("lodash");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
var generalConfig = require("../config/generalConfig");
var passport = require("../config/passport.js")();
const jwt_decode = require('jwt-decode');
var moment = require('moment');
const url = require('url');   
const Cryptr = require('cryptr'); 
const cryptr = new Cryptr(generalConfig.saltKey); 
const sgMail = require('@sendgrid/mail')
const {getReviewer} = require('../utils/utilities');
const { Op, QueryTypes } = require('sequelize');
const FCM = require('fcm-node');

// Page Controller .............................................................................

exports.getAllApplyLoan = catchAsync(async (req, res, next) => {
    const applyLoan = await db.models.appApplyLoan.findAll({
        attributes: [
            "id",
            "user_id",
            "loan_id",
            "required_amount",
            "disbursed_amount",
            "apply_date",
            "days",
            "total_payable_amount",
            "redeem_coins",
            "payable_date",
            "status",
            "created_at",
            "updated_at",
        ],
        order: [["id", "DESC"]],
    });
    if (JSON.stringify(applyLoan) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
    });
});

exports.getLoanStatus = catchAsync(async (req, res, next) => {
    const decoded = jwt_decode(req.headers.authorization);
    const user_id = decoded.id;
    const has_role = decoded.has_role;
    var query = url.parse(req.url, true).query;  
    var whereClause;
    if (query.page === "first") {
        whereClause = {
            status_id: ["0", "1", "2"],
        };
    } else if (query.page === "second") {
        whereClause = {
            status_id: ["1", "3", "5", "6"],
        };
    } else if (query.page === "approval") {
        whereClause = {
            status_id: ["1", "2", "3", "5"],
        };
    }else if (query.page === "case_review") {
        if(has_role == 4){ var status = [1,2]}else if(has_role == 5){ var status = [3,5,6]}else{var status = [1, 2, 3, 5, 6]}
        whereClause = {
            status_id: status,
        };
    } else if (query.page === "customer") {
        whereClause = {
            status_id: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
        };
    }
    const loanStatus = await db.models.loanStatus.findAll({
        attributes: ["id", "status_id", "status", "created_at", "updated_at"],
        where: whereClause,
    });
    if (JSON.stringify(loanStatus) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Status Found",
        error: false,
        data: loanStatus,
    });
});

exports.getFirstReviewerLoan = catchAsync(async (req, res, next) => {
    const { offset, limit } = req.params;

    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    var user_type = decoded.user_type;
    var has_role = decoded.has_role;   
    var whereClause = {deleted_at: null, status: ["0"]}
    if(user_type == 2 && has_role == 4){
        whereClause['reviewer_1'] = user_id;
    } 

    const queryObject = {
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
            },
            {
                model: db.models.user,
                as: 'appUserReviewer_1', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.user,
                as: 'appUserReviewer_2', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.loanStatus, 
                attributes: ['status_id', 'status'],
            } 
        ],
        attributes: ["id", "loan_id", "user_id", "required_amount", "apply_date", "days", "status", 'reviewer_1', 'reviewer_2', "created_at", "updated_at" ],
        order: [["id", "DESC"]],
        where: whereClause
    }
    const count = await db.models.appApplyLoan.count(queryObject);
    queryObject.limit = Number(limit);
    queryObject.offset = Number(offset)
    const applyLoan = await db.models.appApplyLoan.findAll(queryObject);

    const applyLoans = [];  
    for (const element of applyLoan) {
        const countTodayFreshLoan = await db.models.appApplyLoan.count({ 
            attributes: ['user_id',[db.fn('COUNT', db.col('user_id')), 'total']] ,
            group : ['user_id'],
            where: {
              user_id: element.user_id,
              status:4
            }
        })  
        var users = await db.query(`SELECT * FROM (SELECT * FROM vizzve_apply_loan WHERE user_id =:user_id ORDER BY Id DESC LIMIT 2) tbl1 ORDER BY Id LIMIT 1`,{
            type:QueryTypes.SELECT,
            replacements:{user_id:element.user_id}
        });   
        let reapply;
        if(_.isEmpty(countTodayFreshLoan) == false && users[0].status == 4){ 
            reapply = "RE"
        }else{
            reapply = "" 
        } 
        applyLoans.push({
            id:element.id,
            user_id:element.user_id,
            loan_id:element.loan_id,
            required_amount:element.required_amount,
            apply_date:element.apply_date,
            days:element.days,
            status:element.loanStatus.status,
            reviewer_1:element.reviewer_1,
            reviewer_2:element.reviewer_2,
            firstReviewerName:element.appUserReviewer_1.firstname+' '+element.appUserReviewer_1.lastname,
            secondReviewerName:element.appUserReviewer_2 != null ? element.appUserReviewer_2.firstname+' '+element.appUserReviewer_2.lastname:'null',
            customerName:element.appUser.username,
            customerMobileNumber:element.appUser.mobile_no,
            customerEmail:element.appUser.email,
            customerUserType:element.appUser.user_type, 
            customerReapply:reapply,
            customerOverdue:users[0].s1 != 0 ? "OD":"",
            customerExtend:users[0].status == 8 ? "EXT": ""
        })   
    };

    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoans,
        total: count
    });
}); 

exports.getSecondReviewerLoan = catchAsync(async (req, res, next) => {
    const { offset, limit } = req.params;

    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    var user_type = decoded.user_type;
    var has_role = decoded.has_role;   
    var whereClause = {deleted_at: null, status: ["1"]}
    if(user_type == 2 && has_role == 1){
        whereClause['reviewer_2'] = user_id;
    } 

    const queryObject = {
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
            },
            {
                model: db.models.user,
                as: 'appUserReviewer_1', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.user,
                as: 'appUserReviewer_2', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.loanStatus, 
                attributes: ['status_id', 'status'],
            } 
        ],
        attributes: ["id", "loan_id", "user_id", "required_amount", "apply_date", "days", "status", 'reviewer_1', 'reviewer_2', "created_at", "updated_at" ],
        order: [["id", "DESC"]],
        where: whereClause
    }
    const count = await db.models.appApplyLoan.count(queryObject);
    queryObject.limit = Number(limit);
    queryObject.offset = Number(offset)
    const applyLoan = await db.models.appApplyLoan.findAll(queryObject);

    const applyLoans = [];  
    for (const element of applyLoan) {
        const countTodayFreshLoan = await db.models.appApplyLoan.count({ 
            attributes: ['user_id',[db.fn('COUNT', db.col('user_id')), 'total']] ,
            group : ['user_id'],
            where: {
              user_id: element.user_id,
              status: 4
            }
        })  
        var users = await db.query(`SELECT * FROM (SELECT * FROM vizzve_apply_loan WHERE user_id =:user_id ORDER BY Id DESC LIMIT 2) tbl1 ORDER BY Id LIMIT 1`,{
            type:QueryTypes.SELECT,
            replacements:{user_id:element.user_id}
        });  
        let reapply;
        if(_.isEmpty(countTodayFreshLoan) == false && users[0].status == 4){ 
            reapply = "RE"
        }else{
            reapply = "" 
        }
        applyLoans.push({
            id:element.id,
            user_id:element.user_id,
            loan_id:element.loan_id,
            required_amount:element.required_amount,
            apply_date:element.apply_date,
            days:element.days,
            status:element.loanStatus.status,
            reviewer_1:element.reviewer_1,
            reviewer_2:element.reviewer_2,
            firstReviewerName:element.appUserReviewer_1.firstname+' '+element.appUserReviewer_1.lastname,
            secondReviewerName:element.appUserReviewer_2 != null ? element.appUserReviewer_2.firstname+' '+element.appUserReviewer_2.lastname:'null',
            customerName:element.appUser.username,
            customerMobileNumber:element.appUser.mobile_no,
            customerEmail:element.appUser.email,
            customerUserType:element.appUser.user_type, 
            customerReapply:reapply,
            customerOverdue:users[0].s1 != 0 ? "OD":"",
            customerExtend:users[0].status == 8 ? "EXT":"",
        })   
    };

    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoans,
        total:count
    });
}); 

exports.getAllLoanWithUser = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    var user_type = decoded.user_type;
    var has_role = decoded.has_role;  
    var query = url.parse(req.url, true).query;
    var whereClause; 
    if (query.page === "first") {
        if(user_type == 2 && has_role == 4){
            whereClause = {
                deleted_at: null,
                status: ["0"],
                reviewer_1: user_id 
            }
        } else{
            whereClause = {
                deleted_at: null,
                status: ["0"]
            }
        } 
    } else if (query.page === "second") { 
        if(user_type == 2 && has_role == 5){
            whereClause = {
                deleted_at: null,
                status: ["1"],
                reviewer_2: user_id 
            };
        } else{
            whereClause = {
                deleted_at: null,
                status: ["1"], 
            };
        } 
    } else if (query.page === "approval") {
        whereClause = {
            status: ["1", "2", "3", "5"],
        };
    } else {
        whereClause = {
            deleted_at: null,
            status: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
        };
    } 
    const applyLoan = await db.models.appApplyLoan.findAll({
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
            },
            {
                model: db.models.user,
                as: 'appUserReviewer_1', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.user,
                as: 'appUserReviewer_2', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.loanStatus, 
                attributes: ['status_id', 'status'],
            } 
        ],
        attributes: ["id", "loan_id", "required_amount", "apply_date", "days", "status", 'reviewer_1', 'reviewer_2', "created_at", "updated_at" ],
        order: [["id", "DESC"]],
        where: whereClause,
    });

    if (JSON.stringify(applyLoan) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
    });
});

exports.getSearchAllLoanWithUser = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    var user_type = decoded.user_type;
    var has_role = decoded.has_role;
    var query = url.parse(req.url, true).query;
    var { loan_id, name, mobile_no, email, page } = query; 
    var whereClause;
    var whereClause2;
    if (page === "first") { 
        if(user_type == 2 && has_role == 4){
            if (mobile_no) {
                whereClause = {
                    mobile_no,
                };
                whereClause2 = {
                    reviewer_1: user_id,
                    status: 0
                }; 
            } else if (email) {
                whereClause = {
                    email,
                };
                whereClause2 = {
                    reviewer_1: user_id,
                    status: 0
                };
            }
            if (loan_id) {
                whereClause2 = {
                    deleted_at: null,
                    loan_id,
                    status: 0,
                    reviewer_1:user_id
                };
            } else {
                whereClause2 = {
                    deleted_at: null, 
                    status: 0,
                    reviewer_1:user_id
                };
            } 
        } else{
            if (mobile_no) {
                whereClause = { mobile_no };
                whereClause2 = { status: 0 }; 
            } else if (email) {
                whereClause = { email };
                whereClause2 = { status: 0 }; 
            }
            if (loan_id) {
                whereClause2 = {
                    deleted_at: null,
                    loan_id,
                    status: 0, 
                };
            } else {
                whereClause2 = {
                    deleted_at: null, 
                    status: 0, 
                };
            } 
        } 
    } else if (page === "second") { 
        if(user_type == 2 && has_role == 5){
            if (mobile_no) {
                whereClause = { mobile_no };
                whereClause2 = {
                    reviewer_2: user_id,
                    status: 1
                }; 
            } else if (email) {
                whereClause = { email };
                whereClause2 = {
                    reviewer_2: user_id,
                    status: 1
                };
            }
            if (loan_id) {
                whereClause2 = {
                    deleted_at: null,
                    loan_id,
                    status: 1,
                    reviewer_2:user_id
                };
            } else {
                whereClause2 = {
                    deleted_at: null, 
                    status: 1,
                    reviewer_2:user_id
                };
            } 
        } else{
            if (mobile_no) {
                whereClause = { mobile_no };
                whereClause2 = { status: 1 }; 
            } else if (email) {
                whereClause = { email };
                whereClause2 = { status: 1 }; 
            }
            if (loan_id) {
                whereClause2 = {
                    deleted_at: null,
                    loan_id,
                    status: 1, 
                };
            } else {
                whereClause2 = {
                    deleted_at: null, 
                    status: 1, 
                };
            }
        } 
    } else if (page === "approval") {
        // whereClause2 = {
        //     status: ["1", "2", "3", "5"],
        // };
        if (mobile_no) {
            whereClause = { mobile_no };
            whereClause2 = { status: ["1", "2", "3", "5"] }; 
        } else if (email) {
            whereClause = { email };
            whereClause2 = { status: ["1", "2", "3", "5"] }; 
        }
        if (loan_id) {
            whereClause2 = {
                deleted_at: null,
                loan_id,
                status: ["1", "2", "3", "5"], 
            };
        } else {
            whereClause2 = {
                deleted_at: null, 
                status: ["1", "2", "3", "5"], 
            };
        }
    } else {
        // whereClause2 = {
        //     status: ["0", "1", "2", "3", "4", "5", "6", "7"],
        // };
        if (mobile_no) {
            whereClause = { mobile_no };
            whereClause2 = {  status: ["0", "1", "2", "3", "4", "5", "6", "7"] }; 
        } else if (email) {
            whereClause = { email };
            whereClause2 = {  status: ["0", "1", "2", "3", "4", "5", "6", "7"] }; 
        }
        if (loan_id) {
            whereClause2 = {
                deleted_at: null,
                loan_id,
                 status: ["0", "1", "2", "3", "4", "5", "6", "7"] 
            };
        } else {
            whereClause2 = {
                deleted_at: null, 
                 status: ["0", "1", "2", "3", "4", "5", "6", "7"] 
            };
        }
    } 
    
    const applyLoan = await db.models.appApplyLoan.findAll({
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
                where: whereClause,
            },
        ], 
        attributes: [
            "id", "loan_id", "required_amount", "apply_date", "days", "status", 'reviewer_1', 'reviewer_2', "created_at", "updated_at",
        ],
        order: [["id", "DESC"]],
        where: whereClause2,
    }); 
    if (JSON.stringify(applyLoan) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
    });
});

exports.getApplyLoanById = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id;
    const applyLoan = await db.models.appApplyLoan.findOne({
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: ["username", "email", "mobile_no"],
            },
            {
                model: db.models.appPayment,
                attributes: [
                    "loan_id",
                    "payment_detail",
                    "paid_redeem_coins",
                    "penality",
                ],
            },
        ],
        attributes: [
            "id",
            "user_id",
            "loan_id",
            "required_amount",
            "disbursed_amount",
            "apply_date",
            "days",
            "total_payable_amount",
            "redeem_coins",
            "payable_date",
            "status",
            "created_at",
            "updated_at",
        ],
        order: [["id", "DESC"]],
        where: {
            deleted_at: null,
            user_id,
        },
    });
    if (!applyLoan) return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
    });
});

exports.getPaymentHistoryByLoanId = catchAsync(async (req, res, next) => {
    var loan_id = req.params.loan_id; 

    const userType = await db.models.appApplyLoan.findOne({
      include: [{
        model: db.models.appUser,
        as: 'appUser',
        attributes: ['user_type']
      }],
      where: {
        deleted_at: null,
        loan_id
      }
    });

    let applyloan = [];

    if(userType.appUser.user_type == 2) {
      applyloan = await db.models.appBusinessPayment.findAll({
          include: [{
            model: db.models.appUser,
            as: 'appUser',
            attributes: ['username', 'email','mobile_no']
          }, {
            model:db.models.appApplyLoan,
            attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
          }],
          attributes: ['loan_id','order_amount','tx_time' ,'payment_mode','tx_status','paid_redeem_coins', 'penality'], 
          where: {
            deleted_at: null,
            loan_id
          }
       })
    } else {
          applyloan = await db.models.appPayment.findAll({
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
            deleted_at: null,
            loan_id
          }
        })  
    }  
    res.json({ message: 'Repayment Details found', error: false, data: applyloan });
})

exports.getApplyLoanByLoanId = catchAsync(async (req, res, next) => {    
    var loan_id = req.params.loan_id; 
    const applyLoan = await db.models.appApplyLoan.findOne({
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'disbursed_date', 'apply_date', 'days',  'total_payable_amount', 'redeem_coins', 'payable_date', 'remaining_amount', 'reviewer_1', 'reviewer_2', 'status', 'created_at', 'updated_at'],
        where: {
            deleted_at: null,
            loan_id
        }
    }) 
    const loanStatus = await db.models.loanStatus.findAll({
        attributes: ["id", "status_id", "status"], 
    });
    const countUserLoan = await db.models.appApplyLoan.findAndCountAll({
        where: {
            deleted_at: null,
            user_id: applyLoan.user_id,    
        }
    }) 
    if (!applyLoan) return next(new AppError('Not Found', 404))
    res.json({
        message: 'Apply loan data found',
        error: false,
        data: applyLoan,
        status: loanStatus,
        countUserLoan: countUserLoan,
    });
});

exports.getApplyLoanByCustomerId = catchAsync(async (req, res, next) => {    
    var customer_id = req.params.customer_id; 
    const applyLoan = await db.models.appApplyLoan.findAll({
        include:[
            {
                model: db.models.loanRemark, 
                attributes: ['user_id','remarks'], 
                include: [{
                    model: db.models.user, 
                    attributes: ['firstname', 'lastname'],
                }], 
            },  
            
        ],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'status', 'total_payable_amount', 'redeem_coins', 'payable_date','remaining_amount', 'created_at', 'updated_at'],
        order: [["id", "DESC"]],
        limit: 5,
        where: {
            deleted_at: null,
            user_id:customer_id
        }
    })   
    if (!applyLoan) return next(new AppError('Not Found', 404))
    res.json({
        message: 'Apply loan data found',
        error: false,
        data: applyLoan, 
    });
});

exports.getAllApproveApplyLoanById = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id;
    const applyLoan = await db.models.appApplyLoan.findAll({
        include: [{
            model: db.models.appUser,
            attributes: ['username', 'email','mobile_no']
          },{
            model: db.models.appBasicInfo,
            attributes: ['username', 'gender', 'date_of_birth', 'marital_status', 'highest_qualification', 'mother_name', 'father_name','permanent_address', 'current_address'],
          },{
            model: db.models.appKycDetails,
            attributes: [`adhaar_no`,`pan_no`],
          },{
            model: db.models.appBankInfo,
            attributes: [`bank_name`, `branch`, `account_name`, `account_no`, `ifsc_code`],
          },{
            model: db.models.appReference,
            attributes: ['rel_first', 'number_first', 'rel_second', 'number_second', 'rel_third', 'number_third', 'rel_foruth', 'number_fourth'], 
        }],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days',  'total_payable_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
        order: [
            ['id', 'DESC']
        ],
        order: [["id", "DESC"]],
        where: {
            deleted_at: null, 
            user_id, status: [3, 9]
        }
    }) 
    if (!applyLoan[0]) return next(new AppError('Not Found', 404))
      var account_no = cryptr.decrypt(applyLoan[0].appBankInfo.account_no);
      var ifsc_code = cryptr.decrypt(applyLoan[0].appBankInfo.ifsc_code);
      applyLoan[0].appBankInfo[`account_no`] = account_no;
      applyLoan[0].appBankInfo[`ifsc_code`] = ifsc_code;
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
    });
});

// Get Loan for Edit Search
exports.getLoanForEditSearch = catchAsync(async (req, res, next) => {
    const {loan_id} = req.params; 
    const applyLoan = await db.models.appApplyLoan.findAll({
        include: [{
            model: db.models.appUser,
            attributes: ['username', 'email','mobile_no', 'user_type']
        },
        {
            model: db.models.loanStatus, 
            attributes: ['status_id', 'status'],
        }],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days',  'total_payable_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
        order: [
            ['id', 'DESC']
        ],
        order: [["id", "DESC"]],
        where: {
            deleted_at: null, 
            loan_id
        }
    }) 
    if (!applyLoan[0]) return next(new AppError('Not Found', 404))
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
    });
});

// Get Loan for Edit
exports.getLoanForEdit = catchAsync(async (req, res, next) => {
    const {loan_id} = req.params; 
    const {user_id} = req.params; 
    const applyLoan = await db.models.appApplyLoan.findOne({
        include: [{
            model: db.models.appUser,
            attributes: ['username', 'email','mobile_no', 'user_type']
        },
        {
            model: db.models.loanStatus, 
            attributes: ['status_id', 'status'],
        }],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'total_payable_amount', 'redeem_coins', 'payable_date', 'transfer_id', 'status', 'created_at', 'updated_at'],
        where: {
            deleted_at: null, 
            loan_id,
            user_id
        }
    }) 
    const loanDetails = await db.models.loanStatus.findAll({
        attributes: ['status_id', 'status'],
        where:{ deleted_at:null }
    });
    if (!applyLoan) return next(new AppError('Not Found', 404))
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
        status:loanDetails
    });
});

// Save Edit Loan

exports.saveEditLoan = catchAsync(async (req, res, next) => { 
    const {loans_id, user_id, disbursed_amount, status, disbursed_date, payable_date, transfer_id } = req.body
    const disbursedDate = moment(disbursed_date).format('YYYY-MM-DD HH:mm:ss');
    const payableDate = moment(payable_date).format('YYYY-MM-DD HH:mm:ss'); 
    console.log(req.body);
    var update = await db.models.appApplyLoan.update(
        {
            disbursed_amount, status, disbursed_date:disbursedDate, payable_date:payableDate, transfer_id,
        },
        {
            where: { loan_id:loans_id, user_id },
        }
    ); 
    if (!update) return next(new AppError("Not Found", 404));
    res.json({
        message: "Loan Edit Successfully",
        error: false,
        data: update,
    });
    
});

// Get App User Loan Agreement API

exports.getLoanAgreementByLoanId = catchAsync(async (req, res, next) => {  
    var applyLoan = await db.models.appApplyLoan.findOne({
        include: [{
            model: db.models.appUser,
            attributes: ['username', 'email','mobile_no','user_type']
          },{
            model: db.models.appBasicInfo,
            attributes: ['username', 'gender', 'date_of_birth', 'marital_status', 'highest_qualification', 'mother_name', 'father_name','permanent_address', 'current_address'],
          },{
            model: db.models.appKycDetails,
            attributes: [`adhaar_no`,`pan_no`],
          },{
            model: db.models.appBankInfo,
            attributes: [`bank_name`, `branch`, `account_name`, `account_no`, `ifsc_code`],
          },{
            model: db.models.appReference,
            attributes: ['rel_first', 'number_first', 'rel_second', 'number_second', 'rel_third', 'number_third', 'rel_foruth', 'number_fourth'], 
          },{
            model: db.models.appCollegeDetails,
            attributes: ['college_name', 'college_address', 'qualification', 'reason_of_loan'], 
          },{
            model: db.models.appEmpInfo,
            attributes: ['company_name', 'reason_for_loan'], 
          },{
            model: db.models.appBusinessDetails,
            attributes: ['agree_shop_name', 'reason_for_loan'], 
        }],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days',  'total_payable_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
        
        where: {
            deleted_at: null,
            loan_id: req.body.loan_id, status: 3
        }
    })  
    if (!applyLoan) return next(new AppError('Not Found', 404))
      var account_no = cryptr.decrypt(applyLoan.appBankInfo.account_no);
      var ifsc_code = cryptr.decrypt(applyLoan.appBankInfo.ifsc_code);
      applyLoan.appBankInfo[`account_nos`] = account_no;
      applyLoan.appBankInfo[`ifsc_codes`] = ifsc_code;

    var agreementTemplate = await db.models.appPage.findOne({
        attributes: ['page_id', 'slug', 'title', 'description'],
        where: {
            slug: 'loan-agreements'
        }
    })
    var days = applyLoan.appUser.user_type === 2 ? 1 : applyLoan.days;
    var per = await db.models.appInterestPenality.findOne({
        attributes: ['processing_fee', 'gst', 'penality'],
        where: {
            days
        }
    })

    var {loan_id,apply_date,disbursed_amount,required_amount, payable_date, days} = applyLoan;
    var {username,mobile_no,email,user_type } = applyLoan.appUser;
    var {date_of_birth,gender,marital_status,current_address } = applyLoan.appBasicInfo;
    var {adhaar_no, pan_no} = applyLoan.appKycDetail;
    var {account_nos, ifsc_codes, branch, account_name} = applyLoan.appBankInfo;
    var {number_first, number_second, number_third, number_fourth} = applyLoan.appReference;  
    if(gender === 0){ var gen_der = 'Male' } else if(gender === 1){ var gen_der = 'female'} else{ var gen_der = 'transgender'}
    if(user_type === 0){ var reason_for_loan = applyLoan.appCollegeDetail.reason_of_loan } else if(user_type === 1){ var reason_for_loan = applyLoan.appEmpInfo.reason_for_loan } else{ var reason_for_loan = applyLoan.appBusinessDetail.reason_for_loan}
    if(marital_status === 0){ var maritalStatus = 'Un-Married' } else{ var maritalStatus = 'Married'} 

    var service_charge = per.processing_fee;
    var gst = per.gst;
    var overdue_fine = "0";
    var penality = per.penality;
    var processing_fee = required_amount * per.processing_fee; 
    var modifyTemplate=(template,loan_id,username,date_of_birth,gen_der,maritalStatus,
        adhaar_no,pan_no,current_address,mobile_no,email,account_nos,ifsc_codes,number_first,
        number_second,number_third,number_fourth,branch,required_amount,days,service_charge,gst,overdue_fine,
        penality,apply_date,account_name,reason_for_loan,payable_date,disbursed_amount,processing_fee)=>{
        let modified = template;
        modified=modified.replace(/\[loan_id]/g,loan_id) 
        modified=modified.replace(/\[username]/g,username)
        modified=modified.replace(/\[date_of_birth]/g,date_of_birth)
        modified=modified.replace(/\[gender]/g,gen_der)
        modified=modified.replace(/\[marital_status]/g,maritalStatus)
        modified=modified.replace(/\[adhaar_no]/g,adhaar_no)
        modified=modified.replace(/\[pan_no]/g,pan_no)
        modified=modified.replace(/\[current_address]/g,current_address)
        modified=modified.replace(/\[mobile_no]/g,mobile_no)
        modified=modified.replace(/\[email]/g,email)
        modified=modified.replace(/\[account_no]/g,account_nos)
        modified=modified.replace(/\[ifsc_code]/g,ifsc_codes)
        modified=modified.replace(/\[number_first]/g,number_first)
        modified=modified.replace(/\[number_second]/g,number_second)
        modified=modified.replace(/\[number_third]/g,number_third)
        modified=modified.replace(/\[number_fourth]/g,number_fourth)
        modified=modified.replace(/\[branch]/g,branch)
        modified=modified.replace(/\[required_amount]/g,required_amount)
        modified=modified.replace(/\[days]/g,days)
        modified=modified.replace(/\[service_charge]/g,service_charge)
        modified=modified.replace(/\[gst]/g,gst)
        modified=modified.replace(/\[overdue_fine]/g,overdue_fine)
        modified=modified.replace(/\[penality]/g,penality)
        modified=modified.replace(/\[apply_date]/g,apply_date)
        modified=modified.replace(/\[account_name]/g,account_name)
        modified=modified.replace(/\[reason_for_loan]/g,reason_for_loan)
        modified=modified.replace(/\[payable_date]/g,payable_date)
        modified=modified.replace(/\[disbursed_amount]/g,disbursed_amount) 
        modified=modified.replace(/\[processing_fee]/g,processing_fee) 
        return modified
    }
    res.json({
        message: 'Apply Loan found',
        error: false,
        data: modifyTemplate(agreementTemplate.description, loan_id, username,date_of_birth,gen_der,maritalStatus,
            adhaar_no,pan_no,current_address,mobile_no,email,account_nos,ifsc_codes,number_first,
            number_second,number_third,number_fourth,branch,required_amount,days,service_charge,gst,overdue_fine,
            penality,apply_date,account_name,reason_for_loan,payable_date,disbursed_amount,processing_fee)
    });
});

exports.getAllProcessApplyLoanById = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id;
    const applyLoan = await db.models.appApplyLoan.findAll({
        attributes: [
            "id",
            "user_id",
            "loan_id",
            "required_amount",
            "disbursed_amount",
            "apply_date",
            "days",
            "total_payable_amount",
            "redeem_coins",
            "payable_date",
            "status",
            "created_at",
            "updated_at",
        ],
        order: [["id", "DESC"]],
        where: {
            deleted_at: null,
            user_id,
            status: [0,1,2,5,6,7],
        },
    });
    if (!applyLoan[0]) return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
    });
});

exports.getAllPaidApplyLoanById = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id;
    const applyLoan = await db.models.appApplyLoan.findAll({
        attributes: [
            "id",
            "user_id",
            "loan_id",
            "required_amount",
            "disbursed_amount",
            "apply_date",
            "days",
            "total_payable_amount",
            "redeem_coins",
            "payable_date",
            "status",
            "created_at",
            "updated_at",
        ],
        order: [["id", "DESC"]],
        where: {
            deleted_at: null,
            user_id,
            status: [4, 8],
        },
    });
    if (!applyLoan[0]) return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
    });
});

const getReviewerId=async(roleType = 4)=>{
    const loanStatus = roleType === 4 ? 0 : 1;
    const user = await db.models.user.findAll({
      attributes: ['id'],
      where: {
        deleted_at: null,
        user_type: 2,
        has_role: roleType,
        active: 1
      }
    }); 
    var loanData = await db.models.appApplyLoan.findAll({
      attributes: ['loan_id', 'reviewer_1', 'reviewer_2'],
      where: {
        status: loanStatus
      }
    });
    return getReviewer(user, loanData, roleType);
}

exports.saveApplyLoan = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id;
    var deduct_coins = 0;
    let reviewer_1 = await getReviewerId();
    var { required_amount, disbursed_amount, total_payable_amount, days } =
        req.body;

    var c_Date = moment().format("YYYY-MM-DD HH:mm:ss");
    var p_Date = moment().add(days, "d").format("YYYY-MM-DD HH:mm:ss");

    var loanId = await db.models.appApplyLoan.findOne({
        attributes: ["id"],
        order: [["id", "DESC"]],
    });
    var loan_id = loanId ? 100000 + loanId.id + 1 : 100001;
    var activeUser = await db.models.appUser.findOne({
        attributes: ['user_id', 'username', 'email','mobile_no','status', 'user_type', 'level', 'ref_code', 'use_ref_code'],
        where: {
            deleted_at: null,
            user_id,
            status : 1,
        },
    });
    if (!activeUser) {
        return next(new AppError('Not Found', 404))
    } else {
        var appliedLoan = await db.models.appApplyLoan.findOne({
            attributes: ["id", "apply_date", "status"],
            order: [["id", "DESC"]],
            where: {
                deleted_at: null,
                user_id,
            },
        });
    }
    var getCoins = await db.models.manageCoins.findOne({
        attributes: ["id", "user_id", "v_coins"],
        where: {
            user_id,
        },
    });
    if (getCoins != null) { 
        var deduct_coins = getCoins.v_coins != 0 ? getCoins.v_coins : 0;
        if (appliedLoan === null || appliedLoan.status === 2 || appliedLoan.status === 4 || appliedLoan.status === 5) {
            var deduct_coins_form_account = deduct_coins - deduct_coins; 
            var dedCoins = await db.models.manageCoins.update(
                {
                    v_coins: deduct_coins_form_account,
                },
                {
                    where: {
                        user_id,
                    },
                }
            );
            var getUseRefCode = await db.models.appUser.findOne({
                attributes: ["use_ref_code"],
                where: {
                    user_id,
                },
            });
            if (!getUseRefCode) {
                var getUseId = await db.models.appUser.findOne({
                    attributes: ["user_id"],
                    where: {
                        ref_code: getUseRefCode.use_ref_code,
                    },
                });

                var getUserRefCoins = await db.models.manageCoins.findOne({
                  attributes: ['user_id', 'v_coins'],
                  where: {
                    user_id: getUseId.user_id
                  }
                });
                if (getUserRefCoins) {
                    var addCoinsRefUserAccount = getUserRefCoins.v_coins + 200;
                    if (appliedLoan === null) {
                        var addCoins = await db.models.manageCoins.update(
                            {
                                v_coins: addCoinsRefUserAccount,
                            },
                            {
                                where: {
                                    user_id: getUserRefCoins.user_id,
                                },
                            }
                        );
                    }
                } else {
                    const addCoins = await db.models.manageCoins.create({
                        user_id: getUseId.user_id,
                        v_coins: 200,
                    });
                }
            }
        }
    }

    if (appliedLoan) {
        var startdate = appliedLoan.apply_date;
        var new_date = moment(startdate).add(6, 'd').format("YYYY-MM-DD HH:mm:ss");
        if (appliedLoan.status === 4 || appliedLoan.status === 2 && c_Date > new_date || appliedLoan.status === 5 && c_Date > new_date) {
            const create = await db.models.appApplyLoan.create({
                user_id,
                loan_id,
                days,
                required_amount,
                disbursed_amount,
                apply_date: c_Date, 
                total_payable_amount,
                remaining_amount:total_payable_amount,
                redeem_coins: deduct_coins,
                reviewer_1
            });
            if (!create) return next(new AppError("Not Found", 404));
            res.json({
                message: "Loan Applied",
                error: false,
                data: create,
            });
        } else {
            return next(new AppError("Not Found", 404));
        }
    } else {
        const create = await db.models.appApplyLoan.create({
          user_id,
          loan_id,
          days,
          required_amount,
          disbursed_amount,
          apply_date: c_Date, 
          total_payable_amount,
          remaining_amount: total_payable_amount,
          redeem_coins: deduct_coins,
          reviewer_1,
        });
        if (!create) return next(new AppError("Not Found", 404));
        res.json({
            message: "Loan Applied",
            error: false,
            data: create,
        });
    }
});

const sendNotification = async (title, body, user_id) => {  
    const app = await db.models.appInfo.findOne({
      attributes: ['id', 'user_id', 'token'],
      where: {
        deleted_at: null,
        user_id: user_id
      }
    }) 
    if (!app) {
        console.log("Token Not Exist");
    } else {
        var fcm = new FCM(process.env.FCS_SERVER_TOKEN) 
        var message = {
            to: app.token,
            notification: {
            title: title, 
            body: body,
            sound: 'default'
            }
        } 
        fcm.send(message,  function(err, response){
            if (err) {
                console.log("Something has gone wrong!")
            } else {
                console.log("Successfully sent with response: ", response)
            }
        })
    }
  
};

exports.changeLoanStatus = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id; 
    const {status, apply_loan_id, email, reason } = req.body;  
    const app_user = await db.models.appApplyLoan.findOne({
        attributes: ['user_id'],
        where: {
            loan_id : apply_loan_id
        }
    }); 
    if (!app_user) return next(new AppError("Not Found", 404));
    if(status == 1){
        let reviewer_2 = await getReviewerId(5);
        const updated = await db.models.appApplyLoan.update(
            {
              status: status,
              reviewer_2,
              reviewer_1:user_id
            },
            {
              where: {
                loan_id: apply_loan_id
              },
              force: false
            }
          );  
          if (!updated) return next(new AppError("Not Found", 404));
          sendNotification("Loan Status", "Your Loan go in the second review", app_user.user_id );
          res.json({ message: 'Loan Approved', error: false, data: updated });
            // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            // var mailOptions = {
            //     from: process.env.SENDGRID_EMAIL,
            //     to: email,
            //     subject: `Loan is in second verification (Loan Id: ${apply_loan_id})`,
            //     text: `Dear customer\nWe thank you for being our valuable customer. The team at Vizzve is working hard to improve the quality of our service by integrating with technology’s enhancements to make your loan verification process faster than before. We wish to inform you that, please be patients till your loan is approved.\nNote: For your loan application status please stay tune with our app or you can also write us on support@vizzve.com/ for complaints grievance@vizzve.com\nWe thank you for your Cooperation\nRegards\nTeam Vizzve`,
            // }; 
            // sgMail.send(mailOptions).then((response) => {
            //     res.json({ message: 'Loan Mail Send sucessfully', error: false, data: response });
            // }).catch((error) => {
            //     next(new AppError('Fail to send Mail', 404))
            // })
    } else {
        const changeStatus = await db.models.appApplyLoan.update(
            {
              status: status,
              reviewer_1:user_id,
              reason_to_reject: reason
            },
            {
              where: {
                loan_id: apply_loan_id
              },
              force: false
            }
          );
          if (!changeStatus) return next(new AppError("Not Found", 404));
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            var mailOptions = {
            from: process.env.SENDGRID_EMAIL,
            to: email,
            subject: `Application rejected`,
            text: `We are sorry based on the loan Id: ${apply_loan_id} information provided, We are not able to process your application at moment.\nThe following may be the reason for your application rejection 
                • Your not reaching our eligibility criteria 
                • Your currently under unserviceable location
                • You may have missed multiple EMIs in the past 
                • Your current employment profile doesn’t fulfill our criteria
            We Request you to come back after 7 days and apply your loan again.\nIf you think we are wrong please write us on support@vizzve.com`,
            }; 
            sgMail.send(mailOptions).then((response) => {
                res.json({ message: 'Loan Mail Send sucessfully', error: false, data: response });
            }).catch((error) => {
                next(new AppError('Fail to send Mail', 404))
            })
            sendNotification("Loan Status", "Dear customer, Your loan "+ apply_loan_id+ " has been rejected" , app_user.user_id );
            res.json({ message: "Loan Status Changed", error: false, data: status });
    }
});

exports.changeLoanStatusDisbursal = catchAsync(async (req, res, next) => { 
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id; 
    const { status, apply_loan_id, transfer_id, reason} = req.body;
    const { disbursed_amount, apply_date } = req.body.changeStatus; 
    const { email, username } = req.body.customerDetail;
    const app_user = await db.models.appApplyLoan.findOne({
        attributes: ['user_id'],
        where: {
            loan_id : apply_loan_id
        }
    }); 
    if (!app_user) return next(new AppError("Not Found", 404));
    if(status == 3){ 
        const days = req.body.changeStatus.days; 
        const c_Date = moment().format("YYYY-MM-DD HH:mm:ss"); 
        const payable_Date = moment().add(days, "d").format("YYYY-MM-DD HH:mm:ss");
        const updatestatus = await db.models.appApplyLoan.update(
        {
            status: req.body.status, 
            transfer_id:transfer_id,
            payable_date: payable_Date,
            disbursed_date: c_Date,
            reviewer_2:user_id
        },
        {
            where: {
            loan_id: apply_loan_id
            },
            force: false
        }
        );
        if (!updatestatus) return next(new AppError("Not Found", 404));
        sendNotification("Loan Status", "Dear customer, Your loan "+ apply_loan_id+ " has been disbursed in your provided bank account. " , app_user.user_id );
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            var mailOptions = {
                from: process.env.SENDGRID_EMAIL,
                to: email,
                subject: `Subject loan agreement ${apply_loan_id}`,
                text: `Congratulations ${username} with your loan I’d ${apply_loan_id} is been approved. We pleased to inform you that we have processed your loan of Rs${disbursed_amount} on ${apply_date}.\nYou have agreed to our terms and conditions and acknowledged.\nWe request you to pay loan on ${payable_Date}\nWe always love to hear from you for any complaints or suggestions write us on support@vizzve.com\nFor complaints : grievance@vizzve.com\nRegards\nVizzve microsava foundation`,
            }; 
            sgMail.send(mailOptions).then((response) => {
                res.json({ message: 'Loan Disbursed and mail send sucessfully', error: false, data: response });
            }).catch((error) => {
                next(new AppError('Fail to send Mail', 404))
            })
    }else{
        const updatestatus = await db.models.appApplyLoan.update(
        {
            status: req.body.status,
            reviewer_2:user_id,
            reason_to_reject: reason
        },
        {
            where: {
            loan_id: apply_loan_id
            },
            force: false
        }
        );
        if (!updatestatus) return next(new AppError("Not Found", 404));
        sendNotification("Loan Status", "Dear customer, Your loan "+ apply_loan_id+ " has been rejected" , app_user.user_id );
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            var mailOptions = {
            from: process.env.SENDGRID_EMAIL,
            to: email,
            subject: `Application rejected`,
            text: `We are sorry based on the loan Id: ${apply_loan_id} information provided, We are not able to process your application at moment.\nThe following may be the reason for your application rejection 
                • Your not reaching our eligibility criteria 
                • Your currently under unserviceable location
                • You may have missed multiple EMIs in the past 
                • Your current employment profile doesn’t fulfill our criteria
            We Request you to come back after 7 days and apply your loan again.\nIf you think we are wrong please write us on support@vizzve.com`,
            }; 
            sgMail.send(mailOptions).then((response) => {
                res.json({ message: 'Loan Mail Send sucessfully', error: false, data: response });
            }).catch((error) => {
                next(new AppError('Fail to send Mail', 404))
            }) 
            res.json({ message: "Loan Status Changed", error: false, data: status });
    }
});

exports.changeLoanStatusPending = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var userId = decoded.id;
    const {apply_loan_id, transfer_id} = req.body; 
    const updated = await db.models.appApplyLoan.update(
    {
        status: 6,
        transfer_id:transfer_id,
        reviewer_2: userId
    },
    {
        where: { loan_id: apply_loan_id},
        force: false
    }
    ); 
    if (!updated) return next(new AppError('Not Found', 404))
    res.json({message: 'Loan status changed into pending for bank', error: false, data: updated});
});

// Change Loan Status Banned...

exports.changeLoanStatusBanned = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var userId = decoded.id;
    const {status, apply_loan_id, user_id, user_status} = req.body; 
    const updated = await db.models.appApplyLoan.update(
    {
        status: status,
        reviewer_2: userId
    },
    {
        where: { loan_id: apply_loan_id},
        force: false
    }
    );
    if (!updated) return next(new AppError('Not Found', 404)); 
    let changeUserStatus = await chanageUserStatus(user_id, res, user_status);  
});

// Change Loan Status UnBanned...

exports.changeLoanStatusUnBanned = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var userId = decoded.id; 
    const {status, apply_loan_id, user_id, user_status} = req.body;  
    const updated = await db.models.appApplyLoan.update(
    {
        status: status,
        reviewer_2: userId
    },
    {
        where: { loan_id: apply_loan_id},
        force: false
    }
    );
    if (!updated) return next(new AppError('Not Found', 404))
    let changeUserStatus = await chanageUserStatus(user_id, res, user_status); 
});

// ChangeUserStatus

const chanageUserStatus=async(user_id, res, user_status, next)=>{
    const updated = await db.models.appUser.update({
      status: user_status
    }, {
    where: {
        user_id: user_id,
    }
    })
    if (!updated){ 
      return next(new AppError('Not Found', 404))
    }else{
        sendNotification("Notification", user_status == 0 ? "Dear custmer, You are not eligable for loan. please drop a mail to support@vizzive.com for more details" : "Dear custmer, Now you are able to use the app. Sorry for inconvenience" , user_id );
        res.json({ message: 'Loan and user status change sucessfully.', error: false, data: updated,});
    }
}

exports.getTotalCoin = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id;
    const user = await db.models.manageCoins.findOne({
        attributes: ["v_coins"],
        where: {
            deleted_at: null,
            user_id,
        },
    });
    if (!user) return next(new AppError("Not Found", 404));
    res.json({ message: "FAQ found", error: false, data: user });
});

exports.getAllApplyloanWithPayment = catchAsync(async (req, res, next) => {
    const applyloan = await db.models.appApplyLoan.findAll({
      include: [{
        model: db.models.appUser,
        as: 'appUser',
        attributes: ['username', 'email','mobile_no']
      }, {
       model:db.models.appPayment,
        attributes: ['loan_id', 'payment_detail', 'paid_redeem_coins', 'penality'], 
      }],
      attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
      where: {
        deleted_at: null,
        status: [4,8]
      }
    }) 
    if (JSON.stringify(applyloan) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({ message: 'Repayment Details found', error: false, data: applyloan });
  })

exports.getAllApplyloanWithFlat = catchAsync(async (req, res, next) => {
    var applyloan = await db.models.appApplyLoan.findAll({
        include: [{
            model: db.models.appUser,
            as: 'appUser',
            attributes: ['username', 'email','mobile_no', 'user_type'],
            where : { user_type: [0,1] }
        }],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
        order: [["id", "DESC"]],
        where: {
        deleted_at: null,
        status: 3
        }
    })  
    if (JSON.stringify(applyloan) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({ message: 'Repayment Details found', error: false, data: applyloan });
})

exports.getAllApplyloanWithBusinessFlat = catchAsync(async (req, res, next) => {
    const {limit, offset} = req.query;
    var queryObj = {
        include: [{
            model: db.models.appUser,
            as: 'appUser',
            attributes: ['username', 'email','mobile_no'],
            where : { user_type: 2 }
        },
        {
          model: db.models.appBusinessPayment,
          attributes: ['loan_id', 'tx_time', 'order_amount', 'penality', 'created_at']
        }
        ],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
        order: [["id", "DESC"]],
        where: {
            deleted_at: null,
            status: 3
        }
    }
    var count = await db.models.appApplyLoan.count(queryObj) 
    queryObj['limit'] = parseInt(limit);
    queryObj['offset'] = parseInt(offset);
    var applyloan = await db.models.appApplyLoan.findAll(queryObj);

    const output = applyloan.map(each=> {
        each['dataValues']['paymentInfo'] = generateResponseListAdmin(each['dataValues']).summary || {};
        return each;
    });

    if(output && output.length){
       res.json({ message: 'Repayment Details found', error: false, data: output, total: count});
    } else {
        res.json({ message: 'Repayment Details not found', error: false, data: [], total:0 });
    }
   
})

exports.getSearchAllApplyloanWithFlat = catchAsync(async (req, res, next) => { 
    var query = url.parse(req.url, true).query; 
    const {loan_id, email, mobile_no, name, id_number } = query; 
    let whereClause;
    let whereClause2;  
    let whereClause3;
    if(mobile_no != "") {
        whereClause = {
            mobile_no,
            user_type:[0,1]
        };
        whereClause2 = {
            deleted_at: null,
            status: 3
        }; 
    }else if (email != "") {
        whereClause = {
            email,
            user_type:[0,1]
        };
        whereClause2 = {
            deleted_at: null,
            status: 3
        };
    }else if (loan_id != "") {
        whereClause2 = {
            deleted_at: null,
            loan_id,
            status: 3,
        };
        whereClause = { 
            user_type:[0,1]
        };
    }else if (name != "") {
        whereClause = {
            username:name,
            user_type:[0,1]
        };
        whereClause2 = {
            deleted_at: null, 
            status: 3,
        };
    }else if (id_number != "") {
        whereClause3 = { 
            adhaar_no:id_number
        };
        whereClause2 = {
            deleted_at: null, 
            status: 3,
        };
        whereClause = { 
            user_type:[0,1]
        };
    }else {
        whereClause2 = {
            deleted_at: null,
            status: 3
        };
        whereClause = { 
            user_type:[0,1]
        };
    }  
    var applyloan = await db.models.appApplyLoan.findAll({ 
        include: [{
            model: db.models.appUser,
            as: 'appUser',
            attributes: ['username', 'email','mobile_no'],
            where:whereClause
        },
        {      
            model: db.models.appKycDetails, 
            attributes: ['adhaar_no', 'reg_mob_no', 'pan_no'],
            where: whereClause3 
        }],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
        order: [["id", "DESC"]],
        where: whereClause2
    })  
    if (JSON.stringify(applyloan) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({ message: 'Repayment Details found', error: false, data: applyloan });
})

exports.getSearchAllApplyBusinessloanWithFlat = catchAsync(async (req, res, next) => { 
    var query = url.parse(req.url, true).query; 
    const {loan_id, email, mobile_no, name, id_number, limit, offset } = query; 
    let whereClause = { user_type: 2};
    let whereClause2 = { status: 3, deleted_at: null}  
    let whereClause3 = {}

    if (mobile_no) {
        whereClause['mobile_no'] = mobile_no
    }
    if (email) {
      whereClause['email'] = email
    }
    if (loan_id) {
      whereClause2['loan_id'] = Number(loan_id)
    }
    if (name) {
      whereClause['username'] =  { [Op.substring] : name };
    }
    if (id_number) {
     whereClause3['adhaar_no'] = id_number;
    }

    var queryObj = { 
        include: [
        {
            model: db.models.appUser,
            as: 'appUser',
            attributes: ['username', 'email','mobile_no'],
            where:whereClause
        },
        {
          model: db.models.appBusinessPayment,
          attributes: ['loan_id', 'tx_time', 'order_amount', 'penality', 'created_at']
        },
        {      
            model: db.models.appKycDetails, 
            attributes: ['adhaar_no', 'reg_mob_no', 'pan_no'],
            where: whereClause3 
        }],
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'disbursed_date', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'status', 'created_at', 'updated_at'],
        order: [["id", "DESC"]],
        where: whereClause2
    }
    var count = await db.models.appApplyLoan.findAll(queryObj);
    queryObj['limit'] = Number(limit);
    queryObj['offset']= Number(offset) 
    var applyloan = await db.models.appApplyLoan.findAll(queryObj);

    const output = applyloan.map(each=> {
        each['dataValues']['paymentInfo'] = generateResponseListAdmin(each['dataValues']).summary || {};
        return each;
    });

    if(output && output.length) {
      res.json({ message: 'Business Repayment Details found', error: false, data: output, total:count });
    } else{
      res.json({ message: 'Business Repayment Details Not found', error: false, data: [], total:0 });
    }
    
})

// Get Overall Collection Apply Loan
exports.getOverallCollectionApplyloan = catchAsync(async (req, res, next) => {
    const decoded = jwt_decode(req.headers.authorization);
    const user_id = decoded.id;
    const has_role = decoded.has_role; 
    const {offset, limit} = req.params; 
    let whereClause;   
    switch (parseInt(has_role)) { 
        case 6:
            // team = "Collection Manager"; 
            // whereClause =  {
            //     deleted_at: null, status: 3, collection_manager:user_id 
            // }
            whereClause =  {
                deleted_at: null, 
                status: 3,
                s1: {[Op.ne]: 0} 
            } 
          break;
        case 7:
            // team = "Customer Support";
            whereClause =  {
                deleted_at: null, status: 3, customer_care:user_id, s1:0 
            }
          break;
        case 8:
            // team = "S1";
            whereClause =  {
                deleted_at: null, status: 3, s1:user_id, s2:0 
            }
          break;
        case 9:
            // team = "S2";
            whereClause =  {
                deleted_at: null, status: 3, s2:user_id, s3:0 
            }
          break;
        case 10:
            // team = "S3";
            whereClause =  {
                deleted_at: null, status: 3, s3:user_id, m1:0 
            }
          break;
        case  11:
            // team = "M1";
            whereClause =  {
                deleted_at: null, status: 3, m1:user_id, m2:0 
            }
          break;
        case  12:
            // team = "M2";
            whereClause =  {
                deleted_at: null, status: 3, m2:user_id, collection_manager:0 
            }
          break;
        default:
            // team = "Admin";
            whereClause =  {
                deleted_at: null, 
                status: 3,
                customer_care: {[Op.ne]: 0} 
            } 
    } 
    var applyloan = await db.models.appApplyLoan.findAll({
        include: [{
                model: db.models.appUser,
                as: 'appUser',
                attributes: ['username', 'email','mobile_no'],
                where:{user_type : [0,1]}
            },
            {
                model: db.models.loanRemark, 
                attributes: ['user_id','remarks'], 
                include: [{
                    model: db.models.user, 
                    attributes: ['firstname', 'lastname'],
                }], 
            }, 
        ], 
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'customer_care','s1','s2','s3','m1','m2','collection_manager', 'status', 'created_at', 'updated_at'],
        order: [["id", "DESC"]],
        limit: parseInt(limit),
        offset: parseInt(offset), 
        where: whereClause 
    })   
    const countLoan = await db.models.appApplyLoan.count({
        include: [{
            model: db.models.appUser,
            as: 'appUser',
            attributes: ['username', 'email','mobile_no'],
            where : { user_type: [0,1] }
        }],
        where: whereClause  
    }) 
    if (JSON.stringify(applyloan) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    const applyLoans = [];  
    for (const element of applyloan) { 
        let response = [];
        if(element.loanRemarks.length > 0){ 
            const arry = element.loanRemarks  
            const lastElement = arry[arry.length - 1];  
            response = {
                'username': lastElement.user.firstname + ' ' +  lastElement.user.lastname,
                'remarks': lastElement.remarks[Object.keys(lastElement.remarks).length -1]
            };
        }
        
        const countTodayFreshLoan = await db.models.appApplyLoan.count({ 
            attributes: ['user_id',[db.fn('COUNT', db.col('user_id')), 'total']] ,
            group : ['user_id'],
            where: {
              user_id: element.user_id,
              status: 4
            }
        })  

        var users = await db.query(`SELECT * FROM (SELECT * FROM vizzve_apply_loan WHERE user_id =:user_id ORDER BY Id DESC LIMIT 2) tbl1 ORDER BY Id LIMIT 1`,{
            type:QueryTypes.SELECT,
            replacements:{user_id:element.user_id}
        }); 
        let reapply;
        if(_.isEmpty(countTodayFreshLoan) == false && users[0].status == 4){ 
            reapply = "RE"
        }else{
            reapply = "" 
        } 
        applyLoans.push({
            id:element.id,
            user_id:element.user_id,
            loan_id:element.loan_id,
            required_amount:element.required_amount,
            remaining_amount: element.remaining_amount,
            assigned: element.appUser.username,
            apply_date:element.apply_date,
            disbursed_date:element.disbursed_date,
            days:element.days,
            payable_date:element.payable_date,
            reviewer_1:element.reviewer_1,
            reviewer_2:element.reviewer_2, 
            customerName:element.appUser.username,
            customerMobileNumber:element.appUser.mobile_no,
            customerEmail:element.appUser.email,
            customerUserType:element.appUser.user_type, 
            customerReapply:reapply,
            customerOverdue:users[0].s1 != 0 ? "OD":"",
            customerExtend:users[0].status == 8 ? "EXT":"",
            remark: _.isEmpty(response) == false ? response.remarks.remark: "No Remark",
            remarkDate: _.isEmpty(response) == false ? response.remarks.remark_submitted_date: "No Remark",
            remarker:  _.isEmpty(response) == false ? response.username : "No Remark", 
            customer_care: element.customer_care,
            s1: element.s1,
            s2: element.s2,
            s3: element.s3,
            m1: element.m1,
            m2: element.m2,
            collection_manager: element.collection_manager, 
        })   
    };  
    res.json({ message: 'Repayment Details found', error: false, data: applyLoans, total: countLoan });
}) 

//   Get Overall Business Collection Loan

exports.getOverallBusinessCollectionLoan = catchAsync(async (req, res, next) => {
    const decoded = jwt_decode(req.headers.authorization);
    const user_id = decoded.id; 
    const has_role = decoded.has_role; 
    const {offset, limit} = req.params; 
    let whereClause;   
    switch (parseInt(has_role)) { 
        case 6:
            // team = "Collection Manager"; 
            whereClause =  {
                deleted_at: null, 
                status: 3,
                customer_care: {[Op.ne]: 0} 
            } 
          break;
        case 7:
            // team = "Customer Support";
            whereClause =  {
                deleted_at: null, status: 3, customer_care:user_id, s1:0 
            }
          break;
        case 8:
            // team = "S1";
            whereClause =  {
                deleted_at: null, status: 3, s1:user_id, s2:0 
            }
          break;
        case 9:
            // team = "S2";
            whereClause =  {
                deleted_at: null, status: 3, s2:user_id, s3:0 
            }
          break;
        case 10:
            // team = "S3";
            whereClause =  {
                deleted_at: null, status: 3, s3:user_id, m1:0 
            }
          break;
        case  11:
            // team = "M1";
            whereClause =  {
                deleted_at: null, status: 3, m1:user_id, m2:0 
            }
          break;
        case  12:
            // team = "M2";
            whereClause =  {
                deleted_at: null, status: 3, m2:user_id, collection_manager:0 
            }
          break;
        default:
            // team = "Admin";
            whereClause =  {
                deleted_at: null, 
                status: 3,
                customer_care: {[Op.ne]: 0} 
            } 
    } 
    var applyloan = await db.models.appApplyLoan.findAll({
      include: [{
            model: db.models.appUser,
            as: 'appUser',
            attributes: ['username', 'email','mobile_no'],
            where : { user_type: 2 }
        },
        {
            model: db.models.loanRemark, 
            attributes: ['user_id','remarks'], 
            include: [{
                model: db.models.user, 
                attributes: ['firstname', 'lastname'],
            }], 
        }, 
    ],
    
      attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'customer_care','s1','s2','s3','m1','m2','collection_manager', 'status', 'created_at', 'updated_at'],
      order: [["id", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset), 
      where: whereClause 
    })  
    if (!applyloan.length) return next(new AppError('Not Found', 404))
    const countLoan = await db.models.appApplyLoan.count({
            include: [{
                model: db.models.appUser,
                    as: 'appUser',
                    attributes: ['username', 'email','mobile_no'],
                    where : { user_type: 2 }
                }],
            where: whereClause  
    })
        const applyLoans = [];
        let reapply;  
        let userArray = []; 
          applyloan.forEach((item)=> {
          userArray.push(item);
        });
        const getApplyLoan = await db.models.appApplyLoan.findAll({ 
            attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'disbursed_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'customer_care','s1','s2','s3','m1','m2','collection_manager', 'status', 'created_at', 'updated_at'],
            order: [["id", "DESC"]],
            where: {
            deleted_at: null, 
            status: 4
          } 
        }) 
        if (!getApplyLoan.length) return next(new AppError('Not Found', 404))
            let uArray = []; 
              getApplyLoan.forEach((item)=> {
              uArray.push(item);
            });
            var isReapply = false, odStatus = false, exStatus = false;
            for(var i=0; i < userArray.length;i++){
                let response = [];
                isReapply = false;
                odStatus = false;
                exStatus = false;
                for(var j=0; j < uArray.length; j++){
                    if(userArray[i].user_id === uArray[j].user_id){
                        if(uArray[j].status === 8){ 
                            exStatus = true
                        } else {
                            exStatus =  false 
                        }
                        odStatus = uArray[j].s1 != 0 ? true : false;
                        isReapply = true;
                        break;
                    }
                }
                const {loanRemarks} = userArray[i];
                if(loanRemarks.length > 0){ 
                    const lastElement = loanRemarks[loanRemarks.length - 1];  
                    response = {
                        'username': lastElement.user.firstname + ' ' +  lastElement.user.lastname,
                        'remarks': lastElement.remarks[Object.keys(lastElement.remarks).length -1],
                    };
                }
                isReapply ? reapply = "RE" : reapply = "";
                applyLoans.push({
                    id:userArray[i].id,
                    user_id:userArray[i].user_id,
                    loan_id:userArray[i].loan_id,
                    required_amount:userArray[i].required_amount,
                    remaining_amount: userArray[i].remaining_amount,
                    assigned: userArray[i].username,
                    apply_date:userArray[i].apply_date,
                    disbursed_date:userArray[i].disbursed_date,
                    days:userArray[i].days,
                    payable_date:userArray[i].payable_date,
                    reviewer_1:userArray[i].reviewer_1,
                    reviewer_2:userArray[i].reviewer_2, 
                    customerName:userArray[i].appUser.username,
                    customerMobileNumber:userArray[i].appUser.mobile_no,
                    customerEmail:userArray[i].appUser.email,
                    customerUserType:userArray[i].appUser.user_type, 
                    customerReapply:reapply,
                    customerOverdue:odStatus ? "OD":"",
                    customerExtend:exStatus ? "EXT":"",
                    remark: _.isEmpty(response) == false ? response.remarks.remark: "No Remark",
                    remarkDate: _.isEmpty(response) == false ? response.remarks.remark_submitted_date: "No Remark",
                    remarker:  _.isEmpty(response) == false ? response.username : "No Remark", 
                    customer_care: userArray[i].customer_care,
                    s1: userArray[i].s1,
                    s2: userArray[i].s2,
                    s3: userArray[i].s3,
                    m1: userArray[i].m1,
                    m2: userArray[i].m2,
                    collection_manager: userArray[i].collection_manager, 
                })   
            }
    res.json({ message: 'Repayment Details found', error: false, data: applyLoans, total: countLoan });
})  

// Get Search Overall Collection loan

// exports.getSearchOverallCollection = catchAsync(async (req, res, next) => { 
//     const decoded = jwt_decode(req.headers.authorization);
//     const user_id = decoded.id;
//     const has_role = decoded.has_role; 
//     const c_Date = moment().format("YYYY-MM-DD HH:mm:ss");  
//     var { loan_id, mobile_no, email } = req.query;  
//     let whereClause; 
//     let whereClause2;  
//     switch (parseInt(has_role)) { 
//         case 6:
//             // team = "Collection Manager"; 
//             if (mobile_no) {
//                 whereClause = {
//                     mobile_no,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, collection_manager:user_id
//                 }; 
//             } else if (email) {
//                 whereClause = {
//                     email,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, collection_manager:user_id
//                 };
//             }
//             if (loan_id) {
//                 whereClause2 = {
//                     deleted_at: null, status: 3, collection_manager:user_id, loan_id
//                 };
//             } 
//           break;
//         case 7:
//             // team = "Customer Support";
//             if (mobile_no) {
//                 whereClause = {
//                     mobile_no,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, customer_care:user_id, s1:0
//                 }; 
//             } else if (email) {
//                 whereClause = {
//                     email,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, customer_care:user_id, s1:0
//                 };
//             }
//             if (loan_id) {
//                 whereClause2 = {
//                     deleted_at: null, status: 3, customer_care:user_id, s1:0, loan_id
//                 };
//             }  
//           break;
//         case 8:
//             // team = "S1";
//             if (mobile_no) {
//                 whereClause = {
//                     mobile_no,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, s1:user_id, s2:0
//                 }; 
//             } else if (email) {
//                 whereClause = {
//                     email,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, s1:user_id, s2:0
//                 };
//             }
//             if (loan_id) {
//                 whereClause2 = {
//                     deleted_at: null, status: 3, s1:user_id, s2:0, loan_id
//                 };
//             }  
             
//           break;
//         case 9:
//             // team = "S2";
//             if (mobile_no) {
//                 whereClause = {
//                     mobile_no,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, s2:user_id, s3:0 
//                 }; 
//             } else if (email) {
//                 whereClause = {
//                     email,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, s2:user_id, s3:0 
//                 };
//             }
//             if (loan_id) {
//                 whereClause2 = {
//                     deleted_at: null, status: 3, s2:user_id, s3:0 , loan_id
//                 };
//             } 
//           break;
//         case 10:
//             // team = "S3";
//             if (mobile_no) {
//                 whereClause = {
//                     mobile_no,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, s3:user_id, m1:0 
//                 }; 
//             } else if (email) {
//                 whereClause = {
//                     email,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, s3:user_id, m1:0 
//                 };
//             }
//             if (loan_id) {
//                 whereClause2 = {
//                     deleted_at: null, status: 3, s3:user_id, m1:0, loan_id
//                 };
//             }  
//           break;
//         case  11:
//             // team = "M1";
//             if (mobile_no) {
//                 whereClause = {
//                     mobile_no,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, m1:user_id, m2:0 
//                 }; 
//             } else if (email) {
//                 whereClause = {
//                     email,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, m1:user_id, m2:0 
//                 };
//             }
//             if (loan_id) {
//                 whereClause2 = {
//                     deleted_at: null, status: 3, m1:user_id, m2:0, loan_id
//                 };
//             } 
//           break;
//         case  12:
//             // team = "M2";
//             if (mobile_no) {
//                 whereClause = {
//                     mobile_no,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, m2:user_id, collection_manager:0 
//                 }; 
//             } else if (email) {
//                 whereClause = {
//                     email,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, m2:user_id, collection_manager:0 
//                 };
//             }
//             if (loan_id) {
//                 whereClause2 = {
//                     deleted_at: null, status: 3, m2:user_id, collection_manager:0, loan_id
//                 };
//             } 
//           break;
//         default:
//             // team = "Admin";
//             if (mobile_no) {
//                 whereClause = {
//                     mobile_no,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, payable_date: { [Op.lte]: c_Date }
//                 }; 
//             } else if (email) {
//                 whereClause = {
//                     email,
//                 };
//                 whereClause2 = {
//                     deleted_at: null, status: 3, payable_date: { [Op.lte]: c_Date }
//                 };
//             }
//             if (loan_id) {
//                 whereClause2 = {
//                     deleted_at: null, status: 3, payable_date: { [Op.lte]: c_Date }, loan_id
//                 };
//             }  
//     }  
//     var applyloan = await db.models.appApplyLoan.findAll({
//       include: [{
//         model: db.models.appUser,
//         as: 'appUser',
//         attributes: ['username', 'email','mobile_no'],
//         where: whereClause
//       }],
//       attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'customer_care','s1','s2','s3','m1','m2','collection_manager', 'status', 'created_at', 'updated_at'],
//       order: [["id", "DESC"]],
//       where: whereClause2 
//     })  
 
//     if (JSON.stringify(applyloan) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
//     res.json({ message: 'Repayment Details found', error: false, data: applyloan });
//   })

//   Get Case Review Loan....

exports.getAllCaseReviewLoan = catchAsync(async (req, res, next) => {
    const decoded = jwt_decode(req.headers.authorization);
    const user_id = decoded.id;
    const has_role = decoded.has_role;  
    const {offset, limit} = req.params;  
    let whereClause;   
    switch (parseInt(has_role)) { 
        case 4:
            // team = "First Reviewer"; 
            whereClause =  {
                deleted_at: null, status:{[Op.or]: [1,2]}, reviewer_1:user_id 
            }
          break;
        case 5:
            // team = "Second Reviewer";
            whereClause =  {
                deleted_at: null, status:{[Op.or]: [3,5]}, reviewer_2:user_id  
            }
          break;
        default:
            // team = "Admin";
            whereClause =  {
                deleted_at: null, status:{[Op.or]: [1,2,3,5]}
            } 
    }   
    const applyloan = await db.models.appApplyLoan.findAll({
      include: [{
            model: db.models.appUser,
            as: 'appUser',
            attributes: ['username', 'email','mobile_no','user_type']
        },
        {
            model: db.models.loanStatus, 
            attributes: ['status_id', 'status'],
        }  
      ],
      attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'customer_care','s1','s2','s3','m1','m2','collection_manager', 'status', 'created_at', 'updated_at'],
      limit: parseInt(limit),
        offset: parseInt(offset),
        order: [
            ['id', 'DESC'],
        ],
      where: whereClause 
    })   
    const countLoan = await db.models.appApplyLoan.count({
        where: whereClause
    })  
    if (JSON.stringify(applyloan) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
    res.json({ message: 'Case Review found', error: false, data: applyloan, total:countLoan});
})
  
  //   Get Search Case Review Loan....

// exports.getSearchAllCaseReviewLoan = catchAsync(async (req, res, next) => {
//     const decoded = jwt_decode(req.headers.authorization);
//     const user_id = decoded.id;
//     const has_role = decoded.has_role;  
//     var query = url.parse(req.url, true).query;
//     var { loan_id, mobile_no, email } = query; 
//     let team;
//     let whereClause; 
//     let whereClause2;  
//     switch (parseInt(has_role)) { 
//         case 4:
//             team = "First Reviewer";  
//             if(loan_id != ""){
//                 whereClause = {deleted_at: null, status:{[Op.or]: [1,2]}, loan_id, reviewer_1:user_id}
//             }else{
//                 whereClause = {deleted_at: null, status:{[Op.or]: [1,2]}, reviewer_1:user_id} 
//             }
//             if(mobile_no != ""){
//                 whereClause2 = {mobile_no:mobile_no}
//             } else if(email != ""){
//                 whereClause2 = {email:email}
//             }    
//           break;
//         case 5:
//             team = "Second Reviewer";
//             if(loan_id != ""){
//                 whereClause = {deleted_at: null, status:{[Op.or]: [3,5]}, loan_id, reviewer_2:user_id}
//             }else{
//                 whereClause = {deleted_at: null, status:{[Op.or]: [3,5]}, reviewer_2:user_id} 
//             }
//             if(mobile_no != ""){
//                 whereClause2 = {mobile_no:mobile_no}
//             } else if(email != ""){
//                 whereClause2 = {email:email}
//             }    
//           break;
//         default:
//             team = "Admin";
//             if(loan_id != ""){
//                 whereClause = {deleted_at: null, status:{[Op.or]: [1,2,3,5]}, loan_id}
//             }else{
//                 whereClause = {deleted_at: null, status:{[Op.or]: [1,2,3,5]}} 
//             }
//             if(mobile_no != ""){
//                 whereClause2 = {mobile_no:mobile_no}
//             } else if(email != ""){
//                 whereClause2 = {email:email}
//             }
           
//     }  
//     var applyloan = await db.models.appApplyLoan.findAll({
//       include: [{
//         model: db.models.appUser,
//         as: 'appUser',
//         attributes: ['username', 'email','mobile_no','user_type'],
//         where: whereClause2
//         },{
//             model: db.models.loanStatus, 
//             attributes: ['status_id', 'status'],
//         }], 
//       attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'customer_care','s1','s2','s3','m1','m2','collection_manager', 'status', 'created_at', 'updated_at'],
//       order: [["id", "DESC"]],
//       where: whereClause 
//     }) 
//     const loanStatus = await db.models.loanStatus.findAll({
//         attributes: ["id", "status_id", "status"], 
//     });   
//     if (JSON.stringify(applyloan) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
//     res.json({ message: 'Repayment Details found', error: false, data: applyloan, status: loanStatus});
//   }) 

exports.sendLoanMail = catchAsync(async (req, res, next) => { 
      var {user_email, loan_id } = req.body; 
          sgMail.setApiKey(process.env.SENDGRID_API_KEY)
          var mailOptions = {
            from: process.env.SENDGRID_EMAIL,
            to: user_email,
            subject: `Your loan verification (Loan Id: ${loan_id})`,
            text: `Dear customer\nWe thank you for being our valuable customer. The team at Vizzve is working hard to improve the quality of our service by integrating with technology’s enhancements to make your loan verification process faster than before. We wish to inform you that, please be patients till your loan is approved.\nNote: For your loan application status please stay tune with our app or you can also write us on support@vizzve.com/ for complaints grievance@vizzve.com\nWe thank you for your Cooperation\nRegards\nTeam Vizzve`,
          }; 
          sgMail
            .send(mailOptions)
            .then((response) => {
              res.json({ message: 'Loan Mail Send sucessfully', error: false, data: response });
            })
            .catch((error) => {
              next(new AppError('Fail to send Mail', 404))
            })
})

exports.sendApprovedLoanMail = catchAsync(async (req, res, next) => {  
    var {email,first_name, last_name, loan_id, payable_amount, applied_date, payable_date } = req.body; 
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    var mailOptions = {
        from: process.env.SENDGRID_EMAIL,
        to: email,
        subject: `Subject loan agreement ${loan_id}`,
        text: `Congratulations ${first_name} ${last_name} with your loan I’d ${loan_id} is been approved. We pleased to inform you that we have processed your loan of Rs${payable_amount} on ${applied_date}.\nYou have agreed to our terms and conditions and acknowledged.\nWe request you to pay loan on ${payable_date}\nWe always love to hear from you for any complaints or suggestions write us on Support@vizzve.com\nFor complaints : grievance@vizzve.com\nRegards\nVizzve microsava foundation`,
    }; 
    sgMail
        .send(mailOptions)
        .then((response) => {
        res.json({ message: 'Approval mail send sucessfully', error: false, data: response });
        })
        .catch((error) => {
        next(new AppError('Fail to send Mail', 404))
        })
})

const calculatePenalty = (daysNotPaid, amount, percentage) => {
    let penalty = 0
    for (let i = 0; i < daysNotPaid; i++) {
        if (penalty === 0) {
            penalty = (amount + (amount / 100) * percentage);
        } else {
            penalty = (penalty + amount) + ((penalty + amount) / 100) * percentage;
        }
    }
    return parseFloat(penalty.toFixed(2));
}

const calculatePenaltyOnly = (daysNotPaid, amount, percentage) => {
    let penalty = 0
    for (let i = 0; i < daysNotPaid; i++) {
       penalty +=  (percentage / 100) * amount;
    }
    return parseFloat(penalty.toFixed(2));
}

const generateResponseList = (transactionsList) => {
    const {
        total_payable_amount,
        remaining_amount,
        disbursed_date,
        days,
        appBusinessPayments,
        payable_date
    } = transactionsList["dataValues"]; 
    let current = moment().unix();
    let daysInUnix = [];
    let amountPerTransaction = total_payable_amount / days;
    let daysNotPaid = null;
    let penaltyPercentage = 0.3;
    let transactions = {};
    for (let i = 0; i < days; i++) {
        daysInUnix.push(
            moment(disbursed_date, "YYYY-MM-DD HH:mm:ss")
                .add(i + 1, "day")
                .startOf("day")
                .unix()
        );
    }
    let penaltyAmountAfterPaymentDate = 0 

    if(current > moment(payable_date).unix()) {
        const diff = moment(current*1000).diff(moment(payable_date),'days');

        penaltyAmountAfterPaymentDate = calculatePenaltyOnly(
          diff,
          remaining_amount,
          0.6
        );
        
    }
    let dates = daysInUnix.filter((item) => item <= current);
    dates.forEach((items, index) => {
        let pendingTransaction = moment.unix(items).format("YYYY-MM-DD");
        transactions[pendingTransaction] = {
            forDay: index + 1,
            forDate: pendingTransaction,
            paid: false,
            amount: parseFloat(amountPerTransaction.toFixed(2)),

        };
    });
    dates.forEach((items) => {
        let pendingTransaction = moment.unix(items).format("YYYY-MM-DD");
        appBusinessPayments.forEach((item) => {
            let paidTransaction = Date.parse(item.tx_time) / 1000;
            let momentPaid = moment.unix(paidTransaction).format("YYYY-MM-DD");
            if (moment(pendingTransaction).isSame(momentPaid, "day")) {
                transactions[momentPaid] = {
                    ...transactions[momentPaid],
                    paid: true,
                    amount: parseFloat(item.order_amount),
                };
            }
        });
    });
    // daysNotPaid = Object.values(transactions).reduce((a, item) => {
    //     return (a += !item.paid);
    // }, -1);
    let transactionDays = Object.keys(transactions);
    let daysToPay=0;
    for(let i=transactionDays.length-2;i>=0;i--){
    if (!transactions[transactionDays[i]].paid) {
      daysToPay+=1;
    } else {
      break;
    }
    }
    if (daysToPay > 0) {
      const outstanding =
        Object.keys(transactions)[Object.keys(transactions).length - 1];
      if (
        !transactions[outstanding].paid &&
        !transactions[
          Object.keys(transactions)[Object.keys(transactions).length - 2]
        ].paid
      ) {
        const penaltyAmount = calculatePenalty(
          daysToPay,
          amountPerTransaction,
          penaltyPercentage
        ); 
        const outstandingAmount = amountPerTransaction + penaltyAmount + penaltyAmountAfterPaymentDate;
        const amountWithoutPenalty = amountPerTransaction;
        transactions[outstanding].amount = parseFloat(outstandingAmount.toFixed(2));
        transactions[outstanding].amountWithoutPenalty = parseFloat(amountWithoutPenalty.toFixed(2));
        transactions[outstanding].penalty = parseFloat(penaltyAmount.toFixed(2));
      }
    }
    return transactions;
};

exports.getTransactions = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id; 
    const transactionsList = await db.models.appApplyLoan.findOne({
      include: [
        {
          model: db.models.appUser,
          as: 'appUser',
          attributes: ['username', 'email', 'mobile_no']
        },
        {
          model: db.models.appBusinessPayment,
          attributes: ['loan_id', 'tx_time', 'order_amount', 'penality', 'created_at']
        }
      ],
      attributes: [
        'total_payable_amount',
        'remaining_amount',
        'loan_id',
        'apply_date',
        'disbursed_date',
        'days',
        'payable_date'
      ],
      where: {
        loan_id: req.body.loanId,
        user_id
      }
    });
    if (!transactionsList) return next(new AppError("Not Found", 404));
    const output  = generateResponseList(transactionsList);
    //const result = formatAppFlat(output);
    res.json({
        message: "TransactionDetails",
        error: false,
        data: output,
    });
}); 

const formatAppFlat = (output) =>{
    let result = output.transactions.map(each=>{
        each.amount = each.installment;
        return each;
    });
    result[0].amount = output.summary.remainingAmtPay;
    result[0].amountWithoutPenalty = result[0].installment;
    result[0].penaltyAmountAfterPaymentDate = output.summary.penaltyAfterPaymentDay;
    result[0].penalty = output.summary.overallPenality;
    let ou = {}; 
    result.map(c=>{
        ou[c.forDate] = c;
    });
    return ou;
}

const generateResponseListAdmin = (transactionsList) => {
     const inpuData = transactionsList["dataValues"] || transactionsList;
    const {
        total_payable_amount,
        remaining_amount,
        disbursed_date,
        days,
        appBusinessPayments,
        payable_date
    } = inpuData 

    let current = moment().unix();
    let daysInUnix = [];
    let amountPerTransaction = total_payable_amount / days;
    let penaltyPercentage = 0.3;
    let transactionsOutput = []

    const checkPaymentDoneOnSameDay = (d) =>{
       let done = false;
       if(appBusinessPayments){
           appBusinessPayments.map(each=>{
              if (moment(each.tx_time).isSame(d, 'days') && moment(each.created_at).isSame(d,'days')) {
                done = true;
              }
           });
       }
       return done;
    }

    const checkPaymentDone = (d) =>{
       let done = false;
       if(appBusinessPayments){
           appBusinessPayments.map(each=>{
              if (moment(each.tx_time).isSame(d,'days')) {
                done = true;
              }
           });
      }
       return done;
    }

    const checkPenalityPaymentDone = (d) =>{
       let done = false;
        if(appBusinessPayments){
       appBusinessPayments.map(each=>{
          if (moment(each.tx_time).isSame(d,'days') && each.penality) {
            done = true;
          }
       });
      }
       return done;
    }

    const totalPaidInstall = () =>{
       let payments = 0;
        if(appBusinessPayments){
            appBusinessPayments.map(each=>{
                payments+=Number(each.order_amount)
            });
        }
       return payments;
    }

    const totalPaidPenalityAmnt = () => {
       let p = 0;
        if(appBusinessPayments){
       appBusinessPayments.map(each=>{
         if(each.penality)
           p+=Number(each.penality.toFixed(2));
       });
   }
       return p;
    }


    const getPenality = (d, dayDiff, amountPerTransaction, penalityPercentage=0.3) =>{
      let penality = 0;
      let amount = 0;
      let amountwithpenality = amountPerTransaction;
       
      for(let i=0;i<dayDiff;i++) {
       const current = moment(d, "YYYY-MM-DD")
                .add(i+1 , "day")
                .startOf("day");
       if (!checkPaymentDoneOnSameDay(current) && moment().diff(moment(current),'days')>0) {
         let penalityperTrans = (penalityPercentage / 100)*amountwithpenality;
         penality +=  penalityperTrans;
         amountwithpenality = amountPerTransaction + penality
       }
      }

      return penality > 0 ? penality :0;
    }

    const getPenalitAfterPaymentDay = (ts) =>{

      const amount = ts.reduce((s,a)=>{
        if(!a.paidOnCorrectDay){
            s+=(Number(a.installment)+Number(a.penality))
        };
        return s;
       }, 0);

      const lastPaymentDay =  moment(disbursed_date, "YYYY-MM-DD")
                .add(days, "day");
                
     const today = moment();
     let penality = 0;

     const dayDiff = today.diff(lastPaymentDay, 'days');
     if(dayDiff > 0) {
       const dayDiff = today.diff(lastPaymentDay, 'days')-1;
       penality = Number(getPenality(lastPaymentDay, dayDiff, amount, 0.6).toFixed(2));
     }
     return penality;
    }

    for (let i = 0; i < days; i++) {
        let disbursed =  moment(disbursed_date, "YYYY-MM-DD")
                .startOf("day");

        let current =  moment(disbursed_date, "YYYY-MM-DD")
                .add(i + 1, "day")
                .startOf("day");
        let today = moment().startOf("day").unix()
        if(current.unix()<=today){
            transactionsOutput.push({
                installment:Number(amountPerTransaction.toFixed(2)),
                paid: checkPaymentDone(current),
                paidOnCorrectDay: checkPaymentDoneOnSameDay(current),
                penalityPaid: checkPenalityPaymentDone(current),
                penality: getPenality(disbursed, i+1, amountPerTransaction).toFixed(2),
                forDate: current.format("YYYY-MM-DD"),
                id:current.unix()
            })
       }
    }
   const totalinstallPaid = totalPaidInstall();
   const totalPenalityPaid =totalPaidPenalityAmnt();
   const amountTotal = Number(transactionsOutput.reduce((s,a)=>(s+Number(a.installment)),0).toFixed(2));
   const penaltyTotal = Number(transactionsOutput.reduce((s,a)=>(s+Number(a.penality)),0).toFixed(2));
   const penaltyAfterPaymentDay = Number(getPenalitAfterPaymentDay(transactionsOutput).toFixed(2));

    const penalityPaid = totalPenalityPaid;
    const overallPenality = Number((penaltyTotal+penaltyAfterPaymentDay).toFixed(2));
    const penNonPaid = Number((overallPenality-totalPenalityPaid).toFixed(2));
    const penalityNonPaid =  penNonPaid>0?penNonPaid: 0;
    const amountTotalPaid = (totalPenalityPaid+totalinstallPaid);
    const amountTotalNonPaid = Number((amountTotal-totalinstallPaid).toFixed(2));
    const  remainingAmtPay =Number((amountTotalNonPaid + penalityNonPaid).toFixed(2))
  const summary = {
    amountTotal, 
    penaltyTotal,
    penalityPaid,
    penalityNonPaid,
    amountTotalPaid,
    amountTotalNonPaid,
    penaltyAfterPaymentDay,
    overallPenality,
    remainingAmtPay: remainingAmtPay>0? remainingAmtPay: 0
  }
  return {summary,transactions: transactionsOutput.sort((a,b)=>a.id>b.id? -1: 1)};
};

exports.getTransactionsAdmin = catchAsync(async (req, res, next) => {
    const transactionsList = await db.models.appApplyLoan.findOne({
      include: [
        {
          model: db.models.appUser,
          as: 'appUser',
          attributes: ['username', 'email', 'mobile_no']
        },
        {
          model: db.models.appBusinessPayment,
          attributes: ['loan_id', 'tx_time', 'order_amount', 'penality', 'created_at']
        }
      ],
      attributes: [
        'total_payable_amount',
        'remaining_amount',
        'loan_id',
        'apply_date',
        'disbursed_date',
        'days',
        'payable_date'
      ],
      where: {
        loan_id: req.body.loanId, 
      }
    });
    if (!transactionsList) return next(new AppError("Not Found", 404));
    res.json({
        message: "TransactionDetails",
        error: false,
        data: generateResponseListAdmin(transactionsList),
    });
}); 
 
exports.getLatestLoanData = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    var applyloan = await db.models.appApplyLoan.findOne({
        attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'customer_care','s1','s2','s3','m1','m2','collection_manager', 'status', 'created_at', 'updated_at'],
        order: [["id", "DESC"]],
        where: {
            user_id: user_id
        }
      })  
      if (!applyloan) return next(new AppError('Not Found', 404))
      res.json({ message: 'Resent Loan Details found', error: false, data: applyloan });
})

exports.submitRemark = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    var user_type = decoded.user_type; 
    var c_Date = moment().format("YYYY-MM-DD HH:mm:ss");
    var remarkObj = {
        remark : req.body.remark,
        remark_submitted_date:c_Date
    }
    const remark = await db.models.loanRemark.findOne({ 
        attributes: [
            'id','loan_id','user_id','remarks'
        ], 
        where: {
            loan_id:req.body.loan_id,  
            user_id: user_id,
        }
      });

      if(remark){
        const remarklength =  Object.keys(remark.remarks).length
        const updated = await db.models.loanRemark.update({
            remarks: {...remark.remarks,[remarklength]:remarkObj}
          }, {
          where: {
            loan_id:req.body.loan_id,  
            user_id: user_id,
          }
          })
          if (!updated){ 
            return next(new AppError('Not Found', 404))
          }else{
            res.json({ message: 'Remark Updated .', error: false, data: updated});
          }
      }else{
        const create = await db.models.loanRemark.create(
            {
            loan_id:req.body.loan_id,  
            user_id: user_id,
            user_type: user_type,
            remarks:{0:remarkObj},
            }
          );
          if (!create) return next(new AppError("Not Found", 404));
          res.json({ message: 'Remark Submitted', error: false, data: create });
      }
})

exports.getReviewerLoanRemarks = catchAsync(async (req, res, next) => {
    
    const applyLoan = await db.models.loanRemark.findAll({
        include: [
            {
                model: db.models.user,
                as: 'user', 
                attributes: ['firstname', 'lastname'],
            }
        ],
        attributes:['id','loan_id','user_id','remarks'],
        order: [["id", "DESC"]],
        where: {
            loan_id:req.params.loan_id,
            user_type: 2
        },
    });

    if (JSON.stringify(applyLoan) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
    });
});

exports.getCollectionLoanRemarks = catchAsync(async (req, res, next) => {
    
    const applyLoan = await db.models.loanRemark.findAll({
        include: [
            {
                model: db.models.user,
                as: 'user', 
                attributes: ['firstname', 'lastname'],
            }
        ],
        attributes:['id','loan_id','user_id','remarks'],
        order: [["id", "DESC"]],
        where: {
            loan_id:req.params.loan_id,
            user_type: 3
        },
    });

    if (JSON.stringify(applyLoan) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoan,
    });
});

exports.getAllLoanOfCustomerDetails = catchAsync(async (req, res, next) => { 
    const {offset, limit} = req.params; 
    const loanDetails = await db.models.appApplyLoan.findAll({
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
            },
            {
                model: db.models.user,
                as: 'appUserReviewer_1', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.user,
                as: 'appUserReviewer_2', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.loanStatus, 
                attributes: ['status_id', 'status'],
            } 
        ],
        attributes: ["id", "user_id", "loan_id", "required_amount", "apply_date", "disbursed_date", "days", "status", 'reviewer_1', 'reviewer_2', "created_at", "updated_at" ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [
            ['id', 'DESC'],
        ], 
        where: {
            deleted_at :null
        }, 
    }); 
    const countLoan = await db.models.appApplyLoan.count({
        where: { 
            deleted_at:null
        }
    }) 
    if (JSON.stringify(loanDetails) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
        const applyLoans = [];  
        for (const element of loanDetails) { 
            const countTodayFreshLoan = await db.models.appApplyLoan.count({ 
                attributes: ['user_id',[db.fn('COUNT', db.col('user_id')), 'total']] ,
                group : ['user_id'],
                where: {
                  user_id: element.user_id,
                  status: 4
                }
            })   
            var users = await db.query(`SELECT * FROM (SELECT * FROM vizzve_apply_loan WHERE user_id =:user_id ORDER BY Id DESC LIMIT 2) tbl1 ORDER BY Id LIMIT 1`,{
                type:QueryTypes.SELECT,
                replacements:{user_id:element.user_id}
            }); 
            let reapply;
            if(_.isEmpty(countTodayFreshLoan) == false && users[0].status == 4){ 
                reapply = "RE"
            }else{
                reapply = "" 
            } 
            applyLoans.push({
                id:element.id,
                user_id:element.user_id,
                loan_id:element.loan_id,
                required_amount:element.required_amount,
                apply_date:element.apply_date,
                disbursed_date:element.disbursed_date,
                days:element.days,
                status:element.loanStatus.status,
                reviewer_1:element.reviewer_1,
                reviewer_2:element.reviewer_2,
                firstReviewerName:element.appUserReviewer_1.firstname+' '+element.appUserReviewer_1.lastname,
                secondReviewerName:element.appUserReviewer_2 != null ? element.appUserReviewer_2.firstname+' '+element.appUserReviewer_2.lastname:'null',
                customerName:element.appUser.username,
                customerMobileNumber:element.appUser.mobile_no,
                customerEmail:element.appUser.email,
                customerUserType:element.appUser.user_type, 
                customerReapply:reapply,
                customerOverdue:users[0].s1 != 0 ? "OD":"",
                customerExtend: users[0].status == 8 ? "EXT":""
            })   
        };    
    res.json({
        message: "Apply Loan found",
        error: false,
        data: applyLoans,
        total: countLoan
    });
});

exports.getOverAllApplyLoan = catchAsync(async (req, res, next) => { 
    const {offset, limit} = req.params; 
    const loanDetails = await db.models.appApplyLoan.findAll({
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
            },
            {
                model: db.models.user,
                as: 'appUserReviewer_1', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.user,
                as: 'appUserReviewer_2', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.loanStatus, 
                attributes: ['status_id', 'status'],
            } 
        ],
        attributes: ["id", "loan_id", "required_amount", "apply_date", "days", "status", 'reviewer_1', 'reviewer_2', "created_at", "updated_at" ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [
            ['id', 'DESC'],
        ], 
        where: {
            deleted_at :null
        }, 
    }); 
    const countLoan = await db.models.appApplyLoan.count({
        where: { 
            deleted_at:null
        }
    }) 
    if (JSON.stringify(loanDetails) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: loanDetails,
        total: countLoan
    });
});
 
exports.getApprovalReportApplyLoan = catchAsync(async (req, res, next) => { 
    const {offset, limit} = req.params; 
    const loanDetails = await db.models.appApplyLoan.findAll({
        include: [
            {
                model: db.models.appUser,
                as: "appUser",
                attributes: [`user_id`, `username`, `mobile_no`, `email`, `beneficiary_id`, `user_type`],
            },
            {
                model: db.models.user,
                as: 'appUserReviewer_1', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.user,
                as: 'appUserReviewer_2', 
                attributes: ['firstname', 'lastname'],
            }, 
            {
                model: db.models.loanStatus, 
                attributes: ['status_id', 'status'],
            } 
        ],
        attributes: ["id", "loan_id", "required_amount", "apply_date", "days", "status", 'reviewer_1', 'reviewer_2', "created_at", "updated_at" ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [
            ['id', 'DESC'],
        ], 
        where: {
            deleted_at :null,
            status: ["1", "2", "3", "5"],
        }, 
    }); 
    const countLoan = await db.models.appApplyLoan.count({
        where: { 
            deleted_at:null,
            status: ["1", "2", "3", "5"],
        }
    }) 
    if (JSON.stringify(loanDetails) == "[]" ? 1 : 0)
        return next(new AppError("Not Found", 404));
    res.json({
        message: "Apply Loan found",
        error: false,
        data: loanDetails,
        total: countLoan
    });
});

// Get Employee Transactions List

exports.getEmployeeTransactions = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id;
    const transactionsList = await db.models.appApplyLoan.findOne({
      include: [
        {
          model: db.models.appUser,
          as: 'appUser',
          attributes: ['username', 'email', 'mobile_no']
        },
        {
          model: db.models.appPayment,
          attributes: ['loan_id', 'payment_detail', 'tx_date', 'created_at']
        }
      ],
      attributes: [
        'total_payable_amount',
        'remaining_amount',
        'loan_id',
        'apply_date',
        'disbursed_date',
        'payable_date',
        'days'
      ],
      where: {
        loan_id: req.body.loanId
      }
    }); 
    if (!transactionsList) return next(new AppError("Not Found", 404));
    res.json({
        message: "TransactionDetails",
        error: false,
        data: generateEmployeeResponseList(transactionsList),
    });
  }); 

const generateEmployeeResponseList = (transactionsList) =>{
    const {
        total_payable_amount,
        remaining_amount,
        disbursed_date,
        days,
        appPayments,
        payable_date
    } = transactionsList["dataValues"]; 

    var emiDays = Math.ceil(days / 7);
    const currentDate = moment().startOf('day').unix();
    const daysInUnix = [];
    const transactions = {};
    const amountPerTransaction = Number((total_payable_amount / emiDays).toFixed(2));

    const calculateEmpPenality = (trans, date) => {
      let sum = 0;
      Object.keys(trans).map(each=>{
        if (!checkPaymentDoneSameDay(date) && trans[each]['id']<=date && !moment().isSame(moment(date*1000), 'day')) {
           sum+=trans[each]['amount'];
           sum+=trans[each]['penality'];
        }
      });
      return Number((sum*.003).toFixed(2));
    };

    const getOutStanding = (trans, field) => {
      let sum = 0;
      Object.keys(trans).map(each=>{
        if(currentDate >= trans[each].id && !trans[each].paid){
           sum+=trans[each][field]
        }
      });
      return Number(sum.toFixed(2));
    };

    const checkPaymentDone = (d) => {
      let  done = [];

      appPayments.forEach((item) => { 
        let paymentDay = Date.parse(item.tx_date);

        if (moment(paymentDay).isSame(moment(d*1000), "day")) {
           done.push(true);
        } else {
           done.push(false)
        }

      });

      return done.indexOf(true)>-1? true:false;
    };

     const checkPaymentDoneSameDay = (d) => {
      let  done = [];

      appPayments.forEach((item) => { 
        let created_at = Date.parse(item.created_at);

        if (moment(created_at).isSame(moment(d*1000), "day")) {
           done.push(true);
        } else {
           done.push(false)
        }

      });

      return done.indexOf(true)>-1? true:false;
    };
    
    if(disbursed_date) {

        for (let i = 1; i <= emiDays; i++) {
           const addDays = i * 7;
           const date = moment(disbursed_date, "YYYY-MM-DD HH:mm:ss")
                    .add(addDays, "day")
                    .startOf("day")
                    .unix();
            const prev = daysInUnix[daysInUnix.length-1];
            if((prev > currentDate < date) || (!prev && currentDate < date)){
                daysInUnix.push(currentDate);
            }
            daysInUnix.push(date);
        }
        

        daysInUnix.sort((a,b) => a>b?1:-1).map((each,i)=> {
           const d = moment(each*1000).format('YYYY-MM-DD');
           if (moment().startOf('day').unix() >= each) {
               transactions[d] = {
                 id: each,
                 forDay: i+1,
                 forDate: d,
                 penality :0,
                 amount: amountPerTransaction,
                 paidOnSameDay: checkPaymentDoneSameDay(each),
                 paid: checkPaymentDone(each)
               }
           }
        });

        Object.keys(transactions).map(c=> {
            transactions[c]['penality'] = calculateEmpPenality(transactions, transactions[c]['id']);
        });

        transactions[moment(currentDate*1000).format('YYYY-MM-DD')]['total_amount'] = getOutStanding(transactions,'amount')
        transactions[moment(currentDate*1000).format('YYYY-MM-DD')]['total_penality'] =  getOutStanding(transactions,'penality')
    }
    return transactions;
}
