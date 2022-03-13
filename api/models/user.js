var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    has_role: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, 
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    reset_password_token:DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    profile_image: DataTypes.JSON,
    mobile_no: DataTypes.STRING,
    user_type: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    contact_per: DataTypes.BOOLEAN,
    // has_role: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'users',
    classMethods: {
      associate: function (models) {
        user.belongsTo(models.adminSubCategory, { 
          foreignKey: 'has_role', targetKey: 'id'
        }); 
        user.belongsTo(models.appApplyLoan, { 
          foreignKey: 'id', targetKey: 'customer_care'
        });
         
      }
    }
  });

  return user;
};