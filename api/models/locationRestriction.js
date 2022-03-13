var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var locationRestriction = sequelize.define('locationRestriction', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    state: DataTypes.STRING, 
    city: DataTypes.STRING, 
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'location_restriction'
  });

  return locationRestriction;
};