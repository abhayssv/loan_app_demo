var appPayment = require('../controllers/appPaymentController');  

module.exports = function (app) {
  app.post('/api/payment/save', appPayment.savePaymentDetail);
  app.post('/api/payment/flat_save', appPayment.saveFlatDetail);
  app.post('/api/payment/flat_save_business', appPayment.saveFlatBusinessDetail);
  app.post('/api/payment/extend_save', appPayment.saveExtendDetail);
  app.post('/api/payment/custom_extend_save', appPayment.saveCustomExtendDetail);
  app.post('/api/payment/custom_extend_save_business', appPayment.saveCustomExtendBusinessDetail); 
  app.post('/api/payment/disburse_amount', appPayment.disburseAmount);
  app.get('/api/payment/payment_detail', appPayment.getAllApplyloanWithPayment);
  app.get('/api/payment/search_payment', appPayment.getSearchAllApplyloanPayment);
  app.post('/api/payment/create_benificiary', appPayment.createBenificiary);
  app.post('/api/payment/generate_payment_link', appPayment.generatePaymentLink);
  app.post('/api/payment/get_transfer_status', appPayment.checkTransferStatus);
  app.post('/apis/payment/generate_payment_links', appPayment.getPayLink);  
  app.post('/api/payment/flat_installment_flat', appPayment.saveInstallmentFlatDetail);
  app.post('/apis/payment/emp_installment_payment_save', appPayment.saveEmpIntallmentPaymentDetail); 
  app.post('/apis/payment/empl_installment_flat', appPayment.saveEmployeeFlat);
};