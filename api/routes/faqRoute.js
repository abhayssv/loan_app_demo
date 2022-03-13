'use strict';

var appFaq = require('../controllers/appFaqController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


module.exports = function (app) {
  app.get('/api/faq/all', appFaq.getAllfaqs); 
  app.get('/api/faq/:faq_id', appFaq.getFaq); 
  app.post('/api/faq/save_faq', appFaq.saveFaq);
  app.post('/api/faq/delete', appFaq.deleteFaq);
};