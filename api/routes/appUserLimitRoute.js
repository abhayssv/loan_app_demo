var appUserLimit = require('../controllers/appUserLimitController');  

module.exports = function (app) {
  app.get('/api/user_limit/all', appUserLimit.getAllUserLimit); 
  app.get('/api/user_limit/:id', appUserLimit.getUserLimit); 
  app.get('/api/user_limits/get_limit_by_user_id', appUserLimit.getUserLimitByUserId); 
  app.get('/api/user_limits/get_limits_by_user_type', appUserLimit.getUserLimitLevel); 
  
  app.post('/api/user_limit/save_user_limit', appUserLimit.saveUserLimit);
  app.post('/api/user_limit/delete', appUserLimit.deleteUserLimit);
};