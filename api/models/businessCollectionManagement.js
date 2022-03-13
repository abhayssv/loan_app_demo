var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {
  var businessCollectionManagement = sequelize.define(
    'businessCollectionManagement',
    {
      role_id: DataTypes.INTEGER,
      min_days: DataTypes.INTEGER,
      max_days: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + 'business_collection_management'
    }
  );

  return businessCollectionManagement;
};
