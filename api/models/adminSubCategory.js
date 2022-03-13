var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var adminSubCategory = sequelize.define('adminSubCategory', {
    user_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }, 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING, 
    permission: DataTypes.JSON, 
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'users_sub_category',
    classMethods: {
      associate: function (models) {
        adminSubCategory.belongsTo(models.userCategory, {
          foreignKey: 'user_type'
        }); 
      }
    }
  });

  return adminSubCategory;
};