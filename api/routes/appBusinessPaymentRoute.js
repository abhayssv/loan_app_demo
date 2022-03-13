var appBusinessPayment = require('../controllers/appBusinessPaymentController');  

module.exports = function (app) {
  app.post('/apis/business/payment/save', appBusinessPayment.savePaymentDetail);
  app.post('/apis/business/payment/flat_save', appBusinessPayment.saveFlatDetail);
  app.post('/apis/business/payment/extend_save', appBusinessPayment.saveExtendDetail);
  app.post('/apis/business/payment/custom_extend_save', appBusinessPayment.saveCustomExtendDetail); 
  // app.post('/apis/payment/disburse_amount', appBusinessPayment.disburseAmount);
  app.get('/apis/business/payment/payment_detail', appBusinessPayment.getAllApplyloanWithPayment);
  app.get('/apis/business/payment/search_payment', appBusinessPayment.getSearchAllApplyloanPayment);
  app.get('/apis/business/payment/payment_detail_by_loan_id/:loan_id', appBusinessPayment.getPaymentDetailsByLoanId);
  
  // app.post('/apis/payment/create_benificiary', appBusinessPayment.createBenificiary);
  app.post('/apis/business/payment/generate_payment_link', appBusinessPayment.generatePaymentLink);
  // app.post('/apis/payment/get_transfer_status', appBusinessPayment.checkTransferStatus);
  app.get('/apis/business/payment/app_history/:loan_id', appBusinessPayment.getPaymentDetailsInApp);
};