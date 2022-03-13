'use strict';

var appUserOtp = require('../controllers/appUserOtpController');

module.exports = function (app) {
  app.get('/api/otp/all', appUserOtp.getAllUsersOtp);
  app.post('/api/otp', appUserOtp.getUserOtpByNumber);
  app.post('/api/otp/verify', appUserOtp.getUserbyMobileNum);
  app.post('/api/otp/save_code', appUserOtp.saveUserOtp);
};
