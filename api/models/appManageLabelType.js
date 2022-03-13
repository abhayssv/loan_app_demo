var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appManageLabelType = sequelize.define('appManageLabelType', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    label_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    user_id: DataTypes.INTEGER,
    percentage:DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'manage_label_type'
  });

  return appManageLabelType;
};