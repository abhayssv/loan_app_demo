var generalConfig = require("../config/generalConfig");
module.exports = function (sequelize, DataTypes) {
  var appPayment = sequelize.define(
    "appPayment",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      loan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      }, 
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      }, 
      payment_detail: DataTypes.JSON,
      tx_date: DataTypes.STRING,
      penality: DataTypes.DOUBLE,
      paid_redeem_coins: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + "app_payments",
      classMethods: {
        associate: function (models) { 
          appPayment.belongsTo(models.appApplyLoan, {
            foreignKey: 'loan_id'
          }); 
          appPayment.belongsTo(models.appUser, {
            foreignKey: 'user_id'
          }); 
          appPayment.belongsTo(models.appKycDetails, {
            foreignKey: 'user_id'
          }); 
        }
      }
    }
  );

  return appPayment;
};
