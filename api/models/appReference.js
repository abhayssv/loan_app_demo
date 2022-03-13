var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {
    var appReference = sequelize.define('appReference', {
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
      rel_first: DataTypes.STRING,
      number_first: DataTypes.STRING,
      rel_second: DataTypes.STRING,
      number_second: DataTypes.STRING,
      rel_third: DataTypes.STRING,
      number_third: DataTypes.STRING,
      rel_foruth: DataTypes.STRING,
      number_fourth: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      full_fill: DataTypes.DOUBLE, 
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE
    }, {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + 'reference_details'
    }); 
    return appReference;
};