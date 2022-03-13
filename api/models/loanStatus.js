var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var loanStatus = sequelize.define('loanStatus', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true 
    }, 
    status: DataTypes.STRING, 
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'loan_status'
  });

  return loanStatus;
};