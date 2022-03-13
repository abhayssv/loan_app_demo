var appUserTimeList = require('../controllers/appUserTimeLimitController');  

module.exports = function (app) {
  app.get('/api/user_time/all', appUserTimeList.getAllUserTimeList);
  app.get('/api/user_time/admin/all', appUserTimeList.getAllUserTimeListforAdmin);
  app.post('/api/user_time/save_user_time', appUserTimeList.saveUserTimeList);
  app.post('/api/user_time/change_status', appUserTimeList.changeStatus);
};