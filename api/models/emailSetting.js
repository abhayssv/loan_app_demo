var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var emailSettings = sequelize.define('emailSettings', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email_type: DataTypes.STRING,
    email_name: DataTypes.STRING,
    active: DataTypes.INTEGER,
    updated_at: DataTypes.DATE
  },{
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'email_settings'
  });

  return emailSettings;
};