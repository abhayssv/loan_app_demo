'use strict';

var appUserContact = require('../controllers/appUserContactController');

module.exports = function (app) {
  app.get('/apis/contact/all', appUserContact.getAllUsers);
  app.get('/apis/contact/:user_id', appUserContact.getContactByUserId);
  app.post('/apis/contact/save', appUserContact.saveappUserContact);
  app.post('/apis/contact/save/all', appUserContact.saveallAppUserContact);
};
