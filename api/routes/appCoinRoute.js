var appApplyLoan = require('../controllers/appApplyLoanController');  

module.exports = function (app) {
  app.get('/api/coins/by_id', appApplyLoan.getTotalCoin);
};