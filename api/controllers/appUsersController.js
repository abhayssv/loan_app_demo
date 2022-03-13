'use strict';
var db = require('../config/sequelize').db;
var Sequelize = require("sequelize");
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')
var generalConfig = require('../config/generalConfig');
var passport = require("../config/passport.js")();
const jwt_decode = require('jwt-decode');
var fs = require("fs");
const path = require('path');
// var handlebars = require("handlebars");
const { Op } = require("sequelize");
const sgMail = require('@sendgrid/mail')
var moment = require('moment');
const url = require('url'); 
const nodemailer = require('nodemailer');
const gsuitKey = require(`./../${process.env.GSUITE_EMAIL_KEY}.json`);
const FCM = require('fcm-node');
var db = require('../config/sequelize').db;
const {QueryTypes} = require('sequelize');

// User Controller .............................................................................

exports.getAllUsers = catchAsync(async (req, res, next) => { 
  const users = await db.models.appUser.findAll({
    include: [{
      model: db.models.appCredit,
      as: 'appCredit',
      attributes: ['user_id', 'level','credit'] 
    }],
    attributes: ['user_id','username', 'email','mobile_no','status', 'user_type', 'level', 'ref_code', 'use_ref_code'],
    where: {
      deleted_at: null
    }
  })
  if (JSON.stringify(users) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Users found', error: false, data: users });
});

exports.getAllUsersCount = catchAsync(async (req, res, next) => { 
  const usersCount = await db.models.appUser.count({
    include: [{
      model: db.models.appCredit,
      as: 'appCredit',
      attributes: ['user_id', 'level','credit'] 
    }],
    attributes: ['user_id','username', 'email','mobile_no','status', 'user_type', 'level', 'ref_code', 'use_ref_code'],
    where: {
      deleted_at: null
    }
  })
  res.json({ message: 'Users found', error: false, data: usersCount });
});

exports.getAllCustomers = catchAsync(async (req, res, next) => { 
  const {offset, limit} = req.params; 
  const users = await db.models.appUser.findAll({
    include: [{
      model: db.models.appCredit,
      as: 'appCredit',
      attributes: ['user_id', 'level','credit'] 
    }],
    attributes: ['user_id','username', 'email','mobile_no','status', 'user_type', 'level', 'ref_code', 'use_ref_code'],
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [
        ['user_id', 'DESC'],
    ],
    where: {
      deleted_at: null
    }
  })
  const countCustomer = await db.models.appUser.count({
    where: { 
        deleted_at:null
    }
  }) 
  if (JSON.stringify(users) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Users found', error: false, data: users, total: countCustomer });  
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await db.models.appUser.findAll({
    attributes: ['user_id', 'email','mobile_no','status', 'user_type', 'level', 'ref_code', 'use_ref_code'],
    where: {
      deleted_at: null,
      status: 1
    }
  })
  if (JSON.stringify(users) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Users found', error: false, data: users });
});

exports.getUser = catchAsync(async (req, res, next) => { 
  const users = await db.models.appUser.findOne({
    attributes: ['user_id', 'username', 'email', 'mobile_no', 'beneficiary_id', 'status', 'user_type', 'level', 'ref_code', 'use_ref_code'],
    where: {
      deleted_at: null,
      user_id: req.params.user_id
    }
  })
  if (!users) return next(new AppError('Not Found', 404))
  res.json({ message: 'Users found', error: false, data: users });
});
 
exports.changeLevel = catchAsync(async (req, res, next) => { 
  var {user_id, level, key} = req.body;
  if (key == 'level') {
    const update = await db.models.appUser.update({
      level 
    }, {
      where: {
        deleted_at: null,
        user_id
      }
    })
    if (!update) return next(new AppError('Error in updating user', 404))
    res.json({ message: 'Level updated successfully', error: false, data: update }); 
  }
});

exports.changeUserType = catchAsync(async (req, res, next) => { 
  var {user_id, user_type, key} = req.body;
  var c_Date = moment().format("YYYY-MM-DD HH:mm:ss"); 
  const users = await db.models.appUser.findOne({
    attributes: ['user_id', 'user_type'],
    where: {
      deleted_at: null,
      user_id: user_id
    }
  })
  if (key == 'user_type') {
    const updateType = await db.models.appUser.update({
      user_type 
    }, {
      where: {
        deleted_at: null,
        user_id
      }
    })
    if(updateType){
      if(users.user_type == '0'){
        var update = await db.models.appCollegeDetails.update({
          deleted_at:c_Date 
        }, {
          where: {
            deleted_at: null,
            user_id
          }
        })
      }else if(users.user_type == '1'){
        var update = await db.models.appEmpInfo.update({
          deleted_at:c_Date
        }, {
          where: {
            deleted_at: null,
            user_id
          }
        })
      }else {
        var update = await db.models.appBusinessDetails.update({
          deleted_at:c_Date
        }, {
          where: {
            deleted_at: null,
            user_id
          }
        })
      }
    }
    if (!update) return next(new AppError('Error in updating user', 404))
    res.json({ message: 'User type updated successfully', error: false, data: update }); 
  }
});
exports.changeStatus = catchAsync(async (req, res, next) => {
  if (req.body.key == 'status') {
    const update = await db.models.appUser.update({
      status: (req.body.status == true) ? '1' : '0'
    }, {
      where: {
        deleted_at: null,
        user_id: req.body.user_id
      }
    })
    if (!update) return next(new AppError('Error in updating user', 404))
    res.json({ message: 'Status updated successfully', error: false, data: update });
  } else if (req.body.key == 'is_admin') {
    const update = await db.models.appUser.update({
      is_admin: (req.body.status == true) ? '1' : '0'
    }, {
      where: {
        deleted_at: null,
        user_id: req.body.user_id
      }
    })
    if (!update) return next(new AppError('Error in updating user', 404))
    res.json({ message: 'Status updated successfully', error: false, data: update });
  } else {
    res.json({ message: 'Invalid argument provided.', error: true, data: null });
  }
});

exports.saveUser = catchAsync(async (req, res, next) => {
    const user = await db.models.appUser.findOne({
      attributes: ['user_id', 'username', 'email','mobile_no','status', 'user_type', 'level', 'ref_code', 'use_ref_code'],
      where: {
        deleted_at: null,
        email: req.body.email
      }
    }) 
    if (user) { 
      var update = await db.models.appUser.update({
        username: req.body.username,
        mobile_no: req.body.mobile_no,
        imei: req.body.imei,
        state: req.body.state,
        city: req.body.city,
        is_restrict: req.body.is_restrict,
        status: req.body.status,
        user_type: req.body.user_type,
        use_ref_code: req.body.use_ref_code, 
      }, {
        where: {
          email: req.body.email
        }
      })
      if (!update) return next(new AppError('Not Found', 404)); else {
        res.json({ message: 'User update sucessfully', error: false, data: update });
      if(!req.body.use_ref_code == "" || !req.body.use_ref_code == null){
        var addCoins = await db.models.manageCoins.create({
          user_id: user.user_id,
          v_coins: "100"
        }) 
        if (!addCoins) return next(new AppError('Not Found', 404))
        res.json({ message: 'User update and Add coin sucessfully', error: false, data: addCoins });
      }
    }
    } else {
      const users = await db.models.appUser.findOne({
        attributes: ['user_id', 'username', 'email','mobile_no','status', 'user_type', 'level', 'ref_code', 'use_ref_code'],
        order: [['user_id', 'DESC']],
      }) 
      if(users){ 
        var referral_code = 100000 + users.user_id + 1;
        var referral_code = "VIZ"+ referral_code;
      } else{ 
        var referral_code = "VIZ"+ 100001; 
      }
      const create = await db.models.appUser.create({
        username: req.body.username,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        ref_code: referral_code
      }) 
      if (!create) return next(new AppError('Not Found', 404))
      res.json({ message: 'Users create sucessfully', error: false, data: create });
    }
});
 
exports.deleteUser = catchAsync(async (req, res, next) => {
  const current_date = new Date(); 
  const user = await db.models.appUser.update({
    deleted_at : current_date,
    }, {where: {
      user_id: req.body.user_id
    },
    force: false
  })
  if (!user) return next(new AppError('Not Found', 404))
  res.json({ message: 'Users delete sucessfully', error: false, data: user });
});

exports.signInUser = catchAsync(async (req, res, next) => {
  if (req.body.email && req.body.mobile_no) {
    var email = req.body.email;
    var mobile_no = req.body.mobile_no;
    passport.validateAppEmail(email, mobile_no, function(res1) { 
        if (res1) {
            if (res1.error == false) {
                generalConfig.generateAppJwtToken(res1.data.user_id, res1.data.user_type, function(res2) { 
                    res.json({
                        newToken: res2.newToken,
                        message: res1.message,
                        error: false
                    }); 
                });
            } else {
                res.json({
                    message: res1.message,
                    error: true
                });
            }
        } else {
            res.json({
                message: 'Some issue occurred.',
                error: true
            });
        }
    });
} else {
    res.json({
        message: "User credentials are invalid",
        error: true
    });
}
})
exports.getEmailStatus = catchAsync(async (req, res, next) => {
  const users = await db.models.appUser.findOne({
    attributes: ['user_id','username', 'email','mobile_no','status'],
    where: {
      deleted_at: null,
      [Op.or]: [
        { email: req.body.email },
        { imei: req.body.imei }
      ]
    }
  })
  if (!users) return next(new AppError('Not Found', 404))
  res.json({ message: 'User contact found', error: false, data: users });
});

exports.getContactStatus = catchAsync(async (req, res, next) => {
  const users = await db.models.appUser.findOne({
    attributes: ['user_id', 'username', 'email','mobile_no', 'is_restrict', 'status', 'user_type', 'level', 'ref_code', 'use_ref_code'],
    where: {
      deleted_at: null, 
      mobile_no: req.body.mobile_no,
    }
  })
  if (!users) return next(new AppError('Not Found', 404))
  res.json({ message: 'User contact found', error: false, data: users });
});

// validate Ref. Code...

exports.validRefCode = catchAsync(async (req, res, next) => {    
  const ref_code = await db.models.appUser.findOne({
    attributes: ['user_id', 'email', 'mobile_no', 'status', 'user_type', 'level', 'ref_code', 'use_ref_code' ],
    where: {
      deleted_at: null,
      ref_code: req.body.ref_code,
      email: {[Op.ne]: req.body.email}
    }
  }) 
  if (!ref_code) return next(new AppError('Not Found', 404))
  res.json({ message: 'Referral Code Found', error: false, data: ref_code });
});

exports.customerSupport = catchAsync(async (req, res, next) => { 
  const {user_name, user_email, mobile_no, description, subject } = req.body;  

  const email = await db.models.emailSettings.findOne({
    attributes: ['email_type'],
    where: {
      active: 1,
    }
  });

  const sendMessageFromSendGrid = () =>{

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    var mailOptions = {
                from: process.env.SENDGRID_EMAIL,
                to: user_email,
                subject: `${subject}`,
                text: `${description}`,
    };

    sgMail
        .send(mailOptions)
        .then((response) => {
          res.json({ message: 'Approval mail send sucessfully', error: false, data: response });
        })
        .catch((error) => {
          console.log(error)
          next(new AppError('Fail to send Mail', 404))
        })
  }

  const sendMessageFromGsuit = () => {
    
    const transporterObj = {
      host: process.env.GSUITE_EMAIL_HOST,
      port: process.env.GSUITE_EMAIL_PORT,
      secure: true,
      auth: {
          type: 'OAuth2',
          user: process.env.GSUITE_EMAIL_USERNAME,
          serviceClient: gsuitKey.client_id,
          privateKey: gsuitKey.private_key
      }
    }

    const transporter = nodemailer.createTransport(transporterObj);

    const mailOptions = {
      from: process.env.GSUITE_EMAIL_USERNAME,
      to: user_email,
      subject: `${subject}`,
      text: `${description}`
    } 

    transporter.sendMail(mailOptions, function(err, response) {
      if (err) {
        console.log(err)
        next(new AppError('Fail to send Mail', 404));
      } else {
         res.json({ message: 'Approval mail send sucessfully', error: false, data: response });
      }
    });

  }

  switch(email.email_type) {
    case 'SENDGRID_EMAIL':
      sendMessageFromSendGrid();
    break;
    case 'GSUITE_EMAIL':
      sendMessageFromGsuit();
    break;
    default:
      sendMessageFromGsuit();
    break;
  }

})

// Search Customer by Date, email and mobile number...

exports.getSearchCustomers = catchAsync(async (req, res, next) => { 
  var query = url.parse(req.url, true).query;

  var { from_date, to_date, name, email, mobile_no, user_type, id_number, offset, limit } = query;  
  let whereClause = { deleted_at: null};  
  let whereClause2 = {};
  
  if(from_date != "") {
    whereClause['updated_at'] = {
      [Op.gte]: new Date(from_date + " 00:00:00"),
    }
  }

  if(to_date != "") {
    whereClause['updated_at'] = {
       [Op.lte]: new Date(to_date + " 23:59:59")   
   }
  }

  if(from_date != "" && to_date != "") {
    whereClause['updated_at'] = {
       [Op.gte]: new Date(from_date + " 00:00:00"),
       [Op.lte]: new Date(to_date + " 23:59:59")   
   }
  }

  if(email != "") {
    whereClause['email'] = email;
  }

  if(mobile_no != "") {
    whereClause['mobile_no'] = mobile_no;
  }

  if(name != "") {
    whereClause['username'] = { [Op.substring] : name };
  }

  if(user_type != "") {
    whereClause['user_type'] = user_type;
  }

  if(id_number != ""){
     whereClause2['adhaar_no'] = id_number;
  }

  let queryObj = {
    include: [{
      model: db.models.appCredit, 
      attributes: ['user_id', 'level','credit'] 
    },
    {
      model: db.models.appKycDetails, 
      attributes: ['adhaar_no', 'reg_mob_no','pan_no'],
    }],
    attributes: ['user_id','username', 'email','mobile_no','status', 'user_type', 'level', 'ref_code', 'use_ref_code'],
    limit: Number(limit),
    offset: Number(offset),
    where: whereClause
  }
  let queryObj1 = {
    include: [{
      model: db.models.appCredit, 
      attributes: ['user_id', 'level','credit'] 
    },
    {
      model: db.models.appKycDetails, 
      attributes: ['adhaar_no', 'reg_mob_no','pan_no'],
      where: whereClause2
    }],
    attributes: ['user_id','username', 'email','mobile_no','status', 'user_type', 'level', 'ref_code', 'use_ref_code'],
    limit: Number(limit),
    offset: Number(offset),
    where: whereClause
  }
  const count = await db.models.appUser.count(queryObj)
  queryObj['limit'] = Number(limit);
  queryObj['offset'] = Number(offset);
//   if(id_number == null){
//   const users = await db.models.appUser.findAll(queryObj)
//   res.json({ message: 'Users found', error: false, data: users, total: count });    
//   } else {
   const kycDetail = await db.models.appKycDetails.findOne({
       attributes: ['adhaar_no', 'reg_mob_no','pan_no'],
       where: {
       adhaar_no: id_number,
    }
  });
  if(!kycDetail){
      const users = await db.models.appUser.findAll(queryObj)
      res.json({ message: 'Users found', error: false, data: users, total: count });
  }else{
      const users = await db.models.appUser.findAll(queryObj1)
      res.json({ message: 'Users found', error: false, data: users, total: count });
  }
//   }
});

exports.getLoanCount = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;
  var user_type = decoded.user_type;
  var has_role = decoded.has_role;
  var days = -1;
  var c_Date = moment().format("YYYY-MM-DD");  
  var yesterday = moment().add(days, "d").format("YYYY-MM-DD"); 

  let team;
  let countTotalLoanWhere;
  let countTodayLoanFirstReviewWhere;
  let countPendingLoanWhere;
  let countTodayPendingFirstReviewLoanWhere;
  let countDisbursedLoanWhere;
  let countRejectLoanWhere;
  let countTodayRejectFirstReviewLoanWhere;
  let countBannedLoanWhere;
  let countPaidLoanWhere;
  let countTodayApproveFirstReviewLoanWhere;
  let countApproveLoanWhere;
  let countTotalTodayRejectLoanWhere;
  let countTodayRejectLoanWhere;
  let countTodayApplyDisbursedLoanWhere;
  let countTodayApplyLoanWhere;
  let countTodayExtendsLoanWhere;
  let countTodayFreshLoanWhere;
  let getTotalSumOfMoneyDisbursedWhere;
  let countTodayDisbursedLoanWhere;
  let getTodaySumOfMoneyDisbursedWhere;
  let countOverallOverDueLoanWhere;
  let countTodayCustomerCareLoanLoanWhere;
  let countYesterdayCustomerCareLoanLoanWhere;
  let countTodayPaidCustomerCareLoanWhere;
  let countYesterdayPaidCustomerCareLoanWhere;
  let countTodayOverduePaidCustomerLoanWhere;
  let countTodayPrePaidCustomerLoanWhere;
  let countOverallPaidCustomerCareLoanWhere;
//   let todayFreshCustomer = [];
//   let todayReapplyCustomer = [];
  let todayFreshCustomer = 0;
  let todayReapplyCustomer = 0;
  let countOverallCXWhere;
  let countOverallS1Where;
  let countOverallS2Where;
  let countOverallS3Where;
  let countOverallM1Where;
  let countOverallM2Where;
  let totalBusinessCxLoan = 0;
  let totalCxLoan = 0;
  let totalTodayBusinessCxLoan = 0;
  let totalTodayCxLoan = 0;
  let totalTodayPaidBusinessCxLoan = 0;
  let totalTodayPaidCxLoan = 0;
  let countTodayPendingSecondReviewLoanWhere;
  let countTodaySecondReviewDisbursedLoanWhere;

  switch (true) {
    case user_type == 2 && has_role == 4:
      team = "First Reviewer";
      countTotalLoanWhere = {
        deleted_at: null,
        disbursed_amount:  {[Op.ne]: 0},
        reviewer_1: user_id
      }
      countTodayLoanFirstReviewWhere = {
        deleted_at: null,
        reviewer_1: user_id,
        apply_date: { [Op.like]: `${c_Date}%` }
      }
      countPendingLoanWhere = {
        deleted_at: null,
        status: 0, 
        reviewer_1: user_id
      }
      countTodayPendingFirstReviewLoanWhere = {
        deleted_at: null,
        status: 0, 
        reviewer_1: user_id,
        apply_date: { [Op.like]: `${c_Date}%` }
      }
      countDisbursedLoanWhere = {
        deleted_at: null,
        status: 3,
        reviewer_1: user_id    
      }
      countRejectLoanWhere = {
        deleted_at: null,
        status: 2,    
        reviewer_1: user_id
      }
      countTodayRejectFirstReviewLoanWhere = {
        deleted_at: null,
        status: 2,    
        reviewer_1: user_id,
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        }
      }
      countBannedLoanWhere = {
        deleted_at: null,
        status: 7, 
        reviewer_1: user_id   
      }
      countPaidLoanWhere = {
        deleted_at: null,
        status: 4,   
        reviewer_1: user_id 
      }
      countApproveLoanWhere = {
        deleted_at: null,
        status: [1,3,4,5,6],
        disbursed_amount:  {[Op.ne]: 0},
        reviewer_1: user_id   
      }
      countTodayApproveFirstReviewLoanWhere = {
        deleted_at: null,
        status: [1,3,4,5,6],
        disbursed_amount:  {[Op.ne]: 0},
        reviewer_1: user_id,
        customer_care: 0,
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        },
      }
      break;
    case user_type == 2 && has_role == 5:
      team = "Second Reviewer";
      countTotalLoanWhere = {
        deleted_at: null,
        reviewer_2: user_id
      }
      countPendingLoanWhere = {
        deleted_at: null,
        status: 1, 
        reviewer_2: user_id
      }
      countTodayPendingSecondReviewLoanWhere = {
        deleted_at: null,
        status:1,
        updated_at: { [Op.gte]: c_Date + " 00:00:00",
          [Op.lte]: c_Date + " 23:59:59"
        },
        reviewer_2: user_id
      }
      countTodaySecondReviewDisbursedLoanWhere = {
        deleted_at: null,
        status: [3],  
        disbursed_date: { [Op.like]: `${c_Date}%` },
        customer_care: 0,
        transfer_id: { [Op.ne]: null },
        reviewer_2: user_id
      } 
      countDisbursedLoanWhere = {
        deleted_at: null,
        status: 3,
        reviewer_2: user_id    
      }
      countRejectLoanWhere = {
        deleted_at: null,
        status: 5,    
        reviewer_2: user_id
      }
      countBannedLoanWhere = {
        deleted_at: null,
        status: 7, 
        reviewer_2: user_id   
      }
      countPaidLoanWhere = {
        deleted_at: null,
        status: 4,   
        reviewer_2: user_id 
      }
      countApproveLoanWhere = {
        deleted_at: null,
        status: 1, 
        reviewer_2: user_id   
      }
      break;
    case user_type == 3 && has_role == 6:
      team = "Collection Manager";
      // countTotalLoanWhere = {
      //   deleted_at: null, 
      //   collection_manager: user_id
      // }
      countPendingLoanWhere = {
        deleted_at: null,
        status: 3, 
        collection_manager: user_id
      }
      countOverallPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4,  
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        },
        collection_manager: user_id,
      } 
      break;
    case user_type == 3 && has_role == 7:
      team = "Customer Support"; 
      // countTotalLoanWhere = {
      //   deleted_at: null,
      //   customer_care: user_id,
      // }
      countTodayCustomerCareLoanLoanWhere = {
        deleted_at: null,
        status:3, 
        s1: 0,
        updated_at: { [Op.gte]: c_Date + " 00:00:00",
          [Op.lte]: c_Date + " 23:59:59"
        },
        customer_care: user_id,
      }
      countTodayPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4,
        s1:0,
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        },
        customer_care: user_id,
      }
      countOverallPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4, 
        s1 : 0,
        customer_care: user_id,
      }
      countPendingLoanWhere = {
        deleted_at: null,
        status: 3, 
        customer_care: user_id,
        s1:0
      } 
      break;
    case user_type == 3 && has_role == 8: 
      team = "S1";
      // countTotalLoanWhere = {
      //   deleted_at: null,
      //   s1: user_id
      // }
      countTodayCustomerCareLoanLoanWhere = {
        deleted_at: null,
        status:3, 
        s2: 0,
        updated_at: { [Op.gte]: c_Date + " 00:00:00",
          [Op.lte]: c_Date + " 23:59:59"
        },
        s1: user_id,
      }
      countTodayPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4,
        s2: 0,
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        },
        s1: user_id,
      }
      countPendingLoanWhere = {
        deleted_at: null,
        status: 3, 
        s1: user_id,
        s2:0
      }
      countOverallPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4, 
        s2 : 0,
        s1: user_id,
      }
       
      break;
    case user_type == 3 && has_role == 9:
      team = "S2";
      // countTotalLoanWhere = {
      //   deleted_at: null,
      //   s2: user_id
      // }
      countTodayCustomerCareLoanLoanWhere = {
        deleted_at: null,
        status:3, 
        s3: 0,
        updated_at: { [Op.gte]: c_Date + " 00:00:00",
          [Op.lte]: c_Date + " 23:59:59"
        },
        s2: user_id,
      }
      countTodayPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4,
        s3: 0,
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        },
        s2: user_id,
      }
      countPendingLoanWhere = {
        deleted_at: null,
        status: 3, 
        s2: user_id,
        s3:0
      }
      countOverallPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4, 
        s3 : 0,
        s2: user_id,
      }
       
      break     
    case user_type == 3 && has_role == 10:
      team = "S3";
      // countTotalLoanWhere = {
      //   deleted_at: null,
      //   s3: user_id
      // }
      countTodayCustomerCareLoanLoanWhere = {
        deleted_at: null,
        status:3, 
        m1: 0,
        updated_at: { [Op.gte]: c_Date + " 00:00:00",
          [Op.lte]: c_Date + " 23:59:59"
        },
        s3: user_id,
      }
      countTodayPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4,
        m1: 0,
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        },
        s3: user_id,
      }
      countPendingLoanWhere = {
        deleted_at: null,
        status: 3, 
        m1: 0,
        s3: user_id
      }
      countOverallPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4, 
        m1 : 0,
        s3: user_id,
      }
       
      break       
    case user_type == 3 && has_role == 11:
      team = "M1";
      // countTotalLoanWhere = {
      //   deleted_at: null,
      //   m1: user_id
      // }
      countTodayCustomerCareLoanLoanWhere = {
        deleted_at: null,
        status:3, 
        m2: 0,
        updated_at: { [Op.gte]: c_Date + " 00:00:00",
          [Op.lte]: c_Date + " 23:59:59"
        },
        m1: user_id,
      }
      countTodayPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4,
        m2: 0,
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        },
        m1: user_id,
      }
      countPendingLoanWhere = {
        deleted_at: null,
        status: 3, 
        m1: user_id,
        m2: 0,
      }
      countOverallPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4, 
        m2 : 0,
        m1: user_id,
      }
       
      break;  
    case user_type == 3 && has_role == 12:
      team = "M2";
      // countTotalLoanWhere = {
      //   deleted_at: null,
      //   m2: user_id
      // }
      countTodayCustomerCareLoanLoanWhere = {
        deleted_at: null,
        status:3,
        updated_at: { [Op.gte]: c_Date + " 00:00:00",
          [Op.lte]: c_Date + " 23:59:59"
        },
        m2: user_id,
      }
      countTodayPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4,
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        },
        m2: user_id,
      }
      countPendingLoanWhere = {
        deleted_at: null,
        status: 3, 
        m2: user_id,
        collection_manager: 0,
      }
      countOverallPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4, 
        collection_manager : 0,
        m2: user_id,
      }
       
      break;       
           
    default:
      team = "Admin";
      countTotalLoanWhere = {
        deleted_at: null 
      }
      countPendingLoanWhere = {
        deleted_at: null,
        status: 0 
      }
      countDisbursedLoanWhere = {
        deleted_at: null,
        status: 3,    
      }
      countRejectLoanWhere = {
        deleted_at: null,
        status: [2,5],    
      }
      countTotalTodayRejectLoanWhere = {
        deleted_at: null,
        status: [2,5],  
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        }
      }
      countTodayRejectLoanWhere = {
        deleted_at: null,
        status: [2,5],
        apply_date: { [Op.like]: `${c_Date}%` }
      }
      countTodayApplyLoanWhere = {
        deleted_at: null,
        status: [0,1,2,3,5,6,7],  
        disbursed_amount: { [Op.ne]: 0 },
        apply_date: { [Op.like]: `${c_Date}%` }
      } 
      countTodayExtendsLoanWhere = {
        deleted_at: null,
        status: 3,  
        disbursed_amount: 0,
        apply_date: { [Op.like]: `${c_Date}%` }
      } 
      countTodayFreshLoanWhere = {
        deleted_at: null, 
        disbursed_amount: { [Op.ne]: 0 },
        apply_date: { [Op.like]: `${c_Date}%` }
      } 
      const getTodayApplyLoan = await db.models.appApplyLoan.findAll({ 
        attributes: ['user_id'], 
        where: countTodayFreshLoanWhere
      }) 
      if (getTodayApplyLoan.length) {
        let userArray = []; 
          getTodayApplyLoan.forEach((item)=> {
          userArray.push(item.user_id);
        });
        const getApplyLoan = await db.models.appApplyLoan.findAll({ 
        attributes: ['user_id'],
        where: {
            deleted_at: null, 
            disbursed_amount: { [Op.ne]: 0 },
            apply_date: {[Op.lte]: new Date(c_Date + " 00:00:00")}
          } 
        }) 
          if (getApplyLoan.length) {
            let uArray = []; 
              getApplyLoan.forEach((item)=> {
              uArray.push(item.user_id);
            });
            for(var i=0; i < userArray.length;i++){
                for(var j=0; j < uArray.length; j++){
                    if(userArray[i] === uArray[j]){
                        todayReapplyCustomer++;
                        break;
                    }
                }
            }
           todayFreshCustomer = getTodayApplyLoan.length - todayReapplyCustomer;
          }
      }
    //   for (const loans of getTodayApplyLoan){
    //     const countTodayFreshLoan = await db.models.appApplyLoan.count({ 
    //       attributes: ['user_id',[db.fn('COUNT', db.col('user_id')), 'total']] ,
    //       group : ['user_id'],
    //       where: {
    //         user_id: loans.user_id
    //       }
    //     })   
    //     if(countTodayFreshLoan[0].total > 1){ 
    //       todayReapplyCustomer.push(countTodayFreshLoan[0].user_id);
    //     } else { 
    //       todayFreshCustomer.push(countTodayFreshLoan[0].user_id);
    //     }  
    //   } 
      countBannedLoanWhere = {
        deleted_at: null,
        status: 7,    
      }
      countPaidLoanWhere = {
        deleted_at: null,
        status: 4,    
      }
      countApproveLoanWhere = {
        deleted_at: null,
        status: 1,    
      }
      getTotalSumOfMoneyDisbursedWhere = {
        deleted_at: null,
        status: [3,4,8],
        disbursed_amount: { [Op.ne]: 0 }
      }
      countTodayApplyDisbursedLoanWhere = {
        deleted_at: null,
        status: [3],  
        apply_date: { [Op.like]: `${c_Date}%` },
        customer_care: 0,
        transfer_id: { [Op.ne]: null },
      } 
      countTodayDisbursedLoanWhere = {
        deleted_at: null,
        status: [3],  
        disbursed_date: { [Op.like]: `${c_Date}%` },
        customer_care: 0,
        transfer_id: { [Op.ne]: null },
      } 
      getTodaySumOfMoneyDisbursedWhere = {
        deleted_at: null,
        status: [3],
        disbursed_date: { [Op.like]: `${c_Date}%` },
        customer_care: 0,
        transfer_id: { [Op.ne]: null },
      }
      countOverallOverDueLoanWhere = {
        deleted_at: null,
        status:3,
        s1: { [Op.ne]: 0 }, 
      }
       countTodayCustomerCareLoanLoanWhere = {
        deleted_at: null,
        status:3, 
        payable_date: { [Op.gte]: c_Date + " 00:00:00",
          [Op.lte]: c_Date + " 23:59:59"
        }
      }
      countTodayPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4,
        payable_date: { [Op.gte]: c_Date + " 00:00:00",
          [Op.lte]: c_Date + " 23:59:59"
        },
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        }
      }
      countYesterdayCustomerCareLoanLoanWhere = {
        deleted_at: null, 
        status:3,
        payable_date: { [Op.gte]: yesterday + " 00:00:00",
          [Op.lte]: yesterday + " 23:59:59"
        } 
      }
      countYesterdayPaidCustomerCareLoanWhere = {
        deleted_at: null, 
        status: 4,
        payable_date: { [Op.gte]: yesterday + " 00:00:00",
          [Op.lte]: yesterday + " 23:59:59"
        },
        updated_at: { [Op.gte]: new Date(yesterday + " 00:00:00"),
          [Op.lte]: new Date(yesterday + " 23:59:59")
        }
      }
      countTodayOverduePaidCustomerLoanWhere = {
        deleted_at: null, 
        status: 4,
        s1: { [Op.ne]: 0 }, 
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        }
      }
      countTodayPrePaidCustomerLoanWhere = {
        deleted_at: null, 
        status: 4,
        s1: { [Op.eq]: 0 }, 
        updated_at: { [Op.gte]: new Date(c_Date + " 00:00:00"),
          [Op.lte]: new Date(c_Date + " 23:59:59")
        }
      }
      countOverallCXWhere = {
        deleted_at: null, 
        status: 3,
        customer_care: { [Op.ne]: 0 }, 
        s1: { [Op.eq]: 0 }
      }
      countOverallS1Where = {
        deleted_at: null, 
        status: 3,
        s1: { [Op.ne]: 0 }, 
        s2: { [Op.eq]: 0 }
      }
      countOverallS2Where = {
        deleted_at: null, 
        status: 3,
        s2: { [Op.ne]: 0 }, 
        s3: { [Op.eq]: 0 }, 
      }
      countOverallS3Where = {
        deleted_at: null, 
        status: 3,
        s3: { [Op.ne]: 0 }, 
        m1: { [Op.eq]: 0 }, 
      }
      countOverallM1Where = {
        deleted_at: null, 
        status: 3,
        m1: { [Op.ne]: 0 }, 
        m2: { [Op.eq]: 0 }, 
      }
      countOverallM2Where = {
        deleted_at: null, 
        status: 3,
        m2: { [Op.ne]: 0 },
      }
      break;
  } 
  const countTotalLoan = await db.models.appApplyLoan.count({
    where: countTotalLoanWhere 
  }) 
  const countTodayLoanFirstReview = await db.models.appApplyLoan.count({
    where:  countTodayLoanFirstReviewWhere
  })
  const countPendingLoan = await db.models.appApplyLoan.count({
    where: countPendingLoanWhere
  }) 
  const countPendingLoanCX = await db.models.appApplyLoan.findAll({ 
    attributes: ['user_id'], 
    where: countPendingLoanWhere
  })
  if (countPendingLoanCX.length) {
    let userArray = []; 
      countPendingLoanCX.forEach((item)=> {
      userArray.push(item.user_id);
    })
    const countTotalBusinessCxLoan = await db.models.appUser.findAll({ 
      attributes: ['user_id', 'user_type'], 
      where: {
        user_id: userArray,
        user_type: 2
      }
    }) 
    if(!countTotalBusinessCxLoan.length){
      totalBusinessCxLoan = countTotalBusinessCxLoan.length;
      totalCxLoan = userArray.length - countTotalBusinessCxLoan.length;
    } else { 
      totalBusinessCxLoan = countTotalBusinessCxLoan.length;
      totalCxLoan = userArray.length - countTotalBusinessCxLoan.length;
    } 
  }
  const countTodayPendingFirstReviewLoan = await db.models.appApplyLoan.count({
    where: countTodayPendingFirstReviewLoanWhere
  })
  const countTodayPendingSecondReviewLoan = await db.models.appApplyLoan.count({
    where: countTodayPendingSecondReviewLoanWhere
  })
  const countTodaySecondReviewDisbursedLoan = await db.models.appApplyLoan.count({
    where: countTodaySecondReviewDisbursedLoanWhere
  })
  const countTodayPendingSecondReviews = await db.models.appApplyLoan.findAll({ 
    attributes: ['user_id'], 
    where: countTodayPendingSecondReviewLoanWhere
  })
  if (countTodayPendingSecondReviews.length){
    let userArray = []; 
    countTodayPendingSecondReviews.forEach((item)=> {
      userArray.push(item.user_id);
    })
    const countTodayBusinessCxLoan = await db.models.appUser.findAll({ 
      attributes: ['user_id', 'user_type'], 
      where: {
        user_id: userArray,
        user_type: 2
      }
    }) 
    if(!countTodayBusinessCxLoan.length){
      totalTodayBusinessCxLoan = countTodayBusinessCxLoan.length;
      totalTodayCxLoan = userArray.length - countTodayBusinessCxLoan.length;
    } else { 
      totalTodayBusinessCxLoan = countTodayBusinessCxLoan.length;
      totalTodayCxLoan = userArray.length - countTodayBusinessCxLoan.length;
    } 
  } 
  const countDisbursedLoan = await db.models.appApplyLoan.count({
    where: countDisbursedLoanWhere
  }) 
  const countTodayApplyDisbursedLoan = await db.models.appApplyLoan.count({
    where: countTodayApplyDisbursedLoanWhere
  })
  const countTodayDisbursedLoan = await db.models.appApplyLoan.count({
    where: countTodayDisbursedLoanWhere
  }) 
  const countTodayApplyLoan = await db.models.appApplyLoan.count({
    where: countTodayApplyLoanWhere
  }) 
  const countTodayExtendsLoan = await db.models.appApplyLoan.count({
    where: countTodayExtendsLoanWhere
  }) 
  const countTodayRejectLoan = await db.models.appApplyLoan.count({
    where: countTodayRejectLoanWhere
  })  
  const countTodayRejectFirstReviewLoan = await db.models.appApplyLoan.count({
    where: countTodayRejectFirstReviewLoanWhere
  })
  const countTotalTodayRejectLoan = await db.models.appApplyLoan.count({
    where: countTotalTodayRejectLoanWhere
  })  
  const getTotalSumOfMoneyDisbursed = await db.models.appApplyLoan.findAll({ 
    attributes: [[db.fn('sum', db.col('disbursed_amount')), 'total']], 
    where: getTotalSumOfMoneyDisbursedWhere
  }) 
  const getTodaySumOfMoneyDisbursed = await db.models.appApplyLoan.findAll({ 
    attributes: [[db.fn('sum', db.col('disbursed_amount')), 'total']], 
    where: getTodaySumOfMoneyDisbursedWhere
  }) 
  const countRejectLoan = await db.models.appApplyLoan.count({
    where: countRejectLoanWhere
  })
  const countBannedLoan = await db.models.appApplyLoan.count({
    where: countBannedLoanWhere
  }) 
  const countPaidLoan = await db.models.appApplyLoan.count({
    where: countPaidLoanWhere
  })
  const countApproveLoan = await db.models.appApplyLoan.count({
    where: countApproveLoanWhere
  }) 
  const countTodayApproveFirstReviewLoan = await db.models.appApplyLoan.count({
    where: countTodayApproveFirstReviewLoanWhere
  })
  const countOverallOverDueLoan = await db.models.appApplyLoan.count({
    where: countOverallOverDueLoanWhere
  })
  const countTodayCustomerCareLoan = await db.models.appApplyLoan.count({
    where: countTodayCustomerCareLoanLoanWhere
  })
  if(user_type != 2){
    const countTodayCustomerCareLoanCX = await db.models.appApplyLoan.findAll({ 
      attributes: ['user_id'], 
      where: countTodayCustomerCareLoanLoanWhere
    })
    if (countTodayCustomerCareLoanCX.length){
    let userArray = []; 
    countTodayCustomerCareLoanCX.forEach((item)=> {
      userArray.push(item.user_id);
    })
    const countTodayBusinessCxLoan = await db.models.appUser.findAll({ 
      attributes: ['user_id', 'user_type'], 
      where: {
        user_id: userArray,
        user_type: 2
      }
    }) 
    if(!countTodayBusinessCxLoan.length){
      totalTodayBusinessCxLoan = countTodayBusinessCxLoan.length;
      totalTodayCxLoan = userArray.length - countTodayBusinessCxLoan.length;
    } else { 
      totalTodayBusinessCxLoan = countTodayBusinessCxLoan.length;
      totalTodayCxLoan = userArray.length - countTodayBusinessCxLoan.length;
    } 
  }
 } 
  const countTodayPaidCustomerCareLoan = await db.models.appApplyLoan.count({
    where: countTodayPaidCustomerCareLoanWhere
  })  
  if(user_type != 2){
    const countTodayPaidCustomerCareLoanCX = await db.models.appApplyLoan.findAll({ 
      attributes: ['user_id'], 
      where: countTodayPaidCustomerCareLoanWhere
    })
    if (countTodayPaidCustomerCareLoanCX.length) {
        let userArray = []; 
    countTodayPaidCustomerCareLoanCX.forEach((item)=> {
      userArray.push(item.user_id);
    })
    const countTodayBusinessCxLoan = await db.models.appUser.findAll({ 
      attributes: ['user_id', 'user_type'], 
      where: {
        user_id: userArray,
        user_type: 2
      }
    }) 
    if(!countTodayBusinessCxLoan.length){
      totalTodayPaidBusinessCxLoan = countTodayBusinessCxLoan.length;
      totalTodayPaidCxLoan = userArray.length - countTodayBusinessCxLoan.length;
    } else { 
      totalTodayPaidBusinessCxLoan = countTodayBusinessCxLoan.length;
      totalTodayPaidCxLoan = userArray.length - countTodayBusinessCxLoan.length;
    } 
   }
 }
  const countYesterdayCustomerCareLoanLoan = await db.models.appApplyLoan.count({
    where: countYesterdayCustomerCareLoanLoanWhere
  }) 
  const countYesterdayPaidCustomerCareLoanLoan = await db.models.appApplyLoan.count({
    where: countYesterdayPaidCustomerCareLoanWhere
  })

  const countTodayOverduePaidCustomerLoan = await db.models.appApplyLoan.count({
    where: countTodayOverduePaidCustomerLoanWhere
  })
  const countTodayPrePaidCustomerLoan = await db.models.appApplyLoan.count({
    where: countTodayPrePaidCustomerLoanWhere
  })
  const countOverallPaidCustomerCareLoan = await db.models.appApplyLoan.count({
    where: countOverallPaidCustomerCareLoanWhere
  })
  const countOverallCX = await db.models.appApplyLoan.count({
    where: countOverallCXWhere
  })
  const countOverallS1 = await db.models.appApplyLoan.count({
    where: countOverallS1Where
  })
  const countOverallS2 = await db.models.appApplyLoan.count({
    where: countOverallS2Where
  })
  const countOverallS3 = await db.models.appApplyLoan.count({
    where: countOverallS3Where
  })
  const countOverallM1 = await db.models.appApplyLoan.count({
    where: countOverallM1Where
  })
  const countOverallM2 = await db.models.appApplyLoan.count({
    where: countOverallM2Where
  })

  if (JSON.stringify(countDisbursedLoan) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Users found', error: false, 
    data: countDisbursedLoan, 
    total:countTotalLoan,
    todayTotalFirstReviewAssignLoan:countTodayLoanFirstReview,
    totalTodayPendingSecondReviewLoan:countTodayPendingSecondReviewLoan,
    totalTodaySecondReviewDisbursedLoan:countTodaySecondReviewDisbursedLoan,
    pending:countPendingLoan, 
    totalTodayPendingFirstReviewLoan:countTodayPendingFirstReviewLoan,
    reject:countRejectLoan, 
    banned:countBannedLoan, 
    paid:countPaidLoan, 
    approved:countApproveLoan, 
    totalTodayRejection:countTotalTodayRejectLoan,
    totalTodayRejectFirstReviewLoan:countTodayRejectFirstReviewLoan,
    todayRejection:countTodayRejectLoan,
    todayAppliedLoan:countTodayApplyLoan,
    todayExtendsLoan:countTodayExtendsLoan,
    // countTodayFreshLoan:countTodayFreshLoan,
    getTotalSumOfMoneyDisbursed:getTotalSumOfMoneyDisbursed,
    countTodayApplyDisbursedLoan:countTodayApplyDisbursedLoan,
    countTodayDisbursedLoan:countTodayDisbursedLoan,
    getTodaySumOfMoneyDisbursed:getTodaySumOfMoneyDisbursed,
    countOverallOverDueLoan:countOverallOverDueLoan,
    countTodayCustomerCareLoan:countTodayCustomerCareLoan,
    countYesterdayCustomerCareLoanLoan:countYesterdayCustomerCareLoanLoan,
    countTodayPaidCustomerCareLoan:countTodayPaidCustomerCareLoan,
    countYesterdayPaidCustomerCareLoanLoan:countYesterdayPaidCustomerCareLoanLoan,
    countTodayOverduePaidCustomerLoan:countTodayOverduePaidCustomerLoan,
    countTodayPrePaidCustomerLoan:countTodayPrePaidCustomerLoan,
    countOverallPaidCustomerCareLoan: countOverallPaidCustomerCareLoan,
    todayFreshCustomer:todayFreshCustomer,
    todayReapplyCustomer:todayReapplyCustomer,
    totalTodayApproveFirstReviewLoan:countTodayApproveFirstReviewLoan,
    countOverallCX:countOverallCX,
    countOverallS1:countOverallS1,
    countOverallS2:countOverallS2,
    countOverallS3:countOverallS3,
    countOverallM1:countOverallM1,
    countOverallM2:countOverallM2,
    totalBusinessCxLoan:totalBusinessCxLoan,
    totalCxLoan:totalCxLoan,
    totalTodayBusinessCxLoan:totalTodayBusinessCxLoan,
    totalTodayCxLoan:totalTodayCxLoan,
    totalTodayPaidBusinessCxLoan:totalTodayPaidBusinessCxLoan,
    totalTodayPaidCxLoan:totalTodayPaidCxLoan
  });
});



