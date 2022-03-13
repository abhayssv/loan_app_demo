var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var loanRemark = sequelize.define('loanRemark', {
    loan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true 
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    user_type: DataTypes.INTEGER, 
    remarks: DataTypes.JSON,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'loan_remarks',
    classMethods: {
      associate: function (models) {
        loanRemark.belongsTo(models.user, {
          foreignKey: 'user_id',
          targetKey: 'id'
        }); 
      }
    }
  });

  return loanRemark;
};