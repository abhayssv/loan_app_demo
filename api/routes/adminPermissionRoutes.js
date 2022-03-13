var adminPermission = require('../controllers/adminPermissionController');  

module.exports = function (app) {
  app.get('/api/permission/all', adminPermission.getAllPermission); 
  app.get('/api/permission/get_permissions', adminPermission.checkPermission);
  app.get('/api/permission/:id', adminPermission.getPermissionById);
  app.post('/api/permission/save_permission', adminPermission.savePermission);
  app.post('/api/permission/delete', adminPermission.deletePermission); 
  // Location Restriction Routes
  app.get('/api/permission/state/get_state_list', adminPermission.getStateList);
  app.get('/api/permission/city/get_city_list/:state_id', adminPermission.getCityList); 
  app.post('/api/permission/save/location_restriction', adminPermission.saveLocationRestriction); 
  app.post('/api/permission/delete/location_restriction/', adminPermission.deleteLocationRestriction);  
  app.get('/api/permission/location/restriction', adminPermission.getLocationRestriction); 
  app.post('/apis/permission/location/check_restriction', adminPermission.getCheckLoacationRestriction); 
};