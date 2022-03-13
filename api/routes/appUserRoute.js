'use strict';

var appUser = require('../controllers/appUsersController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


module.exports = function (app) {
  app.get('/api/user/all', appUser.getAllUsers);
   app.get('/api/user/count', appUser.getAllUsersCount);
  app.get('/api/user/customer_details/get_all/:offset/:limit', appUser.getAllCustomers); 
  app.get('/api/user/get_users', appUser.getUsers);
  app.get('/api/user/get_email_types', appUser.getEmailTypes);
  app.get('/api/user/:user_id', appUser.getUser); 
  app.post('/api/user/check/email', appUser.getEmailStatus);
  app.post('/api/user/check/contact', appUser.getContactStatus);
  app.post('/api/user/sign_in', appUser.signInUser);
  app.post('/api/user/status', appUser.changeStatus);
  app.post('/api/user/level', appUser.changeLevel);
  app.post('/api/user/user_type', appUser.changeUserType);
  app.post('/api/user/save_user', appUser.saveUser);
  app.post('/api/user/delete', appUser.deleteUser); 
  app.post('/api/user/valid_ref_code', appUser.validRefCode);
  app.post('/api/user/customer_support', appUser.customerSupport);
  app.post('/api/user/set_email_type', appUser.setEmailType);
  app.get('/api/user/loan/getLoanCount', appUser.getLoanCount)  
  app.get('/api/user/customer_details/search', appUser.getSearchCustomers);
  app.get('/api/user/sataus/changes', appUser.getAppUserStatus);
  app.get('/api/user/settings/all', appUser.getAllSettings);  
  app.post('/api/user/switch_aadar_verification', appUser.setAadarBtn);
  app.post('/api/user/fcm/send_notification', appUser.sendFcmNotification); 
  app.get('/apis/user/get_detail_by_loan_id/:loan_id', appUser.getDetailByLoanId);
  
  // app.get('/api/user/label/get_label', appUser.getLabel); 
  // app.delete('/api/user/delete/:id', appUser.deleteUser);
};
