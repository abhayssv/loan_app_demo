var appCredit = require('../controllers/appCreditController');  

module.exports = function (app) {
  app.get('/api/credit/all', appCredit.getAllCredit); 
  app.post('/api/credit/get_by_id', appCredit.getCreditById); 
  app.post('/api/credit/save_credit', appCredit.saveCredit);
  app.post('/api/credit/change/save_pending_credit', appCredit.savePendingCredit);
  app.post('/apis/credit/save_business_credit', appCredit.saveBusinessCredit);  
  app.post('/apis/credit/save_emp_credit', appCredit.saveEmpInstallmentCredit);
};