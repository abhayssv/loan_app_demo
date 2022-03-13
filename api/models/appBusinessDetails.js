var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {
    var appBusinessDetails = sequelize.define('appBusinessDetails', {
      user_id: {
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
      agree_full_name: DataTypes.STRING,
      agree_shop_name: DataTypes.STRING,
      daily_income: DataTypes.STRING,
      shop_address: DataTypes.STRING,
      required_amount: DataTypes.STRING, 
      days: DataTypes.STRING,
      reason_for_loan: DataTypes.STRING, 
      shop_image: DataTypes.JSON,
      shop_agree_image: DataTypes.JSON,
      cheque_leaf_image: DataTypes.JSON,
      bank_statement_image: DataTypes.JSON,
      status: DataTypes.BOOLEAN,
      full_fill: DataTypes.DOUBLE, 
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE
    }, {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + 'business_details'
    });
  
    return appBusinessDetails;
};