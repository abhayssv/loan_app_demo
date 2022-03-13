var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appUserContact = sequelize.define('appUserContact', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    name: DataTypes.STRING,
    mobile_no: DataTypes.STRING,
    email: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'contacts'
  });

  return appUserContact;
};