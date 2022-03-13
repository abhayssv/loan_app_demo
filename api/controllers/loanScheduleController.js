'use strict';
var db = require('../config/sequelize').db; 
var _ = require('lodash'); 
const {Op} = require('sequelize');
const moment = require('moment');
const {getCollectionUserId} = require('../utils/utilities');
const cfSdk = require('cashfree-sdk');
const {Payouts} = cfSdk;
const {Beneficiary, Transfers} = Payouts;
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { 
    PAYMENT_GATEWAY_APP_ID,
    PAYMENT_GATEWAY_SECRET_KEY
  } = process.env;

// Collection Assign Controller .............................................................................

const assignCollectionLoan = async ()=>{ 
    const loanData = await db.models.appApplyLoan.findAll({
        attributes: [
        'loan_id',
        'payable_date',
        'customer_care',
        's1',
        's2',
        's3',
        'm1',
        'm2',
        'collection_manager'
        ],
        where: {
        status: 3,
        [Op.or]: [
            {customer_care: 0},
            {s1: 0},
            {s2: 0},
            {s3: 0},
            {m1: 0},
            {m2: 0},
            {collection_manager: 0}
        ]
        }
    });
    const collection = await db.models.collectionManagement.findAll({
        attributes: ['role_id', 'min_days', 'max_days']
    }); 
    let obj3 = {};
    collection.forEach(item => {
        obj3[item.role_id] = {min_days: item.min_days, max_days: item.max_days};
    });
    
    for (const item of loanData) {
        let day = Date.parse(item.payable_date) / 1000;
        let currentDay = moment.unix(moment().unix()).format('YYYY-MM-DD');
        let payableDay = moment.unix(day).format('YYYY-MM-DD');
        let difference = moment(currentDay).diff(payableDay, 'days');
        let team_name;
        let next_team_name;
        switch (true) {
        case difference >= obj3[7].min_days && difference <= obj3[7].max_days:
            if (item.customer_care === 0) {
            // console.log(`${item.loan_id} to customer care`); 
            team_name = "customer_care"; 
            next_team_name = "s1"
            let user_id = await getCollectionUserId(team_name , 7, item.loan_id, next_team_name) 
            await updateUsers(user_id, team_name, item.loan_id); 
            }
            break;
        case difference >= obj3[8].min_days && difference <= obj3[8].max_days:
            if (item.s1 === 0) {
            // console.log(`${item.loan_id} to s1`);
            team_name = "s1";
            next_team_name = "s2"
            let user_id = await getCollectionUserId(team_name , 8, item.loan_id, next_team_name) 
            await updateUsers(user_id, team_name, item.loan_id); 
            }
            break;
        case difference >= obj3[9].min_days && difference <= obj3[9].max_days:
            if (item.s2 === 0) {
            // console.log(`${item.loan_id} to s2`);
            team_name = "s2";
            next_team_name = "s3"
            let user_id = await getCollectionUserId(team_name , 9, item.loan_id, next_team_name) 
            await updateUsers(user_id, team_name, item.loan_id);  
            }
            break;
        case difference >= obj3[10].min_days && difference <= obj3[10].max_days:
            if (item.s3 === 0) {
            // console.log(`${item.loan_id} to s3`);
            team_name = "s3";
            next_team_name = "m1"
            let user_id = await getCollectionUserId(team_name , 10, item.loan_id, next_team_name) 
            await updateUsers(user_id, team_name, item.loan_id); 
            }
            break;
        case difference >= obj3[11].min_days && difference <= obj3[11].max_days:
            if (item.m1 === 0) {
            // console.log(`${item.loan_id} to m1`);
            team_name = "m1";
            next_team_name = "m2"
            let user_id = await getCollectionUserId(team_name , 11, item.loan_id, next_team_name) 
            await updateUsers(user_id, team_name, item.loan_id); 
            }
            break;
        case difference >= obj3[12].min_days && difference <= obj3[12].max_days:
            if (item.m2 === 0) {
            // console.log(`${item.loan_id} to m2`);
            team_name = "m2";
            next_team_name = "collection_manager";
            let user_id = await getCollectionUserId(team_name , 12, item.loan_id, next_team_name) 
            await updateUsers(user_id, team_name, item.loan_id); 
            }
            break; 
        default:
            null;
        }
    };  
}

const updateUsers = async (user_id, team_name, loan_id) => {
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
    console.log("UPDATE Loan ID",loan_id );
    console.log("UPDATE",updatestatus );
    // if (!updatestatus) return next(new AppError('Not Found', 404));
    // res.json({ message: 'Status updated successfully', error: false, data: updatestatus }); 
};

// Check and Update Pending for bank loan by transtation id

