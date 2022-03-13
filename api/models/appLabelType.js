var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appLabelType = sequelize.define('appLabelType', {
    label_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, 
    },
    label: DataTypes.STRING,
    user_type: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'label_type',
    classMethods: {
      associate: function (models) {
        appLabelType.belongsTo(models.appManageLabelType, {
          foreignKey: 'label_id'
        })
      }
    }
  });

  return appLabelType;
};