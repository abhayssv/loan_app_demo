var appUserList = require('../controllers/appUserListController');  

module.exports = function (app) {
  app.get('/api/user_list/all', appUserList.getAllUserList);
  app.get('/api/user_list/admin/all', appUserList.getAllUserListforAdmin);
  // app.post('/api/user_list/save_user_list', appUserList.saveUserList);
  app.post('/api/user_list/change_status', appUserList.changeStatus);
};