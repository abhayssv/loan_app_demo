'use strict';

var userForgotPassword = require('../controllers/forgotPasswordController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


module.exports = function (app) {
  app.post('/admin/user/forgot_password', userForgotPassword.forgotPassword);
  // app.get('/admin/user/reset/:token', userForgotPassword.getUser);
  app.post('/admin/user/reset', userForgotPassword.resetPassword); 
};
