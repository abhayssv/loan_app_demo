var adminSubCategory = require('../controllers/adminSubCategoryController');  

module.exports = function (app) {
  app.get('/api/subcategory/all', adminSubCategory.getAllSubCategory); 
  app.get('/api/subcategory/:id', adminSubCategory.getSubCategoryById);
  app.get('/api/allSubCategory/:id', adminSubCategory.getAllSubCategoryByCatId);
  app.get('/api/get_roles', adminSubCategory.getRoles);
  app.post('/api/subcategory/save_subcategory', adminSubCategory.saveSubCategory);
  app.post('/api/subcategory/delete', adminSubCategory.deleteSubCategory);
};