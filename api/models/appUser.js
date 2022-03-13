var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appUser = sequelize.define('appUser', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile_no: DataTypes.STRING,
    beneficiary_id: DataTypes.STRING,
    imei: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    is_restrict: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    user_type: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    ref_code: DataTypes.STRING,
    use_ref_code: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'app_users',
    classMethods: {
      associate: function (models) { 
        appUser.belongsTo(models.appCredit, {
          foreignKey: 'user_id'
        });  
        appUser.belongsTo(models.appKycDetails, {
          foreignKey: 'user_id'
       });   
      }, 
    }
  });

  return appUser;
};