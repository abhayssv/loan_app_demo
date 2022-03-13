'use strict';
var db = require('../config/sequelize').db;
var Sequelize = require("sequelize");
var _ = require('lodash');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync')
var generalConfig = require('../config/generalConfig');
var passport = require("../config/passport.js")();
const { Op, QueryTypes } = require('sequelize'); 
var moment = require('moment');

// Page Controller .............................................................................

exports.getAllLoan = catchAsync(async (req, res, next) => {  
  const getLoan = await db.models.appApplyLoan.findAll({
    include: [{
      model: db.models.appUser, 
      attributes: ['username', 'email','mobile_no', 'user_type'], 
    },
    {      
      model: db.models.appKycDetails, 
      attributes: ['adhaar_no', 'reg_mob_no', 'pan_no'], 
    },{
      model: db.models.loanStatus, 
      attributes: ['status_id', 'status'],
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
      model: db.models.user,
      as: 'customerCare', 
      attributes: ['firstname', 'lastname'],
    },
    {
      model: db.models.user,
      as: 'S1', 
      attributes: ['firstname', 'lastname'],
    },
    {
      model: db.models.user,
      as: 'S2', 
      attributes: ['firstname', 'lastname'],
    },
    {
      model: db.models.user,
      as: 'S3', 
      attributes: ['firstname', 'lastname'],
    },
    {
      model: db.models.user,
      as: 'M1', 
      attributes: ['firstname', 'lastname'],
    },
    {
      model: db.models.user,
      as: 'M2', 
      attributes: ['firstname', 'lastname'],
    },
    {
      model: db.models.user,
      as: 'collectionManager', 
      attributes: ['firstname', 'lastname'],
    }],
    attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date', 'reviewer_1','reviewer_2','customer_care','s1','s2','s3','m1','m2','collection_manager','status', 'created_at', 'updated_at'],
    where: {
      status:0,
      deleted_at: null
    }
  })
  const getUser = await db.models.user.findAll({ 
    attributes: ['id','firstname', 'lastname','has_role'],
    where: {
      has_role:4,
      user_type:2,
      active:1
    } 
  })
  if (JSON.stringify(getLoan) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Loan found', error: false, data: getLoan, user:getUser, team: "reviewer_1" });
});

exports.getLoanByRole = catchAsync(async (req, res, next) => { 
  const {assigner_id} = req.params;
  let whereClause;
  let whereClause2;
  let team;
  if(assigner_id == 4){
    whereClause = {
      status:0,
      deleted_at: null
    }
    whereClause2 = {
      active:1,
      has_role:4,
      user_type:2,
      deleted_at: null
    }
    team = "reviewer_1";
  }else if(assigner_id == 5){
    whereClause = {
      status:1,
      deleted_at: null
    }
    whereClause2 = {
      active:1,
      has_role:5,
      user_type:2,
      deleted_at: null
    }
    team = "reviewer_2";
  }else if(assigner_id == 7){
    whereClause = {
      status:3,
      customer_care:{[Op.ne]:0},
      s1: 0,
      deleted_at: null
    }
    whereClause2 = {
      active:1,
      has_role:7,
      user_type:3,
      deleted_at: null
    }
    team = "customer_care";
  }else if(assigner_id == 8){
    whereClause = {
      status:3,
      s1:{[Op.ne]:0},
      s2: 0,
      deleted_at: null
    }
    whereClause2 = {
      active:1,
      has_role:8,
      user_type:3,
      deleted_at: null
    }
    team = "s1";
  }else if(assigner_id == 9){
    whereClause = {
      status:3,
      s2:{[Op.ne]:0},
      s3: 0,
      deleted_at: null
    }
    whereClause2 = {
      active:1,
      has_role:9,
      user_type:3,
      deleted_at: null
    }
    team = "s2";
  }else if(assigner_id == 10){
    whereClause = {
      status:3,
      s3:{[Op.ne]:0},
      m1: 0,
      deleted_at: null
    }
    whereClause2 = {
      active:1,
      has_role:10,
      user_type:3,
      deleted_at: null
    }
    team = "s3";
  }else if(assigner_id == 11){
    whereClause = {
      status:3,
      m1:{[Op.ne]:0},
      m2: 0,
      deleted_at: null
    }
    whereClause2 = {
      active:1,
      has_role:11,
      user_type:3,
      deleted_at: null
    }
    team = "m1";
  }else if(assigner_id == 12){
    whereClause = {
      status:3,
      m2:{[Op.ne]:0},
      collection_manager: 0,
      deleted_at: null
    }
    whereClause2 = {
      active:1,
      has_role:12,
      user_type:3,
      deleted_at: null
    }
    team = "m2";
  }
  const getLoan = await db.models.appApplyLoan.findAll({
    include: [{
      model: db.models.appUser, 
      attributes: ['username', 'email','mobile_no', 'user_type'], 
    },{      
      model: db.models.appKycDetails, 
      attributes: ['adhaar_no', 'reg_mob_no', 'pan_no'], 
    },{
      model: db.models.loanStatus, 
      attributes: ['status_id', 'status'],
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
      model: db.models.user,
      as: 'customerCare', 
      attributes: ['firstname', 'lastname'],
    },
    {
      model: db.models.user,
      as: 'S1', 
      attributes: ['firstname', 'lastname'],
    },
    {
      model: db.models.user,
      as: 'S2', 
      attributes: ['firstname', 'lastname'],
    },
    {
      model: db.models.user,
      as: 'S3', 
      attributes: ['firstname', 'lastname'],
    },
    {
      model: db.models.user,
      as: 'M1', 
      attributes: ['firstname', 'lastname'],
    },
    {
      model: db.models.user,
      as: 'M2', 
      attributes: ['firstname', 'lastname'],
    },
    {
      model: db.models.user,
      as: 'collectionManager', 
      attributes: ['firstname', 'lastname'],
    }],
    attributes: ['id', 'user_id', 'loan_id', 'required_amount', 'disbursed_amount', 'apply_date', 'days', 'total_payable_amount', 'remaining_amount', 'redeem_coins', 'payable_date','reviewer_1','reviewer_2','customer_care','s1','s2','s3','m1','m2','collection_manager', 'status', 'created_at', 'updated_at'],
    where: whereClause
  })
  const getUser = await db.models.user.findAll({ 
    attributes: ['id','firstname', 'lastname', 'has_role'],
    where: whereClause2
  })
  if (!getLoan) return next(new AppError('Not Found', 404))
  res.json({ message: 'Loan found', error: false, data: getLoan, user:getUser, team:team });
});
 
exports.manualAssignLoan = catchAsync(async (req, res, next) => { 
  const {assign_id, loan_id, team_name} = req.body;   
  for (const element of loan_id) { 
    let updatedQuery = {[team_name]:assign_id} 
    const update = await db.models.appApplyLoan.update(
      updatedQuery
    , {
      where: {
        loan_id:loan_id
      }
    })
    if (!update) return next(new AppError('Not Found', 404))
    res.json({ message: 'Assign sucessfully', error: false, data: update });
  }  
});

exports.autoAssignLoan = catchAsync(async (req, res, next) => { 
  const {has_role,team} = req.body;    
    console.log("BODY", req.body);
    const getUser = await db.models.user.findAll({ 
      attributes: ['id','firstname', 'lastname', 'has_role'],
      where: {
        has_role:has_role,
        deleted_at:null,
        active:0
      }
    })
  // let getLoan;
  for (const element of getUser) {  
    let loanStatus;
    if(team == "reviewer_1"){
      loanStatus = 0;
    } else if(team == "reviewer_2"){
      loanStatus = 1
    } else{
      loanStatus = 3
    }
    var getLoan = await db.models.appApplyLoan.findAll({ 
      attributes: ['id','loan_id', 'user_id',],
      where: {
        [team]:element.id,
        deleted_at:null,
        status:loanStatus, 
      }
    }) 
    await getInactiveUser(getLoan,team, element.has_role, res, next );
  }  
});

const getInactiveUser = async (loanDetails, team_name, roleId, res, next) => {  
  let next_team_name;
  let next_team_value;
  let user_type;
  let status;
  if(roleId == 4){
    next_team_name = "reviewer_2"
    next_team_value = null
    status = 0
    user_type = 2
  }else if(roleId == 5){
    next_team_name = "customer_care"
    next_team_value = 0
    status = 1
    user_type = 2
  }else if(roleId == 7){
    next_team_name = "s1"
    next_team_value = 0
    status = 3
    user_type = 3
  }else if(roleId == 8){
    next_team_name = "s2"
    next_team_value = 0
    status = 3
    user_type = 3
  }else if(roleId == 9){
    next_team_name = "s3"
    next_team_value = 0
    status = 3
    user_type = 3
  }else if(roleId == 10){
    next_team_name = "m1"
    next_team_value = 0
    status = 3
    user_type = 3
  }else if(roleId == 11){
    next_team_name = "m2"
    next_team_value = 0
    status = 3
    user_type = 3
  }else if(roleId == 12){
    next_team_name = "collection_manager"
    next_team_value = 0
    status = 3
    user_type = 3
  }
  for (const element of loanDetails) { 
    let user_id = await getCollectionUserId(team_name , roleId, element.loan_id, next_team_name, next_team_value,status,user_type)
    var updated = await updateUsers(user_id, team_name, element.loan_id); 
    console.log("updated", updated);  
  } 
};

const getCollectionUserId = async (team_name, roleId, loan_id, next_team_name, next_team_value,status,user_type ) => { 
  console.log("TEam Name", team_name);
  console.log("Role Id", roleId);
  console.log("Next Team Name", next_team_name);
  console.log("Next Team Value", next_team_value);
  console.log("Status", status);
  console.log("User Type", user_type);
   const users = await db.query(`SELECT id FROM (SELECT u.id, COUNT(l.id) as loan_count FROM vizzve_users AS u LEFT JOIN (SELECT * FROM vizzve_apply_loan WHERE status = ${status} AND ${next_team_name} = ${next_team_value}) AS l ON u.ID = l.${team_name} WHERE u.has_role =:has_role AND u.user_type = ${user_type} AND u.active = 1 GROUP BY u.id) as count_table ORDER BY loan_count ASC LIMIT 0,1`,{
     type:QueryTypes.SELECT,
     replacements:{has_role:roleId}
   }); 
   console.log("USER:",users);
    return users[0].id;
};
 
// exports.deleteFaq = catchAsync(async (req, res, next) => {
//   const current_date = new Date(); 
//   const faq = await db.models.appFaq.update({
//     deleted_at : current_date,
//     }, {where: {
//       faq_id: req.body.faq_id
//     },
//     force: false
//   })
//   if (!faq) return next(new AppError('Not Found', 404))
//   res.json({ message: 'FAQ delete sucessfully', error: false, data: faq });
// });

const updateUsers = async (user_id, team_name, loan_id, res, next) => {
  const updatestatus = await db.models.appApplyLoan.update(
   {   
     [team_name] : user_id
   },
   {
     where: {
       loan_id: loan_id
     }, 
   }
   ); 
  //  if (!updatestatus) return next(new AppError('Not Found', 404))
  //   res.json({ message: 'Auto assign Completed', error: false, data: updatestatus });
}; 

const generateResponseListAdmin = (transactionsList) => {
  const {
      total_payable_amount,
      remaining_amount,
      disbursed_date,
      days,
      appPayments,
      payable_date
  } = transactionsList["dataValues"]; 
  let current = moment().unix();
  let daysInUnix = [];
  var emiDays = Math.ceil(days / 7);
  let amountPerTransaction = total_payable_amount / emiDays;
  // let amountPerTransaction = total_payable_amount / days;
  let daysNotPaid = null;
  let penaltyPercentage = 0.3;
  let transactions = {};

  for (let i = 0; i < emiDays; i++) {
    const addDays = i * 7
      daysInUnix.push(
          moment(disbursed_date, "YYYY-MM-DD HH:mm:ss")
              .add(addDays + 7, "day")
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
          penaltyAmountAfterPaymentDate

      };
  });

  dates.forEach((items) => {
      let pendingTransaction = moment.unix(items).format("YYYY-MM-DD");
      appPayments.forEach((item) => {
          // let paidTransaction = Date.parse(item.tx_time) / 1000;
          let paidTransaction = Date.parse(item.tx_date) / 1000;
          let momentPaid = moment.unix(paidTransaction).format("YYYY-MM-DD");
          if (moment(pendingTransaction).isSame(momentPaid, "day")) {
              //const amount = (momentPaid in transactions)? parseFloat(transactions.momentPaid.amount)+parseFloat(item.order_amount): parseFloat(item.order_amount)
              const penalityPaid = item.penality || 0;
              transactions[momentPaid] = {
                  ...transactions[momentPaid],
                  paid: true,
                  amount: parseFloat(item.payment_detail.order_amount),
                  penalityPaid,
                  penaltyAmountAfterPaymentDate:0
              };
          }
      });
  })

  let transactionDays = Object.keys(transactions);
  let daysToPay=0;
  for(let i=transactionDays.length-2;i>=0;i--){
      if (!transactions[transactionDays[i]].paid) {
        daysToPay+=1;
      }else { break;}
  }
  
  if (daysToPay > 0) {
    const outstanding =
      Object.keys(transactions)[Object.keys(transactions).length - 1];
    if (
      !transactions[outstanding].paid &&
      !transactions[Object.keys(transactions)[Object.keys(transactions).length - 2]].paid
    ) {
      const penaltyAmount = calculatePenalty(
        daysToPay,
        amountPerTransaction,
        penaltyPercentage
      );

      const penalityOnEMI = Number((penaltyAmount - (daysToPay*amountPerTransaction)).toFixed(2));

      const outstandingAmount = amountPerTransaction + penaltyAmount;
      const amountWithoutPenalty = amountPerTransaction;
      transactions[outstanding].amount = parseFloat(outstandingAmount.toFixed(2));
      transactions[outstanding].amountWithoutPenalty = parseFloat(amountWithoutPenalty.toFixed(2));
      transactions[outstanding].penalty = parseFloat(penaltyAmount.toFixed(2));
      transactions[outstanding].penalityOnEMI = penalityOnEMI;
      transactions[outstanding].penaltyAmountAfterPaymentDate =  Number(penaltyAmountAfterPaymentDate.toFixed(2));
    }
  }
  return transactions;
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
        model: db.models.appPayment,
        attributes: ['loan_id', 'payment_detail', 'tx_date']
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
      // data: transactionsList,
      data: generateResponseListAdmin(transactionsList),
  });
}); 

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