const checkUpdateLoan = catchAsync(async (req, res, next) => {
    const loanData = await db.models.appApplyLoan.findAll({
        attributes: ["id", "loan_id", "transfer_id", "days", "user_id", "created_at", "updated_at"],
        where: { 
            status: 6,
            transfer_id: {
            [Op.ne]: null
            } 
        },
    });  
    for (const item of loanData) {   
        const days = item.days; 
        const payable_Date = moment().add(days, "d").format("YYYY-MM-DD HH:mm:ss");  
        checkTransferStatus(item.transfer_id, function (callback) {
            const { response } = callback;  
            console.log("response", response);
            if(response.subCode == 200){
            if(response.data.transfer.status == "SUCCESS"){
                const updatestatus = db.models.appApplyLoan.update(
                {   
                    status: 3,
                    payable_date:payable_Date
                },
                {
                    where: {
                    loan_id: item.loan_id
                    }, 
                }
                );  
            } else if(response.data.transfer.status == "FAILED" || response.data.transfer.status == "REVERSED"){
                const updatestatus = db.models.appApplyLoan.update(
                {   
                    status: 1, 
                    transfer_id: null
                },
                {
                    where: {
                    loan_id: item.loan_id
                    }, 
                }
                ); 
            } 
            } else if(response.subCode == 404){
            const updatestatus = db.models.appApplyLoan.update(
                {    
                transfer_id:null,
                status: 1
                },
                {
                where: {
                    transfer_id: item.transfer_id
                }, 
                }
            );
            }
        }); 
    };
});

const checkTransferStatus = async(transferId, callback)=> { 
    const response = await Transfers.GetTransferStatus({
        "transferId": transferId,
    });
    let data = { response }
    callback(data);
};

// Assign Business Loan to collection team
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

const generateResponseList = (transactionsList) => {
    const {
        total_payable_amount,
        remaining_amount,
        disbursed_date,
        days,
        appBusinessPayments,
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
        const outstandingAmount = amountPerTransaction + penaltyAmount;
        const amountWithoutPenalty = amountPerTransaction;
        transactions[outstanding].amount = parseFloat(outstandingAmount.toFixed(2));
        transactions[outstanding].amountWithoutPenalty = parseFloat(amountWithoutPenalty.toFixed(2));
        transactions[outstanding].penalty = parseFloat(penaltyAmount.toFixed(2));
      }
    }
    var myData = Object.keys(transactions).map(key => {
        return transactions[key];
    }) 
    var i = 0;
    var count = 0;
    while (i < myData.length) { 
        if (myData[i]['paid'] == false){
        count += 1;
        } else {
        count = -1;
        } 
        i += 1;
    }
    return count;
};

const getTransactions = async (loansId) => { 
    const transactionsList = await db.models.appApplyLoan.findOne({
      include: [
        {
          model: db.models.appUser,
          as: 'appUser',
          attributes: ['username', 'email', 'mobile_no']
        },
        {
          model: db.models.appBusinessPayment,
          attributes: ['loan_id', 'tx_time', 'order_amount']
        }
      ],
      attributes: [
        'total_payable_amount',
        'remaining_amount',
        'loan_id',
        'apply_date',
        'disbursed_date',
        'days'
      ],
      where: {
        loan_id: loansId,
        // user_id: user_id
      }
    });
    console.log("transactionsList", generateResponseList(transactionsList));
    return generateResponseList(transactionsList);
    // if (!transactionsList) return next(new AppError("Not Found", 404));
    // res.json({
    //     message: "TransactionDetails",
    //     error: false,
    //     data: generateResponseList(transactionsList),
    // });
}; 

const assignBusinessCollectionLoan = async ()=>{ 
    const loanData = await db.models.appApplyLoan.findAll({
        attributes: [ 'loan_id', 'payable_date', 'customer_care', 's1', 's2', 's3', 'm1', 'm2', 'collection_manager' ],
        include: [
            {
                model: db.models.appUser, 
                attributes: ['username', 'email', 'mobile_no', 'user_type'],
                where:{
                    user_type : 3
                }
            }
        ],
        where: {
            status: 3,
            [Op.or]: [
                {customer_care: 0},
                {s1: 0},
                {s2: 0},
                {s3: 0},
                {m1: 0},
                {m2: 0},
                {collection_manager: 0}
            ]
        }
    }); 
    const collection = await db.models.businessCollectionManagement.findAll({
        attributes: ['role_id', 'min_days', 'max_days']
    });  
    let obj3 = {};
    collection.forEach(item => {
        obj3[item.role_id] = {min_days: item.min_days, max_days: item.max_days};
    });
    
    for (const item of loanData) {
        let difference = await getTransactions(item.loan_id); 
        let team_name;
        let next_team_name;
        switch (true) {
        case difference >= obj3[7].min_days && difference <= obj3[7].max_days:
            if (item.customer_care === 0) {
            // console.log(`${item.loan_id} to customer care`); 
            team_name = "customer_care"; 
            next_team_name = "s1"
            let user_id = await getCollectionUserId(team_name , 7, item.loan_id, next_team_name) 
            await updateBusinessUsers(user_id, team_name, item.loan_id); 
            }
            break;
        case difference >= obj3[8].min_days && difference <= obj3[8].max_days:
            if (item.s1 === 0) {
            // console.log(`${item.loan_id} to s1`);
            team_name = "s1";
            next_team_name = "s2"
            let user_id = await getCollectionUserId(team_name , 8, item.loan_id, next_team_name) 
            await updateBusinessUsers(user_id, team_name, item.loan_id); 
            }
            break;
        case difference >= obj3[9].min_days && difference <= obj3[9].max_days:
            if (item.s2 === 0) {
            // console.log(`${item.loan_id} to s2`);
            team_name = "s2";
            next_team_name = "s3"
            let user_id = await getCollectionUserId(team_name , 9, item.loan_id, next_team_name) 
            await updateBusinessUsers(user_id, team_name, item.loan_id);  
            }
            break;
        case difference >= obj3[10].min_days && difference <= obj3[10].max_days:
            if (item.s3 === 0) {
            // console.log(`${item.loan_id} to s3`);
            team_name = "s3";
            next_team_name = "m1"
            let user_id = await getCollectionUserId(team_name , 10, item.loan_id, next_team_name) 
            await updateBusinessUsers(user_id, team_name, item.loan_id); 
            }
            break; 
        default:
            null;
        }
    };  
}

