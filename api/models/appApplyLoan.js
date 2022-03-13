var generalConfig = require("../config/generalConfig");
module.exports = function (sequelize, DataTypes) {

  var appApplyLoan = sequelize.define('appApplyLoan', {
    loan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true 
    },
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
    status: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
    }, 
    transfer_id:DataTypes.STRING,
    required_amount: DataTypes.INTEGER, 
    disbursed_amount: DataTypes.INTEGER, 
    deduct_penality:DataTypes.INTEGER,
    partial_amount:DataTypes.INTEGER,
    apply_date: DataTypes.STRING,
    disbursed_date: DataTypes.STRING, 
    days: DataTypes.INTEGER, 
    status: DataTypes.INTEGER,  
    total_payable_amount: DataTypes.INTEGER,
    remaining_amount:DataTypes.DOUBLE,
    redeem_coins: DataTypes.INTEGER,
    payable_date: DataTypes.STRING,
    customer_care: DataTypes.INTEGER,
    reviewer_1: DataTypes.STRING,
    reviewer_2: DataTypes.STRING,
    s1:DataTypes.INTEGER,
    s2:DataTypes.INTEGER,
    s3:DataTypes.INTEGER,
    m1:DataTypes.INTEGER,
    m2:DataTypes.INTEGER,
    collection_manager:DataTypes.INTEGER,
    reason_to_reject: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: generalConfig.table_prefix + 'apply_loan',
    classMethods: {
      associate: function (models) {
        appApplyLoan.belongsTo(models.appUser, {
          foreignKey: 'user_id'
        }); 
        appApplyLoan.hasMany(models.appPayment, {
           foreignKey: 'loan_id'
        });
        appApplyLoan.hasMany(models.appBusinessPayment, {
          foreignKey: 'loan_id'
        });
        appApplyLoan.hasMany(models.loanRemark, {
          foreignKey: 'loan_id'
        });
        models.loanRemark.belongsTo(models.user, {
          as: 'userId', foreignKey: 'user_id', targetKey: 'id' 
        }); 
        appApplyLoan.belongsTo(models.appBasicInfo, {
          foreignKey: 'user_id'
        }); 
         appApplyLoan.belongsTo(models.appKycDetails, {
          foreignKey: 'user_id'
        }); 
        appApplyLoan.belongsTo(models.appBankInfo, {
           foreignKey: 'user_id'
         }),
        appApplyLoan.belongsTo(models.appReference, {
          foreignKey: 'user_id'
        })
        appApplyLoan.belongsTo(models.appCollegeDetails, {
          foreignKey: 'user_id'
        })
        appApplyLoan.belongsTo(models.appEmpInfo, {
          foreignKey: 'user_id'
        })
        appApplyLoan.belongsTo(models.appBusinessDetails, {
          foreignKey: 'user_id'
        })
        appApplyLoan.belongsTo(models.user, { 
          as: 'appUserReviewer_1', foreignKey: 'reviewer_1',targetKey: 'id'
        })
        appApplyLoan.belongsTo(models.user, { 
          as: 'appUserReviewer_2', foreignKey: 'reviewer_2',targetKey: 'id'
        })
        appApplyLoan.belongsTo(models.loanStatus, { 
          foreignKey: 'status',targetKey: 'status_id'
        })
        appApplyLoan.belongsTo(models.user, { 
          as: 'customerCare', foreignKey: 'customer_care',targetKey: 'id'
        })
        appApplyLoan.belongsTo(models.user, { 
          as: 'S1', foreignKey: 's1',targetKey: 'id'
        })
        appApplyLoan.belongsTo(models.user, { 
          as: 'S2',foreignKey: 's2',targetKey: 'id'
        })
        appApplyLoan.belongsTo(models.user, { 
          as: 'S3', foreignKey: 's3',targetKey: 'id'
        })
        appApplyLoan.belongsTo(models.user, { 
          as: 'M1', foreignKey: 'm1',targetKey: 'id'
        })
        appApplyLoan.belongsTo(models.user, { 
          as: 'M2', foreignKey: 'm2',targetKey: 'id'
        })
        appApplyLoan.belongsTo(models.user, { 
          as: 'collectionManager', foreignKey: 'collection_manager',targetKey: 'id'
        })
      }
    }
  });

  return appApplyLoan;
};