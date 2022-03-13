var generalConfig = require('../config/generalConfig');
const Sequalize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    var addReminder = sequelize.define('addReminder', {
       id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      loan_id: DataTypes.INTEGER,
      choose_date: DataTypes.DATE,
      description: DataTypes.STRING,
      updated_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
      status:DataTypes.INTEGER
    }, {
      freezeTableName: true,
      tableName: generalConfig.table_prefix + 'add_reminder'
    });
  
    return addReminder;
};