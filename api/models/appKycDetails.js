var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {
    var appKycDetails = sequelize.define('appKycDetails', {
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
      adhaar_no: DataTypes.STRING,
      client_id:DataTypes.STRING,
      reg_mob_no:DataTypes.STRING,
      adhaar_status:DataTypes.INTEGER,
      adhaar_front_image: DataTypes.JSON,
      adhaar_back_image: DataTypes.JSON, 
      pan_no: DataTypes.STRING,
      pan_status: DataTypes.INTEGER,
      pan_card_image: DataTypes.JSON,
      selfee_image: DataTypes.JSON,
      status: DataTypes.BOOLEAN,
      full_fill: DataTypes.DOUBLE, 
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE, 
      deleted_at: DataTypes.DATE,
    }, {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + 'kyc_details'
    });
  
    return appKycDetails;
  };