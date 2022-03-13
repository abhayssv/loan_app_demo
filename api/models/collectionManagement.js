var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {
  var collectionManagement = sequelize.define(
    'collectionManagement',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      role_id: DataTypes.INTEGER,
      min_days: DataTypes.INTEGER,
      max_days: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE
    },
    {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + 'collection_management',
    }
  );

  return collectionManagement;
};
