'use strict';

var appAssignLoan = require('../controllers/appAssignLoanController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


module.exports = function (app) {
  app.get('/apis/assign_loan/all', appAssignLoan.getAllLoan); 
  app.get('/apis/assign_loan/get_by_role/:assigner_id', appAssignLoan.getLoanByRole); 
  app.post('/apis/assign_loan/manual/assign_loan', appAssignLoan.manualAssignLoan);
  app.post('/apis/assign_loan/auto/assign_loan', appAssignLoan.autoAssignLoan); 
  app.post('/api/assign_loan/get_transactions_by_loan_id',appAssignLoan.getTransactionsAdmin);
};