const updateBusinessUsers = async (user_id, team_name, loan_id) => {
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
    if (!updatestatus) return next(new AppError('Not Found', 404));
    res.json({ message: 'Status updated successfully', error: false, data: updatestatus }); 
};

// Get and check repayment status by link Id
  
const getPayStatus = async () => {  
    const queryObj = {
      attributes: ['id', 'loan_id', 'link_id', 'status'], 
      where: {
        deleted_at: null,
        status: "ACTIVE"
      }
    }   
    const getAllActivelinkId = await db.models.payLink.findAll(queryObj); 
    for (const element of getAllActivelinkId ){ 
      const sdk = require('api')('@cashfreedocs-new/v1#5232kkwyp8vyl'); 
      sdk.server('https://api.cashfree.com/pg');
      sdk.GetPaymentLinkDetails({
        link_id: element.link_id,
        'x-client-id': PAYMENT_GATEWAY_APP_ID,
        'x-client-secret': PAYMENT_GATEWAY_SECRET_KEY,
        'x-api-version': '2021-05-21'
      })
      .then(result =>{   
        db.models.payLink.update({
          status: result.link_status, 
        },{
          where:{ link_id: element.link_id }
        }).then(update =>{ 
        console.log("RESPONSE", result);
        if(result.link_status == "PAID"){
            savePaymentDetail(element.loan_id, result.lik_amount_paid, result.link_created_at); 
        }
         
        console.log("RESPONSE", result);
        
        }) 
      })
      .catch(err => console.error(err));
    }
}; 

const savePaymentDetail = async (loan_id, amount, txTime) => {
    var c_Date = moment(txTime).format('YYYY-MM-DD HH:mm:ss'); 
    const loanDetails = await db.models.appApplyLoan.findOne({
      attributes: ['user_id', 'loan_id', 'remaining_amount'],
      where: {
        loan_id,
      }
    });
    var payment_detail = {      
        "txTime": c_Date,
        "txStatus": "Payment by Repayment Link",
        "orderAmount": amount,
        "paymentMode": "Repay Link"
    } 
    const create = await db.models.appPayment.create({
      user_id: loanDetails.user_id, loan_id, payment_detail, paid_redeem_coins:0, penality:0
    }); 
    if (!create) return next(new AppError('Not Found', 404))
    const dedRemainingAmount = loanDetails.remaining_amount - amount; 
    const updated = await db.models.appApplyLoan.update({
      remaining_amount: dedRemainingAmount
    }, {
        where: {
         loan_id
        }
    })
    // if (!updated) return next(new AppError('Not Found', 404))
    // if(paid_redeem_coins != 0){
    // const updated = await db.models.manageCoins.update({
    //     v_coins: 0
    // }, {
    //     where: {
    //     user_id
    //     }
    // })
    if (!updated) return next(new AppError('Not Found', 404))
    console.log('Payment detail and coin remove sucessfully'); 
    saveCredit(loanDetails.user_id); 
  };

const saveCredit = async (user_id) => {   
    console.log(user_id);
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
    // const {level} = req.body;
    const user = await db.models.appCredit.findOne({ 
        where: { 
        user_id, //level
        }
    })   
    if (user) {
        if(user.credit != 10) var credit = user.credit + 1;
        const update = await db.models.appCredit.update({
        credit, //level
      }, {
        where: {
          user_id
        }
      })
      if (!update) return next(new AppError('Not Found', 404))
      console.log("Credit updated sucessfully"); 
    } else { 
        const create = await db.models.appCredit.create({
            user_id, credit: 1, level:0,
        })
        if (!create) return next(new AppError('Not Found', 404))
        console.log("Credit create sucessfully"); 
    }
};

module.exports = { 
    assignCollectionLoan:assignCollectionLoan,
    checkUpdateLoan:checkUpdateLoan,
    assignBusinessCollectionLoan:assignBusinessCollectionLoan,
    getPayStatus:getPayStatus
};

