var appInfo = require('../controllers/appInfoController');  

module.exports = function (app) {
//   app.get('/api/info/all', appInfo.getAllInfo); 
  app.get('/apis/info/get_by_id', appInfo.getInfoById); 
  app.post('/apis/info/save_info', appInfo.saveInfo);
  app.post('/apis/fcs/send_notify', appInfo.sendNotification);
  app.get('/apis/info/collection_team_management/all', appInfo.getAllCollectionTeamManagement);
  app.get('/apis/info/collection_team_management/get_by_id/:id', appInfo.getCollectionTeamManagementById);
  app.post('/apis/info/collection_team_management/save_collection_team_management', appInfo.saveCollectionTeamManagement);
};