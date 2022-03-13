var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appPage = sequelize.define('appPage', {
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    slug: DataTypes.STRING,
    title: DataTypes.STRING, 
    description: DataTypes.STRING, 
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'app_pages'
  });

  return appPage;
};