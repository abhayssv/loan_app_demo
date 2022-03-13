var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {
    var appBasicInfo = sequelize.define('appBasicInfo', {
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
      username: DataTypes.STRING,
      gender: DataTypes.INTEGER,
      date_of_birth: DataTypes.STRING,
      marital_status: DataTypes.INTEGER,
      highest_qualification: DataTypes.STRING,
      mother_name: DataTypes.STRING,
      father_name: DataTypes.STRING,
      watsapp_num: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      full_fill: DataTypes.DOUBLE,
      permanent_address: DataTypes.STRING,
      current_address: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE, 
    }, {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + 'basic_information'
    });
  
    return appBasicInfo;
  };