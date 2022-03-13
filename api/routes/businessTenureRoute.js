var appBusinessDays = require('../controllers/businessTenureController');  

module.exports = function (app) {
  app.get('/apis/business/all', appBusinessDays.getAllBusinessTenure); 
  app.get('/apis/business/:id', appBusinessDays.getInterestPenality); 
  app.get('/apis/business/app/tenure', appBusinessDays.getBusinessTenure); 
  app.get('/apis/business/app/:days', appBusinessDays.getBusinessInterest); 
  app.post('/apis/business/save_interest_penality', appBusinessDays.saveInterestPenality);
  app.post('/apis/business/delete', appBusinessDays.deleteInterestPenality);
};