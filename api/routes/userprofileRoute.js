'use strict';

var user = require('../controllers/profileController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

module.exports = function (app) {
  app.get('/profile', user.getProfile);
  app.post('/profile', multipartMiddleware, user.updateProfile);
}
