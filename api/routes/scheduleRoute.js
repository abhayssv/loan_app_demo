'use strict';

var scheduler = require('../controllers/scheduleController');
  
module.exports = function (app) {
  app.get('/api/server/status', scheduler.getAllPages); 
  app.get('/api/server/set/status', scheduler.setLoanStatus);  
};