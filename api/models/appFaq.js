var generalConfig = require('../config/generalConfig');
module.exports = function (sequelize, DataTypes) {

  var appFaq = sequelize.define('appFaq', {
    faq_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    slug: DataTypes.STRING,
    question: DataTypes.STRING, 
    answer: DataTypes.STRING, 
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'faq'
  });

  return appFaq;
};