exports.getAppUserStatus = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;
  var user_type = decoded.user_type;
  const users = await db.models.appUser.findOne({
    attributes: ['user_id','username', 'email','mobile_no','status'],
    where: {
      deleted_at: null,
      user_id : user_id,
      status: 1,
      user_type: user_type
    }
  })
  if (!users) return next(new AppError('Bloack or Not Found User', 404))
  res.json({ message: 'Active User', error: false, data: users });
});


exports.getEmailTypes = catchAsync(async (req, res, next) => {
  const emailTypes = await db.models.emailSettings.findAll({
    attributes: ['id','email_type' ,'email_name', 'active'],
  })

  if (!emailTypes) return next(new AppError('Bloack or Not Found User', 404))
  res.json({ message: 'Email Settings', error: false, data: emailTypes });
});

exports.setEmailType = catchAsync(async (req, res, next) => {
  await db.models.emailSettings.update({active: 0},{ where: {}});

  const update = await db.models.emailSettings.update({
        active: 1
    }, {
      where: {
       id : req.body.id
    },
  });

  if (!update && !update.length) return next(new AppError('Bloack or Not Found User', 404))
  res.json({ message: 'Updated Successfully', error: false, data: update });
});

exports.setAadarBtn = catchAsync(async (req, res, next) => {
  const {aadar_verification,pan_verification} = req.body;
  const update = await db.models.settings.update({
    aadar_verification: aadar_verification? 1: 0, 
    pan_verification: pan_verification? 1: 0
  },{where: {}});

  if (!update && !update.length) return next(new AppError('Bloack or Not Found User', 404))
  res.json({ message: 'Updated Successfully', error: false, data: update });
});

