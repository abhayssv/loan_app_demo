var generalConfig = require('../config/generalConfig');
const Sequalize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    var appEmpInfo = sequelize.define('appEmpInfo', {
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
      company_name: DataTypes.STRING,
      industry_type: DataTypes.STRING,
      office_address: DataTypes.STRING,
      pin_code: DataTypes.INTEGER,
      monthly_take_home: DataTypes.INTEGER,
      designation: DataTypes.STRING,
      date_of_join: DataTypes.STRING,
      reason_for_loan: DataTypes.STRING,
      full_fill: DataTypes.INTEGER,
      employment_proof: DataTypes.JSON,
      sal_slip_first: DataTypes.JSON,
      sal_slip_second: DataTypes.JSON,
      sal_slip_third: DataTypes.JSON,
      status: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE, 
      deleted_at: DataTypes.DATE
    }, {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + 'employement_info'
    });
  
    return appEmpInfo;
  };