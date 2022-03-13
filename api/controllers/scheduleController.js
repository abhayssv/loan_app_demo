'use strict';
var db = require('../config/sequelize').db; 
var _ = require('lodash');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync')
const cron = require('node-cron');   
var schedule = require('./loanScheduleController');
var fcm = require('./fcmScheduleController');
const dbBackup = require('./../utils/dbBackup');

// Page Controller .............................................................................

exports.getAllPages = catchAsync(async (req, res, next) => {
  const pages = await db.models.appPage.findAll({
    attributes: ['page_id', 'slug', 'title', 'description'],
    where: {
      deleted_at: null
    }
  })
  if (JSON.stringify(pages) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  res.json({ message: 'Pages found', error: false, data: pages });
});

exports.setLoanStatus = catchAsync(async (req, res, next) => { 
  schedule.checkUpdateLoan(req, res, next);
});

  //Student and Employee loan 
    cron.schedule('0 1 * * *', async () => { 
        schedule.assignCollectionLoan();
    });
     
  // Bussiness Loan 
    cron.schedule('0 1 * * *', async () => { 
        schedule.assignBusinessCollectionLoan();
    });
  
    cron.schedule('0 0 */3 * * *', async () => {    
        schedule.checkUpdateLoan();
    }); 

    cron.schedule('0 0 */3 * * *', async () => {    
        fcm.sendNotification("Test", "Demo");
    });
    //  check repayment link status
    cron.schedule('0 0 */3 * * *', async () => {    
        schedule.getPayStatus();
    });
    // Auto DB Backup
    // cron.schedule('*/3 * * * *', async () => {    
    //     dbBackup();
    // });

