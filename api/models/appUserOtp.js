var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var userOtp = sequelize.define('userOtp', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    mobile_no: DataTypes.STRING,
    otp: DataTypes.STRING,
    expire_time: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'user_otp'
  });

  return userOtp;
};