'use strict';

var appPage = require('../controllers/appPagesController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


module.exports = function (app) {
  app.get('/api/page/all', appPage.getAllPages);
  app.get('/api/page/get_pages', appPage.getPages);
  app.get('/api/page/:page_id', appPage.getPage);
  app.get('/api/page/by/:slug', appPage.getPageBySlug);
  app.post('/api/page/save_page', appPage.savePage);
  // app.post('/apis/page/delete', appPage.deletePage);
};