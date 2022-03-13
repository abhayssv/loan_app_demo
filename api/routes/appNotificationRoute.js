var appNotify = require('../controllers/appNotificationController');  

module.exports = function (app) {
  app.get('/api/notify/all', appNotify.getAllNotification); 
  app.post('/api/notify/update_read', appNotify.updateNotification);
  app.post('/api/notify/save', appNotify.saveNotification);
};