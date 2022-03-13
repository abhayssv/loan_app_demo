var category = require('../controllers/userCategoryController');  

module.exports = function (app) {
  app.get('/api/category/all', category.getAllCategory); 
  app.get('/api/category/:id', category.getCategoryById);
  app.post('/api/category/save_category', category.saveCategory);
  app.post('/api/category/delete', category.deleteCategory);
};