var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appInterestPenality = sequelize.define('appInterestPenality', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    days: DataTypes.INTEGER,
    processing_fee: DataTypes.DOUBLE,
    interest: DataTypes.DOUBLE, 
    gst: DataTypes.DOUBLE, 
    penality: DataTypes.DOUBLE,  
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'interest_n_penalty'
  });

  return appInterestPenality;
};