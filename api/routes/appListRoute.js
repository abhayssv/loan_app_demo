'use strict';

var appList = require('../controllers/appListController');


module.exports = function (app) {
  app.get('/api/applist/all', appList.getAllAppList);
  app.post('/api/applist/save_app_list', appList.saveAppList);
};