'use strict';

var user = require('../controllers/profileController'); 
var upload = require('../lib/multerAdminProfileUpload');

var multerware = upload.fields([  
    { name: 'profile_image', maxCount: 1} 
])

module.exports = function(app) {
    app.get('/admin/profile/', user.getProfile);
    app.post('/admin/profile', multerware, user.updateProfile);
    // app.post('/admin/profile', user.updateProfile);
};