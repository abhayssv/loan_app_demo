'use strict'; 
var user = require('../controllers/usersController');  
var upload = require('../lib/multerAdminProfileUpload');

var multerware = upload.fields([  
 { name: 'profile_image', maxCount: 1} 
])

module.exports = function (app) {
  app.get('/admin/user/all', user.getAllUsers);
  app.get('/admin/user/get_users', user.getUsers);
  app.get('/admin/user/:id', user.getUser);
  app.get('/admin/user/search/users', user.getSearchUsers);
  app.get('/admin/user/reviewer/first', user.getFirstReviewer);
  app.get('/admin/user/reviewer/second', user.getSecondReviewer);
  app.post('/admin/user/status', multerware, user.changeStatus);
  app.post('/admin/user/save_user', multerware, user.saveUser);
  app.post('/admin/user/delete', user.deleteUser);
  app.post('/admin/user/contact_list_permission', user.changeContactPermission);
};