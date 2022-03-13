var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var payLink = sequelize.define('payLink', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    loan_id: DataTypes.INTEGER,
    link_id: DataTypes.STRING, 
    created_at: DataTypes.DATE,
    status:DataTypes.STRING,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'pay_link'
  });

  return payLink;
};