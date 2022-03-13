'use strict';

var appLocation = require('../controllers/appLocationController');

module.exports = function (app) {
  app.get('/api/location/state', appLocation.getAllState); 
  app.get('/api/location/city/:state_id', appLocation.getAllCity); 
  app.get('/api/location/:state', appLocation.getStateId); 
};