var generalConfig = require("../config/generalConfig");
module.exports = function (sequelize, DataTypes) {
  var appBusinessPayment = sequelize.define(
    "appBusinessPayment",
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
      penality: DataTypes.DOUBLE,
      paid_redeem_coins: DataTypes.INTEGER,
      type: DataTypes.STRING,
      tx_msg:DataTypes.STRING,
      tx_time:DataTypes.STRING,
      order_id:DataTypes.STRING,
      tx_status:DataTypes.STRING,
      signature:DataTypes.STRING,
      order_amount:DataTypes.STRING,
      payment_mode:DataTypes.STRING,
      reference_id:DataTypes.STRING, 
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + "app_business_payments",
      classMethods: {
        associate: function (models) { 
          appBusinessPayment.belongsTo(models.appApplyLoan, {
            foreignKey: 'loan_id'
          }); 
          appBusinessPayment.belongsTo(models.appUser, {
            foreignKey: 'user_id'
          }); 
          appBusinessPayment.belongsTo(models.appKycDetails, {
            foreignKey: 'user_id'
          }); 
        }
      }
    }
  );

  return appBusinessPayment;
};
