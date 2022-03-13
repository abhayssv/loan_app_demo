'use strict'; 
var appUserVideo = require('../controllers/appUserVideoController');
var upload = require('../lib/multerVideoProofUpload');

var multerware = upload.fields([ 
  { name: 'selfie_video', maxCount: 1}
])


module.exports = function (app) {
  app.get('/apis/video/video_info', appUserVideo.getUserVideo); 
  app.post('/apis/video/upload_video', multerware, appUserVideo.uploadUserVideo);
  app.get('/apis/video/:id', appUserVideo.getUserVideoAdmin);
};