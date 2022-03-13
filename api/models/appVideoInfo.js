var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {
    var appVideoInfo = sequelize.define('appVideoInfo', {
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
      selfie_video: DataTypes.JSON,
      status: DataTypes.BOOLEAN,
      full_fill: DataTypes.DOUBLE, 
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE, 
      deleted_at: DataTypes.DATE,
    }, {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + 'video_info'
    });
    return appVideoInfo;
  };