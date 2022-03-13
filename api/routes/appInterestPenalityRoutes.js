var appInterestPenality = require('../controllers/appInterestPenalityController');  

module.exports = function (app) {
  app.get('/api/interest_penality/all', appInterestPenality.getAllInterestPenalities); 
  app.get('/api/interest_penality/:id', appInterestPenality.getInterestPenality); 
  app.get('/api/interest_penality/app/:id', appInterestPenality.getInterest); 
  app.post('/api/interest_penality/save_interest_penality', appInterestPenality.saveInterestPenality);
  app.post('/api/interest_penality/delete', appInterestPenality.deleteInterestPenality);
};