exports.getAllSettings = catchAsync(async (req, res, next) => {

   const settings = await db.models.settings.findOne({
    attributes: ['aadar_verification','pan_verification']
   });

   if (!settings) return next(new AppError('Not Found Settings', 404))
    res.json({ message: 'Settings', error: false, data: settings });
});

exports.sendFcmNotification = catchAsync(async (req, res, next) => { 
  const {title, body} = req.body; 
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id; 
  const app = await db.models.appInfo.findAll({
    attributes: ['token'],
    where: {
      deleted_at: null
    }
  }) 

  if (!app.length) return next(new AppError('Token Not found', 404))
  var tokenData = [];
  for(const data of app) {
    tokenData.push(data.token);
  }

  var fcm = new FCM(process.env.FCS_SERVER_TOKEN) 
  var message = {
    registration_ids: tokenData,
    notification: {
      title: title, 
      body:body,
      sound: 'default'
    }
  } 
  fcm.send(message,  function(err, response){
    console.log(err)
    if (err) {
       res.json({ message: 'Notification Not Send Successfully', error: true, data: response });
    } else {
       res.json({ message: 'Notification Send Successfully', error: false, data: response });
    }
  })
})

// Get Detail By Loan Id
exports.getDetailByLoanId = catchAsync(async (req, res, next) => {
  const loanDetails = await db.models.appApplyLoan.findOne({
    include: [{
        model: db.models.appUser,
        attributes: ['username', 'email','mobile_no']
    }],
    attributes: ['id', 'loan_id', 'user_id', 'total_payable_amount'],
    where: {
      deleted_at: null,
      loan_id: req.params.loan_id
    }
  })
  if (!loanDetails) return next(new AppError('Not Found', 404))
  res.json({ message: 'Users found', error: false, loanDetails: loanDetails });
});




