var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {
    var appCollegeDetails = sequelize.define('appCollegeDetails', {
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
      college_name: DataTypes.STRING,
      college_address: DataTypes.STRING,
      qualification: DataTypes.STRING,
      college_id_image: DataTypes.JSON,
      reason_of_loan: DataTypes.STRING, 
      status: DataTypes.BOOLEAN,
      full_fill: DataTypes.DOUBLE, 
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE
    }, {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + 'college_details'
    });
  
    return appCollegeDetails;
};