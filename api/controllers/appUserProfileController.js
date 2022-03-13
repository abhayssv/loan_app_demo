'use strict';
var db = require('../config/sequelize').db; 
var _ = require('lodash');
var generalConfig = require('../config/generalConfig');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync'); 
const jwt_decode = require('jwt-decode');
var commonLib = require('../lib/common');
var ifsc = require('ifsc-finder');
const Cryptr = require('cryptr'); 
const cryptr = new Cryptr(generalConfig.saltKey); 
const fetch = require('node-fetch');
const { ADHAAR_API_BEARER_TOKEN } = process.env;
 
// APP API Start ........................

// Get FULL FILL API for App
exports.getFullFillCount = catchAsync(async (req, res, next) => {   
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;
  var user_type = decoded.user_type;
  if(user_type === 0){
    //For Student Type all Table: vizzve_basic_info, vizzve_bank_details, vizzve_college_details, vizzve_kyc_details, vizzve_reference_details
    const basicInfo = await db.models.appBasicInfo.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(basicInfo){ var basicInfoCount = basicInfo.full_fill;  } else{ var basicInfoCount = 0; }
    const bankInfo = await db.models.appBankInfo.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(bankInfo){ var bankInfoCount = bankInfo.full_fill;  } else{ var bankInfoCount = 0; }
    const collegeDetails = await db.models.appCollegeDetails.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(collegeDetails){ var collegeDetailsCount = collegeDetails.full_fill;  } else{ var collegeDetailsCount = 0; }
    const kycDetails = await db.models.appKycDetails.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(kycDetails){ var kycDetailsCount = kycDetails.full_fill;  } else{ var kycDetailsCount = 0; }
    const reference = await db.models.appReference.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(reference){ var referenceCount = reference.full_fill;  } else{ var referenceCount = 0; }
    var total_full_fill_count = basicInfoCount + bankInfoCount + collegeDetailsCount + kycDetailsCount + referenceCount;
    var total_full_fill_count = parseFloat(total_full_fill_count.toFixed(1))
    if (!total_full_fill_count) return next(new AppError('Not Found', 404))
    res.json({ message: 'Student Full Fill Count Found', error: false, data: total_full_fill_count });
  }else if(user_type === 1){
    //For Employee Type all Table: vizzve_basic_info, vizzve_bank_details, vizzve_imployment_info, vizzve_kyc_details, vizzve_reference_details
    const basicInfo = await db.models.appBasicInfo.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(basicInfo){ var basicInfoCount = basicInfo.full_fill;  } else{ var basicInfoCount = 0; }
    const bankInfo = await db.models.appBankInfo.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(bankInfo){ var bankInfoCount = bankInfo.full_fill;  } else{ var bankInfoCount = 0; }
    const empInfo = await db.models.appEmpInfo.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(empInfo){ var empInfoCount = empInfo.full_fill;  } else{ var empInfoCount = 0; }
    const kycDetails = await db.models.appKycDetails.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(kycDetails){ var kycDetailsCount = kycDetails.full_fill;  } else{ var kycDetailsCount = 0; }
    const reference = await db.models.appReference.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(reference){ var referenceCount = reference.full_fill;  } else{ var referenceCount = 0; }
    var total_full_fill_count = basicInfoCount + bankInfoCount + empInfoCount + kycDetailsCount + referenceCount;
    var total_full_fill_count = parseFloat(total_full_fill_count.toFixed(1))
    if (!total_full_fill_count) return next(new AppError('Not Found', 404))
    res.json({ message: 'Employee Full Fill Count Found', error: false, data: total_full_fill_count });
  }else{
    //For Self Employee Type all Table: vizzve_basic_info, vizzve_bank_details, vizzve_business_info, vizzve_kyc_details, vizzve_reference_details
    const basicInfo = await db.models.appBasicInfo.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(basicInfo){ var basicInfoCount = basicInfo.full_fill;  } else{ var basicInfoCount = 0; }
    const bankInfo = await db.models.appBankInfo.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(bankInfo){ var bankInfoCount = bankInfo.full_fill;  } else{ var bankInfoCount = 0; }
    const businessDetails = await db.models.appBusinessDetails.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(businessDetails){ var businessDetailsCount = businessDetails.full_fill;  } else{ var businessDetailsCount = 0; }
    const kycDetails = await db.models.appKycDetails.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(kycDetails){ var kycDetailsCount = kycDetails.full_fill;  } else{ var kycDetailsCount = 0; }
    const reference = await db.models.appReference.findOne({attributes: ['full_fill'], where: { deleted_at: null, user_id }}) 
    if(reference){ var referenceCount = reference.full_fill;  } else{ var referenceCount = 0; }
    var total_full_fill_count = basicInfoCount + bankInfoCount + businessDetailsCount + kycDetailsCount + referenceCount;
    var total_full_fill_count = parseFloat(total_full_fill_count.toFixed(1))  
    if (!total_full_fill_count) return next(new AppError('Not Found', 404))
    res.json({ message: 'Self Employee Full Fill Count Found', error: false, data: total_full_fill_count });
  } 
}); 

// Save Basic Information API for App... 
 
exports.saveBasicInfo = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id; 
    const {username, gender, date_of_birth, marital_status, highest_qualification, mother_name, father_name, watsapp_num, permanent_address, current_address} = req.body;
    const basicInfo = await db.models.appBasicInfo.findOne({
        attributes: ['id', 'user_id', 'username', 'gender', 'date_of_birth', 'marital_status', 'highest_qualification', 'mother_name', 'father_name', 'watsapp_num', 'status', 'full_fill', 'permanent_address', 'current_address'],
        where: { 
        user_id
        }
    })   
    if (basicInfo) {
        var full_fill = (permanent_address == null && current_address == null || permanent_address == "" && current_address == "" ? 0.5 : 1.0);
        const update = await db.models.appBasicInfo.update({
        username, gender, date_of_birth, marital_status, highest_qualification, mother_name, father_name, watsapp_num,
        status: basicInfo.full_fill == 1.0 ? basicInfo.status : full_fill == 1.0 ? 1 : 0,
        full_fill, permanent_address, current_address,
        }, {
        where: {
            user_id
        }
        })
        if (!update) return next(new AppError('Not Found', 404))
        res.json({ message: 'Basic Information Update sucessfully', error: false, data: update });
    } else {
        const create = await db.models.appBasicInfo.create({
        user_id, username, gender, date_of_birth, marital_status, highest_qualification, mother_name, father_name, watsapp_num, full_fill : 0.5,
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'Users create sucessfully', error: false, data: create });
    }
});

// Get Basic information for App by user id...

exports.getbasicInfoById = catchAsync(async (req, res, next) => {    
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id; 
    const basicInfo = await db.models.appBasicInfo.findOne({
    attributes: ['id', 'user_id', 'username', 'gender', 'date_of_birth', 'marital_status', 'highest_qualification', 'mother_name', 'father_name', 'watsapp_num', 'status', 'full_fill', 'permanent_address', 'current_address'],
    where: {
      user_id,
    }
  }) 
  if (!basicInfo) return next(new AppError('Not Found', 404))
  res.json({ message: 'Basic Info Found', error: false, data: basicInfo });
});

// Save Employement Info API for App....

exports.saveEmpInfo = catchAsync(async (req, res, next) => { 
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    const { company_name, industry_type, office_address, pin_code, monthly_take_home, designation, date_of_join, reason_for_loan} = req.body;
    var full_fill = 0.6;
    const empInfo = await db.models.appEmpInfo.findOne({ 
        where: { 
        user_id
        }
    })   
    if (empInfo) { 
      var update = await db.models.appEmpInfo.update({
          company_name, industry_type, office_address, pin_code, monthly_take_home, designation, date_of_join, reason_for_loan,
      }, {
          where: {
              user_id
          }
      })
      if (!update) return next(new AppError('Not Found', 404))
      res.json({ message: 'Employement Information Update sucessfully', error: false, data: update });
    } else {
        const create = await db.models.appEmpInfo.create({
        user_id, company_name, industry_type, office_address, pin_code, monthly_take_home, designation, date_of_join, reason_for_loan, full_fill,
        })
        if (!create) return next(new AppError('Not Found', 404))
        res.json({ message: 'Employement create sucessfully', error: false, data: create });
    }
});

// Upload Employment Information Document of App User...

exports.uploadEmpDecx = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);
  var user_id = decoded.id;
  const {employment_proof} = req.files;
  const emp_proof = employment_proof.map(value => value.filename);
  const empInfo = await db.models.appEmpInfo.findOne({
  attributes: [ 'employment_proof', 'sal_slip_first', 'sal_slip_second', 'sal_slip_third', 'full_fill'],
  where: {
  user_id
  }
  })
  if (empInfo) {
    if(empInfo.employment_proof != null){
      const empProof = {"employment_proof": empInfo.employment_proof}
      commonLib.removeEmpInfoImages(empProof);
    }  
    if(empInfo.sal_slip_first === null && empInfo.sal_slip_second === null && empInfo.sal_slip_third === null ){
      var full_fill = 0.7;
    } else if(empInfo.sal_slip_first != null && empInfo.sal_slip_second === null && empInfo.sal_slip_third === null){
      var full_fill = 0.8;
    } else if(empInfo.sal_slip_first === null && empInfo.sal_slip_second != null && empInfo.sal_slip_third === null){
      var full_fill = 0.8;
    } else if(empInfo.sal_slip_first === null && empInfo.sal_slip_second === null && empInfo.sal_slip_third != null){
      var full_fill = 0.8;
    } else if(empInfo.sal_slip_first === null && empInfo.sal_slip_second != null && empInfo.sal_slip_third != null){
      var full_fill = 0.9;
    } else if(empInfo.sal_slip_first != null && empInfo.sal_slip_second === null && empInfo.sal_slip_third != null){
      var full_fill = 0.9;
    } else if(empInfo.sal_slip_first != null && empInfo.sal_slip_second != null && empInfo.sal_slip_third === null){
      var full_fill = 0.9;
    } else{
      var full_fill = 1.0;
    }
  var update = await db.models.appEmpInfo.update({
  employment_proof: emp_proof, full_fill: full_fill, status: empInfo.full_fill == 1.0 ? empInfo.status : full_fill == 1.0 ? 1 : 0,
  }, {
  where: {
  user_id
  }
  })
  if (!update) return next(new AppError('Not Found', 404))
  res.json({ message: 'Employement Proof Update Sucessfully', error: false, data: update });
  }
})
  
exports.uploadSalSlip = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);
    var user_id = decoded.id; 
    
    if(req.files){
      if(req.files.salary_slip_first){ 
        var sal_slip_first = req.files.salary_slip_first.map(value => value.filename);
      }
      if(req.files.salary_slip_second){ 
        var sal_slip_second = req.files.salary_slip_second.map(value => value.filename);
      }
      if(req.files.salary_slip_third){ 
        var sal_slip_third = req.files.salary_slip_third.map(value => value.filename);
      } 
    }
    const empInfo = await db.models.appEmpInfo.findOne({
    attributes: [ 'employment_proof', 'sal_slip_first', 'sal_slip_second', 'sal_slip_third', 'full_fill'],
    where: {
    user_id
    }
    })
    if (empInfo) {
      if(req.files.salary_slip_first){
        if(empInfo.sal_slip_first != null){
          const salImgFirst = {"sal_slip_first": empInfo.sal_slip_first}
          commonLib.removeEmpInfoImages(salImgFirst);
        }
        if(empInfo.sal_slip_second === null && empInfo.sal_slip_third === null && empInfo.employment_proof === null ){
          var full_fill = 0.7;
        } else if(empInfo.sal_slip_second != null && empInfo.sal_slip_third === null && empInfo.employment_proof === null){
          var full_fill = 0.8;
        } else if(empInfo.sal_slip_second === null && empInfo.sal_slip_third != null && empInfo.employment_proof === null){
          var full_fill = 0.8;
        } else if(empInfo.sal_slip_second === null && empInfo.sal_slip_third === null && empInfo.employment_proof != null){
          var full_fill = 0.8;
        } else if(empInfo.sal_slip_second === null && empInfo.sal_slip_third != null && empInfo.employment_proof != null){
          var full_fill = 0.9;
        } else if(empInfo.sal_slip_second != null && empInfo.sal_slip_third === null && empInfo.employment_proof != null){
          var full_fill = 0.9;
        } else if(empInfo.sal_slip_second != null && empInfo.sal_slip_third != null && empInfo.employment_proof === null){
          var full_fill = 0.9;
        } else{
          var full_fill = 1.0;
        }
        var update = await db.models.appEmpInfo.update({
          sal_slip_first: sal_slip_first, full_fill: full_fill, status: empInfo.full_fill == 1.0 ? empInfo.status : full_fill == 1.0 ? 1 : 0,
        }, {
        where: {
        user_id
        }
        })
        if (!update) return next(new AppError('Not Found', 404))
          res.json({ message: 'First Salary Slip Update Sucessfully', error: false, data: update });
      } 
      else if(req.files.salary_slip_second){
        if(empInfo.sal_slip_second != null){
          const salImgSecond = {"sal_slip_second": empInfo.sal_slip_second }
          commonLib.removeEmpInfoImages(salImgSecond);
        }
        if(empInfo.sal_slip_first === null && empInfo.sal_slip_third === null && empInfo.employment_proof === null ){
          var full_fill = 0.7;
        } else if(empInfo.sal_slip_first != null && empInfo.sal_slip_third === null && empInfo.employment_proof === null){
          var full_fill = 0.8;
        } else if(empInfo.sal_slip_first === null && empInfo.sal_slip_third != null && empInfo.employment_proof === null){
          var full_fill = 0.8;
        } else if(empInfo.sal_slip_first === null && empInfo.sal_slip_third === null && empInfo.employment_proof != null){
          var full_fill = 0.8;
        } else if(empInfo.sal_slip_first === null && empInfo.sal_slip_third != null && empInfo.employment_proof != null){
          var full_fill = 0.9;
        } else if(empInfo.sal_slip_first != null && empInfo.sal_slip_third === null && empInfo.employment_proof != null){
          var full_fill = 0.9;
        } else if(empInfo.sal_slip_first != null && empInfo.sal_slip_third != null && empInfo.employment_proof === null){
          var full_fill = 0.9;
        } else{
          var full_fill = 1.0;
        }
        var update = await db.models.appEmpInfo.update({
          sal_slip_second: sal_slip_second, full_fill: full_fill, status: empInfo.full_fill == 1.0 ? empInfo.status : full_fill == 1.0 ? 1 : 0,
        }, {
        where: {
        user_id
        }
        })
        if (!update) return next(new AppError('Not Found', 404))
          res.json({ message: 'Second Salary Slip Update Sucessfully', error: false, data: update });
      }
      else {
        if(empInfo.sal_slip_third != null){
          const salImgThird = {"sal_slip_third": empInfo.sal_slip_third }
          commonLib.removeEmpInfoImages(salImgThird);
        }
        if(empInfo.sal_slip_first === null && empInfo.sal_slip_second === null && empInfo.employment_proof === null ){
          var full_fill = 0.7;
        } else if(empInfo.sal_slip_first != null && empInfo.sal_slip_second === null && empInfo.employment_proof === null){
          var full_fill = 0.8;
        } else if(empInfo.sal_slip_first === null && empInfo.sal_slip_second != null && empInfo.employment_proof === null){
          var full_fill = 0.8;
        } else if(empInfo.sal_slip_first === null && empInfo.sal_slip_second === null && empInfo.employment_proof != null){
          var full_fill = 0.8;
        } else if(empInfo.sal_slip_first === null && empInfo.sal_slip_second != null && empInfo.employment_proof != null){
          var full_fill = 0.9;
        } else if(empInfo.sal_slip_first != null && empInfo.sal_slip_second === null && empInfo.employment_proof != null){
          var full_fill = 0.9;
        } else if(empInfo.sal_slip_first != null && empInfo.sal_slip_second != null && empInfo.employment_proof === null){
          var full_fill = 0.9;
        } else{
          var full_fill = 1.0;
        }
        var update = await db.models.appEmpInfo.update({
          sal_slip_third: sal_slip_third, full_fill: full_fill, status: empInfo.full_fill == 1.0 ? empInfo.status : full_fill == 1.0 ? 1 : 0,
        }, {
        where: {
        user_id
        }
        })
        if (!update) return next(new AppError('Not Found', 404))
          res.json({ message: 'Third Salary Slip Update Sucessfully', error: false, data: update });
      }  
    }  
});

// Get Employement Details for App...

exports.getEmpInfoById = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    const emp_info = await db.models.appEmpInfo.findOne({
        attributes: [`id`, `user_id`, `company_name`, `industry_type`, `office_address`, `pin_code`, `monthly_take_home`, `designation`, `date_of_join`, `reason_for_loan`,`employment_proof`, `sal_slip_first`, `sal_slip_second`, `sal_slip_third`, `status`,`full_fill`],
        where: {
            deleted_at: null,
            user_id
        }
    })
        if (!emp_info) return next(new AppError('Not Found', 404))
        res.json({error: false, data: emp_info, message: 'Employment Information found'});
})


// Get Bank Details by IFSC Code

exports.getBankDetailsByIFSC_CODE = catchAsync(async (req, res, next) => {
    const {ifsc_code} = req.body;
    let regExp = "^[A-Z]{4}[0][A-Z0-9]{6}$";
    if(!ifsc_code.match(regExp)) return next(new AppError('Please specify valid IFSC CODE', 422))
    const bank_detail = await ifsc.get(ifsc_code)
    res.json({
        error: false,
        data: bank_detail,
        message: 'Bank Details found'
    });
})

// Save Bank Details of App User.........

exports.saveBankDetails = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id;
    const { bank_name, branch, account_name, account_no, ifsc_code } = req.body; 
    const enc_account_no = cryptr.encrypt(account_no);
    const enc_ifsc_code = cryptr.encrypt(ifsc_code);
    const detail = await db.models.appBankInfo.findOne({
      attributes: [`user_id`, `status`],
      where: {
        user_id,
      }
    }) 
    if (detail) { 
      const updated = await db.models.appBankInfo.update({
        bank_name, branch, account_name,
        account_no: enc_account_no,
        ifsc_code: enc_ifsc_code, full_fill: 1
        }, {
        where: {
            user_id: user_id,
        }
        })
        if (!updated) return next(new AppError('Not Found', 404))
        var update = await db.models.appUser.update({
          beneficiary_id: null,
        }, {
          where: {
            user_id: user_id,
          }
        })
        if (!update) return next(new AppError('Issue in beneficiary update connect with developer', 404));
        res.json({ message: 'Bank details updated successfully', error: false, data: update }); 
    } else {
        const created = await db.models.appBankInfo.create({
        user_id, bank_name, branch, account_name,
        account_no: enc_account_no,
        ifsc_code: enc_ifsc_code, full_fill: 1, status: 1,
        })
        if (!created) return next(new AppError('Not Found', 404))
        res.json({ message: 'Bank details created successfully', error: false, data: created });    
    }
})

// Get Bank Details of App User....

exports.getBankDetailsById = catchAsync(async (req, res, next) => {
    var decoded = jwt_decode(req.headers.authorization);  
    var user_id = decoded.id; 
    const bankDetails = await db.models.appBankInfo.findOne({
      attributes: [`id`, `user_id`, `bank_name`, `branch`, `account_name`, `account_no`, `ifsc_code`, `full_fill`, `status`],
      where: {
        deleted_at: null,
        user_id,
      }
    })
    if (!bankDetails) return next(new AppError('Not Found', 404))
        var account_no = cryptr.decrypt(bankDetails.account_no);
        var ifsc_code = cryptr.decrypt(bankDetails.ifsc_code);
        bankDetails[`account_no`] = account_no;
        bankDetails[`ifsc_code`] = ifsc_code;
        res.json({
          error: false,
          data: bankDetails,
          message: 'Bank Details found'
        });
})

// Save Kyc Details of App User.........

exports.saveKycDetails = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;
  var { adhaar_no, pan_no } = req.body; 
  // var enc_adhaar_no = adhaar_no != null ? cryptr.encrypt(adhaar_no) : null;
  // var enc_pan_no = pan_no != null ? cryptr.encrypt(pan_no) : null;
  var {adhaar_front_image, adhaar_back_image, pan_card_image, selfee_image} = req.files;
    var adhaarFrontImage = adhaar_front_image != null ? adhaar_front_image.map(value => value.filename) : null;
    var adhaarBackImage = adhaar_back_image != null ? adhaar_back_image.map(value => value.filename) : null;
    var panCardImage = pan_card_image != null ? pan_card_image.map(value => value.filename) : null;
    var selfeeImage = selfee_image != null ? selfee_image.map(value => value.filename) : null;
    var detail = await db.models.appKycDetails.findOne({
          attributes: [`adhaar_no`,`adhaar_front_image`,`adhaar_back_image`, `pan_no` ,`pan_card_image`, `selfee_image`, `full_fill`],
          where: {
            user_id,
          }
    }) 
    if(detail){
      if(adhaarFrontImage != null){
        var data;
        if(detail.adhaar_front_image != null){
        const adhaarImages = { "adhaar_front_image": detail.adhaar_front_image}
        commonLib.removeKycDetailImages(adhaarImages);    
        var full_fill = detail.full_fill;
        } else {
          var per = parseFloat(detail.full_fill.toFixed(1)) + 0.2;
          var full_fill = parseFloat(per.toFixed(1));
        }
        var updated = await db.models.appKycDetails.update({
         adhaar_front_image : adhaarFrontImage, full_fill, status: detail.full_fill == 1.0 ? detail.status : full_fill == 1.0 ? 1 : 0,
          }, {
            where: {
              user_id,
              }
        })
        if (!updated) return next(new AppError('Not Found', 404))
        res.json({ message: 'KYC details updated successfully', error: false, data: updated });
      } else if(adhaarBackImage != null){
        var data;
          if(detail.adhaar_back_image != null){
          const adhaarImages = { "adhaar_back_image": detail.adhaar_back_image}
          commonLib.removeKycDetailImages(adhaarImages);    
          var full_fill = detail.full_fill;
              } else {
                var per = parseFloat(detail.full_fill.toFixed(1)) + 0.2;
                var full_fill = parseFloat(per.toFixed(1));
              }
          var updated = await db.models.appKycDetails.update({
            adhaar_back_image : adhaarBackImage, full_fill, status: detail.full_fill == 1.0 ? detail.status : full_fill == 1.0 ? 1 : 0,
            }, {
              where: {
                user_id,
                }
          })
          if (!updated) return next(new AppError('Not Found', 404))
          res.json({ message: 'KYC details updated successfully', error: false, data: updated });
          } else if(panCardImage != null){ 
                if(detail.pan_card_image != null){
                  const panCardImages = { "pan_card_image": detail.pan_card_image}
                  commonLib.removeKycDetailImages(panCardImages);    
                  var full_fill = detail.full_fill;
              } else {
                var per = parseFloat(detail.full_fill.toFixed(1)) + 0.2;
                var full_fill = parseFloat(per.toFixed(1));
              }
                var updated = await db.models.appKycDetails.update({
                  pan_card_image: panCardImage, full_fill, status: detail.full_fill == 1.0 ? detail.status : full_fill == 1.0 ? 1 : 0,
                  }, {
                  where: {
                      user_id: user_id,
                  }
          })
          if (!updated) return next(new AppError('Not Found', 404))
          res.json({ message: 'KYC details updated successfully', error: false, data: updated });
          } else if(selfeeImage != null){
          if(detail.selfee_image != null){
                const selfeeImages = { "selfee_image": detail.selfee_image}
                commonLib.removeKycDetailImages(selfeeImages);    
                var full_fill = detail.full_fill;
              } else {
                var per = parseFloat(detail.full_fill.toFixed(1)) + 0.2;
                var full_fill = parseFloat(per.toFixed(1));
              }
          var updated = await db.models.appKycDetails.update({
            selfee_image : selfeeImage, full_fill, status: detail.full_fill == 1.0 ? detail.status : full_fill == 1.0 ? 1 : 0,
            }, {
              where: {
                user_id,
                }
          })
          if (!updated) return next(new AppError('Not Found', 404))
          res.json({ message: 'KYC details updated successfully', error: false, data: updated });
        } else if(adhaar_no != null && pan_no != null){
          if(detail.adhaar_no != null && detail.pan_no != null){
           var full_fill = detail.full_fill;
              } else {
                var per = parseFloat(detail.full_fill.toFixed(1)) + 0.2;
                var full_fill = parseFloat(per.toFixed(1));
              }
          var updated = await db.models.appKycDetails.update({
            adhaar_no, pan_no, full_fill, status: detail.full_fill == 1.0 ? detail.status : full_fill == 1.0 ? 1 : 0,
            }, {
              where: {
                user_id,
                }
          })
          if (!updated) return next(new AppError('Not Found', 404))
          res.json({ message: 'KYC details updated successfully', error: false, data: updated });
        }
    } else {
     var created = await db.models.appKycDetails.create({
      user_id, adhaar_no, adhaar_front_image : adhaarFrontImage, adhaar_back_image : adhaarBackImage, 
      pan_no, pan_card_image : panCardImage, selfee_image : selfeeImage, full_fill: 0.2
    })
    if (!created) return next(new AppError('Not Found', 404))
    res.json({ message: 'KYC details created successfully', error: false, data: created });
    }
})
 
exports.getAdhaarClientId = catchAsync(async (req, res, next) => {  
  const {adhaarNumber, customer_id} = req.body; 
  let dataObj =
    {
      "id_number":  adhaarNumber
    }
  
  let response;
  try{
    const response1 = await fetch('https://kyc-api.aadhaarkyc.io/api/v1/aadhaar-validation/aadhaar-validation', {
    method: 'POST',
    body: JSON.stringify(dataObj),  
    headers: {
      'Content-Type': 'application/json', 
      "Authorization": `Bearer ${ADHAAR_API_BEARER_TOKEN}`
    } 
   }) 
   const response2 = await response1.json();
   response = await response2; 
   if(response.status_code == 500){
      res.json({
        message: "Aadhaar API server issue.",
        error: true, 
      });
    }else if(response.status_code == 200){
      await saveAdhaarKycDetails(res, customer_id);
    }else{
      res.json({
        message: "Wrong aadhhar number.",
        error: true, 
      });
    } 
   } catch(err){ 
      res.json({
        message: err,
        error: true,
      });
   }  
})

exports.getPANClientId = catchAsync(async (req, res, next) => {  
  const {pan_no, customer_id} = req.body; 
  let dataObj =
    {
      "id_number":  pan_no
    }
  
  let response;
  try{
    const response1 = await fetch('https://kyc-api.aadhaarkyc.io/api/v1/pan/pan', {
    method: 'POST',
    body: JSON.stringify(dataObj),  
    headers: {
      'Content-Type': 'application/json', 
      "Accept": `application/json`,
      "Authorization": `Bearer ${ADHAAR_API_BEARER_TOKEN}`
    } 
   }) 
   const response2 = await response1.json();
   response = await response2; 
   
   if(response.status_code == 500){
      res.json({
        message: "PAN API server issue.",
        error: true, 
      });
    }else if(response.status_code == 200){
      await saveAdhaarKycPANDetails(res, customer_id);
    }else{
      res.json({
        message: "Wrong PAN number.",
        error: true, 
      });
    } 
   } catch(err){ 
      res.json({
        message: err,
        error: true,
      });
   }  
})

// exports.getAdhaarClientId = catchAsync(async (req, res, next) => {  
//   const {adhaarNumber, customer_id} = req.body; 
//   let dataObj = {
//     "type": "aadhaar_validation",
//     "body": {
//       "id_number":  adhaarNumber
//     }
//   } 
//   // console.log("Body", dataObj);
//   let response;
//   try{
//     const response1 = await fetch('https://kyc-api.aadhaarkyc.io/api/v1/async/submit', {
//     method: 'POST',
//     body: JSON.stringify(dataObj),  
//     headers: {
//       'Content-Type': 'application/json', 
//       "Authorization": `Bearer ${ADHAAR_API_BEARER_TOKEN}`
//     } 
//    })
//    const response2 = await response1.json();
//    response = await response2
//    const {data:{client_id}} = response; 
//    await getAdhaarDetails(client_id,res,customer_id);
//    } catch(err){ 
//       res.json({
//         message: err,
//         error: true,
//       });
//    }  
// })
 
// const getAdhaarDetails=async(client_id,res,customer_id)=>{  
//   let response;
//   try{
//     let timer = setInterval(async() => {
//       const response1 = await fetch('https://kyc-api.aadhaarkyc.io/api/v1/async/status/'+ client_id, {
//         method: 'GET',  
//         headers: {
//           'Content-Type': 'application/json', 
//           "Authorization": `Bearer ${ADHAAR_API_BEARER_TOKEN}`
//         } 
//       })
      
//       const response2 = await response1.json(); 
//       // console.log("RES:::", response2);
//       // console.log("Status:::", response2.data.status);
//       if(response2.data.status == "success"){ 
//         // console.log("RESP2:::", response2.data.api_resp);
//         const apiResponse = response2.data.api_resp;
//         // console.log("ApiRES", apiResponse);
//         // console.log("ApiRES1", apiResponse.last_digits);
//         // console.log("ApiRES2", apiResponse.message);
//         // console.log("StatusCode", apiResponse.status_code);
//         if(apiResponse.status_code == 422){
//           res.json({
//             message: "Adhaar number is not valid.",
//             error: true, 
//           });
//         }else{
//           await saveAdhaarKycDetails(response2.data.api_resp, res, customer_id);
//         } 
//         await clearInterval(timer);
//       } else if(response2.data.status == "failed"){
//         await clearInterval(timer);
//         res.json({
//           message: "API Failed. Try Again",
//           error: true, 
//         }); 
//       } 
//     }, 2000);  
//    } catch(err){ 
//       response = err;
//    }  
// }

// Save Adhaar KYC Details

const saveAdhaarKycDetails=async(res, customer_id)=>{  
  const updated = await db.models.appKycDetails.update({
    adhaar_status: 1,
  }, {
  where: {
      user_id: customer_id,
  }
  })
  if (!updated){ 
    return next(new AppError('Not Found', 404))
  }else{
    res.json({ message: 'Adhaar number is valid.', error: false, data: updated});
  }
}

const saveAdhaarKycPANDetails=async(res, customer_id)=>{  
  const updated = await db.models.appKycDetails.update({
    pan_status: 1,
  }, {
  where: {
      user_id: customer_id,
  }
  })
  if (!updated){ 
    return next(new AppError('Not Found', 404))
  }else{
    res.json({ message: 'PAN number is valid.', error: false, data: updated});
  }
}
 
// const saveAdhaarKycDetails=async(adhaarDetail, res, customer_id)=>{ 
//   // console.log("CustomerID4", customer_id);
//   const {client_id, last_digits} = adhaarDetail.data; 
//   const updated = await db.models.appKycDetails.update({
//     client_id: client_id , reg_mob_no:last_digits,
//   }, {
//   where: {
//       user_id: customer_id,
//   }
//   })
//   if (!updated){ 
//     return next(new AppError('Not Found', 404))
//   }else{
//     res.json({ message: 'Adhaar number is valid.', error: false, data: updated, mobileNumber:last_digits });
//   }
// }

// Get KYC Details of App User....

exports.getKycDetailsById = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;
  const kyc_details = await db.models.appKycDetails.findOne({
      attributes: [`id`, `user_id`,`adhaar_no`,`adhaar_front_image`,`adhaar_back_image`, `pan_no` ,`pan_card_image`, `status`, `selfee_image`, `full_fill`],
      where: {
          deleted_at: null,
          user_id
      }
  }) 
  if (JSON.stringify(kyc_details) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  var kycImages = []; 
    commonLib.getKycDetailImage(kyc_details, function () {
      kycImages.push(kyc_details)
    });  
  if (!kycImages) return next(new AppError('Not Found', 404))
  res.json({error: false, data: kycImages, message: 'KYC Details found'});
})


// Save Referance Details of App User.........

exports.saveRefDetails = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;
  const {rel_first, number_first, rel_second, number_second, rel_third, number_third, rel_foruth, number_fourth } = req.body;
  const detail = await db.models.appReference.findOne({
    where: {
      user_id,
    }
  })
  if (detail) {
      const updated = await db.models.appReference.update({
        rel_first, number_first, rel_second, number_second, rel_third, number_third, rel_foruth, number_fourth, full_fill: 1
      }, {
      where: {
          user_id: user_id,
      }
      })
      if (!updated) return next(new AppError('Not Found', 404))
      res.json({ message: 'Reference updated successfully', error: false, data: updated });
  } else {
      const created = await db.models.appReference.create({
      user_id, rel_first, number_first, rel_second, number_second, rel_third, number_third, rel_foruth, number_fourth, status: 1, full_fill: 1
      })
      if (!created) return next(new AppError('Not Found', 404))
      res.json({ message: 'Reference created successfully', error: false, data: created });    
  }
})

//  Get Referance Information API for App User....

exports.getRefDetailsById = catchAsync(async (req, res, next) => {    
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;
  const refDetails = await db.models.appReference.findOne({
  attributes: ['id', 'user_id', 'rel_first', 'number_first', 'rel_second', 'number_second', 'rel_third', 'number_third', 'rel_foruth', 'number_fourth', 'full_fill', 'status'],
  where: {
      user_id,
  }
  })  
  if (!refDetails) return next(new AppError('Not Found', 404))
  res.json({ message: 'Basic Info Found', error: false, data: refDetails });
}); 

// Save College Details API for App..............

exports.saveCollegeDetails = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id; 
  const {college_name, college_address, qualification, reason_of_loan } = req.body; 
  var detail = await db.models.appCollegeDetails.findOne({
    attributes: [`college_name`, `status`,`full_fill`],
    where: {
      user_id,
    }
  })
  
  if (detail) { 
      if(detail.full_fill != 1.0){
        var per = parseFloat(detail.full_fill.toFixed(1)) + 0.8;
        var full_fill = parseFloat(per.toFixed(1));
      } else {
        var full_fill = detail.full_fill;
      }
      const updated = await db.models.appCollegeDetails.update({
      college_name, college_address, qualification, reason_of_loan, full_fill : full_fill, status: detail.full_fill == 1.0 ? detail.status : full_fill == 1.0 ? 1 : 0,
      }, {
      where: {
        user_id: user_id,
      }
      })
      
      if (!updated) return next(new AppError('Not Found', 404))
      res.json({ message: 'College Details updated successfully', error: false, data: updated });
  } else {
      const created = await db.models.appCollegeDetails.create({
      user_id, college_name, college_address, qualification, reason_of_loan, full_fill : 0.8,
      })
      if (!created) return next(new AppError('Not Found', 404))
      res.json({ message: 'College Details created successfully', error: false, data: created });    
  }
})

exports.uploadCollegeId = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id; 
  const {college_id_image} = req.files; 
  var collegeIdImage = college_id_image != null ? college_id_image.map(value => value.filename) : null;
  var detail = await db.models.appCollegeDetails.findOne({
    attributes: [`college_id_image`, `full_fill`],
    where: {
      user_id,
    }
  })
  if (detail) {
      if(detail.college_id_image != null){ 
        commonLib.removeCollegeDetailImages(detail.college_id_image);    
        var full_fill = detail.full_fill;
      } else {
        var per = parseFloat(detail.full_fill.toFixed(1)) + 0.2;
        var full_fill = parseFloat(per.toFixed(1));
      }
      const updated = await db.models.appCollegeDetails.update({
      college_id_image : collegeIdImage, full_fill : full_fill, status: detail.full_fill == 1.0 ? detail.status : full_fill == 1.0 ? 1 : 0,
      }, {
      where: {
        user_id: user_id,
      }
      })
      if (!updated) return next(new AppError('Not Found', 404))
      res.json({ message: 'College Details updated successfully', error: false, data: updated });
  } else {
      const created = await db.models.appCollegeDetails.create({
      user_id, college_id_image : collegeIdImage, full_fill : 0.2
      })
      if (!created) return next(new AppError('Not Found', 404))
      res.json({ message: 'College Details created successfully', error: false, data: created });    
  }
})

exports.getCollegeDetailsById = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;
  const college_details = await db.models.appCollegeDetails.findOne({
      attributes: [`id`, `user_id`,`college_name`,`college_address`,`qualification`, `reason_of_loan` ,`college_id_image`, `status`, `full_fill`],
      where: {
          deleted_at: null,
          user_id
      }
  }) 
  if (JSON.stringify(college_details) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  var collegeImages = []; 
    commonLib.getCollegeDetailImage(college_details, function () {
      collegeImages.push(college_details)
    }); 
  if (!collegeImages) return next(new AppError('Not Found', 404))
  res.json({error: false, data: collegeImages, message: 'College Details found'});
})    

// Save Business Details API for App..............

exports.saveBusinessDetails = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id; 
  if(req.files){
    if(req.files.shop_image){ 
    var shopImage = req.files.shop_image.map(value => value.filename);
    }
    if(req.files.shop_agree_image){ 
      var shopAgreeImage = req.files.shop_agree_image.map(value => value.filename);
    }
    if(req.files.cheque_leaf_image){ 
      var chequeLeafImage = req.files.cheque_leaf_image.map(value => value.filename);
    }
    if(req.files.bank_statement_image){ 
      var bankStatementImage = req.files.bank_statement_image.map(value => value.filename);
    }
  }
  const {agree_full_name, agree_shop_name, daily_income, shop_address, required_amount, days, reason_for_loan } = req.body; 
  var detail = await db.models.appBusinessDetails.findOne({
    attributes: ['shop_image', 'shop_agree_image', 'cheque_leaf_image', 'bank_statement_image', 'full_fill'],
    where: {
      user_id,
    }
  }) 
  if (detail) {
    if(req.body.agree_full_name) {
      if(detail.shop_image === null && detail.shop_agree_image === null && detail.cheque_leaf_image === null && detail.bank_statement_image === null){
          var full_fill = detail.full_fill;
      } else if(detail.shop_image === null && detail.shop_agree_image != null && detail.cheque_leaf_image != null && detail.bank_statement_image != null ){
        var full_fill = 0.9;
      } else if(detail.shop_image != null && detail.shop_agree_image === null && detail.cheque_leaf_image != null && detail.bank_statement_image != null){
        var full_fill = 0.9;
      }else if(detail.shop_image != null && detail.shop_agree_image != null && detail.cheque_leaf_image === null && detail.bank_statement_image != null){
        var full_fill = 0.9;
      }else if(detail.shop_image != null && detail.shop_agree_image != null && detail.cheque_leaf_image != null && detail.bank_statement_image === null){
        var full_fill = 0.9; 
      }else if(detail.shop_image != null && detail.shop_agree_image === null && detail.cheque_leaf_image === null && detail.bank_statement_image === null ){
        var full_fill = 0.7;
      } else if(detail.shop_image === null && detail.shop_agree_image != null && detail.cheque_leaf_image === null && detail.bank_statement_image === null){
        var full_fill = 0.7;
      }else if(detail.shop_image === null && detail.shop_agree_image === null && detail.cheque_leaf_image != null && detail.bank_statement_image === null){
        var full_fill = 0.7;
      }else if(detail.shop_image === null && detail.shop_agree_image === null && detail.cheque_leaf_image === null && detail.bank_statement_image != null){
        var full_fill = 0.7; 
      }else if(detail.shop_image != null && detail.shop_agree_image != null && detail.cheque_leaf_image === null && detail.bank_statement_image === null){
        var full_fill = 0.8;
      }else if(detail.shop_image === null && detail.shop_agree_image != null && detail.cheque_leaf_image != null && detail.bank_statement_image === null){
        var full_fill = 0.8;
      }else if(detail.shop_image === null && detail.shop_agree_image === null && detail.cheque_leaf_image != null && detail.bank_statement_image != null){
        var full_fill = 0.8;
      }else if(detail.shop_image != null && detail.shop_agree_image === null && detail.cheque_leaf_image != null && detail.bank_statement_image === null){
        var full_fill = 0.8;
      }else if(detail.shop_image != null && detail.shop_agree_image === null && detail.cheque_leaf_image === null && detail.bank_statement_image != null){
        var full_fill = 0.8;
      }else if(detail.shop_image === null && detail.shop_agree_image != null && detail.cheque_leaf_image === null && detail.bank_statement_image != null){
        var full_fill = 0.8;
      } else{
        var full_fill = 1;
      }
       
      var updated = await db.models.appBusinessDetails.update({
         agree_full_name, agree_shop_name, daily_income, shop_address, required_amount, days, reason_for_loan, full_fill,  status: detail.full_fill == 1.0 ? detail.status : full_fill == 1.0 ? 1 : 0,
      }, {
        where: {
          user_id
        }
        })
    } else if(req.files.shop_image){ 
      if(detail.shop_image != null){
        const shopImages = { "shop_image": detail.shop_image}
        commonLib.removeBusinessDetailImages(shopImages);    
      } 
      if(detail.shop_agree_image === null && detail.cheque_leaf_image === null && detail.bank_statement_image === null){
        var full_fill = 0.7;
      } else if(detail.shop_agree_image != null && detail.cheque_leaf_image === null && detail.bank_statement_image === null){
        var full_fill = 0.8;
      } else if(detail.shop_agree_image === null && detail.cheque_leaf_image != null && detail.bank_statement_image === null){
        var full_fill = 0.8;
      }else if(detail.shop_agree_image === null && detail.cheque_leaf_image === null && detail.bank_statement_image != null){
        var full_fill = 0.8;
      } else if(detail.shop_agree_image === null && detail.cheque_leaf_image != null && detail.bank_statement_image != null){
        var full_fill = 0.9;
      }else if(detail.shop_agree_image != null && detail.cheque_leaf_image === null && detail.bank_statement_image != null){
        var full_fill = 0.9;
      }else if(detail.shop_agree_image != null && detail.cheque_leaf_image != null && detail.bank_statement_image === null){
        var full_fill = 0.9;
      } else{
        var full_fill = 1;
      } 
      var updated = await db.models.appBusinessDetails.update({
        shop_image: shopImage, full_fill, status: detail.full_fill == 1.0 ? detail.status : full_fill == 1.0 ? 1 : 0,
        }, {
        where: {
            user_id: user_id,
        }
      })
    } else if(req.files.shop_agree_image){ 
      if(detail.shop_agree_image != null){
        const shopAgreeImages = { "shop_agree_image": detail.shop_agree_image}
        commonLib.removeBusinessDetailImages(shopAgreeImages);    
      } 
      if(detail.shop_image === null && detail.cheque_leaf_image === null && detail.bank_statement_image === null){
        var full_fill = 0.7;
      } else if(detail.shop_image != null && detail.cheque_leaf_image === null && detail.bank_statement_image === null){
        var full_fill = 0.8;
      } else if(detail.shop_image === null && detail.cheque_leaf_image != null && detail.bank_statement_image === null){
        var full_fill = 0.8;
      }else if(detail.shop_image === null && detail.cheque_leaf_image === null && detail.bank_statement_image != null){
        var full_fill = 0.8;
      } else if(detail.shop_image === null && detail.cheque_leaf_image != null && detail.bank_statement_image != null){
        var full_fill = 0.9;
      }else if(detail.shop_image != null && detail.cheque_leaf_image === null && detail.bank_statement_image != null){
        var full_fill = 0.9;
      }else if(detail.shop_image != null && detail.cheque_leaf_image != null && detail.bank_statement_image === null){
        var full_fill = 0.9;
      } else{
        var full_fill = 1;
      } 
      var updated = await db.models.appBusinessDetails.update({
        shop_agree_image: shopAgreeImage, full_fill, status: detail.full_fill == 1.0 ? detail.status : full_fill == 1.0 ? 1 : 0, 
        }, {
        where: {
            user_id: user_id,
        }
      })
    } else if(req.files.cheque_leaf_image){ 
      if(detail.cheque_leaf_image != null){
        const chequeLeafImages = { "cheque_leaf_image": detail.cheque_leaf_image}
        commonLib.removeBusinessDetailImages(chequeLeafImages);    
      } 
      if(detail.shop_image === null && detail.shop_agree_image === null && detail.bank_statement_image === null){
        var full_fill = 0.7;
      } else if(detail.shop_image != null && detail.shop_agree_image === null && detail.bank_statement_image === null){
        var full_fill = 0.8;
      } else if(detail.shop_image === null && detail.shop_agree_image != null && detail.bank_statement_image === null){
        var full_fill = 0.8;
      }else if(detail.shop_image === null && detail.shop_agree_image === null && detail.bank_statement_image != null){
        var full_fill = 0.8;
      } else if(detail.shop_image === null && detail.shop_agree_image != null && detail.bank_statement_image != null){
        var full_fill = 0.9;
      }else if(detail.shop_image != null && detail.shop_agree_image === null && detail.bank_statement_image != null){
        var full_fill = 0.9;
      }else if(detail.shop_image != null && detail.shop_agree_image != null && detail.bank_statement_image === null){
        var full_fill = 0.9;
      } else{
        var full_fill = 1;
      } 
      var updated = await db.models.appBusinessDetails.update({
        cheque_leaf_image: chequeLeafImage, full_fill, status: detail.full_fill == 1.0 ? detail.status : full_fill == 1.0 ? 1 : 0, 
        }, {
        where: {
            user_id: user_id,
        }
      })
    } else { 
      if(detail.bank_statement_image != null){
        const bankStatementImages = { "bank_statement_image": detail.bank_statement_image}
        commonLib.removeBusinessDetailImages(bankStatementImages);    
      } 
      if(detail.shop_agree_image === null && detail.cheque_leaf_image === null && detail.shop_image === null){
        var full_fill = 0.7;
      } else if(detail.shop_agree_image != null && detail.cheque_leaf_image === null && detail.shop_image === null){
        var full_fill = 0.8
      } else if(detail.shop_agree_image === null && detail.cheque_leaf_image != null && detail.shop_image === null){
        var full_fill = 0.8
      }else if(detail.shop_agree_image === null && detail.cheque_leaf_image === null && detail.shop_image != null){
        var full_fill = 0.8
      } else if(detail.shop_agree_image === null && detail.cheque_leaf_image != null && detail.shop_image != null){
        var full_fill = 0.9
      }else if(detail.shop_agree_image != null && detail.cheque_leaf_image === null && detail.shop_image != null){
        var full_fill = 0.9
      }else if(detail.shop_agree_image != null && detail.cheque_leaf_image != null && detail.shop_image === null){
        var full_fill = 0.9
      } else{
        var full_fill = 1;
      } 
      var updated = await db.models.appBusinessDetails.update({
        bank_statement_image: bankStatementImage, full_fill, status: detail.full_fill == 1.0 ? detail.status : full_fill == 1.0 ? 1 : 0, 
        }, {
        where: {
            user_id: user_id,
        }
      })
    } 
      if (!updated) return next(new AppError('Not Found', 404))
      res.json({ message: 'Bussiness Details updated successfully', error: false, data: updated });
  } else {
      const created = await db.models.appBusinessDetails.create({
      user_id, agree_full_name, agree_shop_name, daily_income, shop_address, required_amount, days, reason_for_loan, full_fill: 0.6
      })
      if (!created) return next(new AppError('Not Found', 404))
      res.json({ message: 'Bussiness Details created successfully', error: false, data: created });    
  }
})

// Get Business Details API for App Users........

exports.getBusinessDetailsById = catchAsync(async (req, res, next) => {
  var decoded = jwt_decode(req.headers.authorization);  
  var user_id = decoded.id;
  const business_details = await db.models.appBusinessDetails.findOne({
      attributes: [`id`, `user_id`, `agree_full_name`, `agree_shop_name`, `daily_income`, `shop_address`, `required_amount`, `days`, `reason_for_loan`, `shop_image`, `shop_agree_image`, `cheque_leaf_image`, `bank_statement_image`, `status`,`full_fill`],
      where: {
          deleted_at: null,
          user_id
      }
  })  
  if (JSON.stringify(business_details) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  var businessImages = []; 
    commonLib.getBusinessDetailImage(business_details, function () {
      businessImages.push(business_details)
    }); 
  if (!businessImages) return next(new AppError('Not Found', 404))
  res.json({error: false, data: businessImages, message: 'College Details found'});
})  


// ADMIN PANEL GET API...........................

//  Get Basic Information API for Admin Panel....

exports.getBasicInfoAdmin = catchAsync(async (req, res, next) => {    
  const user_id = req.params.user_id 
  const basicInfo = await db.models.appBasicInfo.findOne({
  attributes: ['id', 'user_id', 'username', 'gender', 'date_of_birth', 'marital_status', 'highest_qualification', 'mother_name', 'father_name', 'watsapp_num', 'full_fill', 'permanent_address', 'current_address', `status`],
  where: {
      user_id,
  }
  })  
  if (!basicInfo) return next(new AppError('Not Found', 404))
  res.json({ message: 'Basic Info Found', error: false, data: basicInfo });
});

// Get Employement Details for Admin...

exports.getEmpInfoAdmin = catchAsync(async (req, res, next) => {
  const user_id = req.params.user_id  
  const emp_info = await db.models.appEmpInfo.findOne({
    attributes: [`id`, `user_id`, `company_name`, `industry_type`, `office_address`, `pin_code`, `monthly_take_home`, `reason_for_loan`, `designation`, `date_of_join`, `employment_proof`, `sal_slip_first`, `sal_slip_second`, `sal_slip_third`, `status`],
    where: {
      deleted_at: null,
      user_id
    }
  })
  
  if (JSON.stringify(emp_info) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  var empInformation = [];
  // emp_info.forEach(function (empInfo, index) {
    commonLib.getEmpProofImage(emp_info, function () {
      empInformation.push(emp_info)
    });
  // }) 
  res.json({
    error: false,
    data: empInformation,
    message: 'Users found'
  });
})

// Get Bank Details for Admin

exports.getbankDetailAdmin = catchAsync(async (req, res, next) => {
  const user_id = req.params.user_id  
  const bankDetails = await db.models.appBankInfo.findOne({
    attributes: [`id`, `user_id`, `bank_name`, `branch`, `account_name`, `account_no`, `ifsc_code`, `status`],
    where: {
      deleted_at: null,
      user_id,
    }
  })
  if (!bankDetails) return next(new AppError('Not Found', 404))
      var account_no = cryptr.decrypt(bankDetails.account_no);
      var ifsc_code = cryptr.decrypt(bankDetails.ifsc_code);
      bankDetails[`account_no`] = account_no;
      bankDetails[`ifsc_code`] = ifsc_code;
      res.json({
        error: false,
        data: bankDetails,
        message: 'Bank Details found'
      });
})

// Get KYC Details for Admin....

exports.getKycDetailsAdmin = catchAsync(async (req, res, next) => {
const user_id = req.params.user_id;
const kyc_details = await db.models.appKycDetails.findOne({
    attributes: [`id`, `user_id`,`adhaar_no`,`client_id`,`reg_mob_no`,`adhaar_status`,`adhaar_front_image`,`adhaar_back_image`, `pan_no`,`pan_status` ,`pan_card_image`, `selfee_image`, `status`],
    where: {
        deleted_at: null,
        user_id
    }
})  
if (JSON.stringify(kyc_details) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
var kycImages = []; 
  commonLib.getKycDetailImage(kyc_details, function () {
    kycImages.push(kyc_details)
  });
if (!kycImages) return next(new AppError('Not Found', 404))
res.json({error: false, data: kycImages, message: 'KYC Details found'});
})

//  Get Referance Information API for Admin Panel....

exports.getRefDetailsAdmin = catchAsync(async (req, res, next) => {    
  const user_id = req.params.user_id 
  const refDetails = await db.models.appReference.findOne({
  attributes: ['id', 'user_id', 'rel_first', 'number_first', 'rel_second', 'number_second', 'rel_third', 'number_third', 'rel_foruth', 'number_fourth', 'status','full_fill'],
    where: {
        user_id,
    }
  })  
  if (!refDetails) return next(new AppError('Not Found', 404))
  res.json({ message: 'Basic Info Found', error: false, data: refDetails });
});

// Get Business Details API for Admin Panel........

exports.getBisinessDetailsAdmin = catchAsync(async (req, res, next) => { 
  const user_id = req.params.user_id 
  const business_details = await db.models.appBusinessDetails.findOne({
      attributes: [`id`, `user_id`, `agree_full_name`, `agree_shop_name`, `daily_income`, `shop_address`, `required_amount`, `days`, `reason_for_loan`, `shop_image`, `shop_agree_image`, `cheque_leaf_image`, `bank_statement_image`, `status`, `full_fill`],
      where: {
          deleted_at: null,
          user_id
      }
  })  
  if (JSON.stringify(business_details) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  var businessImages = []; 
    commonLib.getBusinessDetailImage(business_details, function () {
      businessImages.push(business_details)
    }); 
  if (!businessImages) return next(new AppError('Not Found', 404))
  res.json({error: false, data: businessImages, message: 'College Details found'});
}) 

// Get College Details API for Admin Panel........

exports.getCollegeDetailsAdmin = catchAsync(async (req, res, next) => { 
  const user_id = req.params.user_id 
  const college_details = await db.models.appCollegeDetails.findOne({
      attributes: [`id`, `user_id`,`college_name`,`college_address`,`qualification`, `reason_of_loan` ,`college_id_image`,`status`, `full_fill`],
      where: {
          deleted_at: null,
          user_id
      }
  }) 
  if (JSON.stringify(college_details) == "[]" ? 1 : 0) return next(new AppError('Not Found', 404))
  var collegeImages = []; 
    commonLib.getCollegeDetailImage(college_details, function () {
      collegeImages.push(college_details)
    }); 
  if (!collegeImages) return next(new AppError('Not Found', 404))
  res.json({error: false, data: collegeImages, message: 'College Details found'});
})  

// Get App List Details

exports.getAppListDetailsAdmim = catchAsync(async (req, res, next) => {    
  const user_id = req.params.user_id 
  const appList = await db.models.appList.findAll({
  attributes: ['id', 'user_id', 'app_list'],
  where: {
      user_id,
  }
  })  
  if (!appList) return next(new AppError('Not Found', 404))
  res.json({ message: 'App List Details Found', error: false, data: appList });
});

// Update Form Status

exports.updateBasicStatus = catchAsync(async (req, res, next) => {  
  const user_id = req.body.user_id 
  const basicInfo = await db.models.appBasicInfo.findOne({
      attributes: [`status`],
      where: {
          deleted_at: null,
          user_id
      }
  }) 
  if (!basicInfo) return next(new AppError('Not Found', 404))
  const updated = await db.models.appBasicInfo.update({
    status: basicInfo.status ? 0 : 1,
    }, {
    where: {
      user_id: user_id,
    }
    })
    if (!updated) return next(new AppError('Not Found', 404))
    res.json({ message: 'Basic Details updated successfully', error: false, data: updated });
})   

exports.updateKycStatus = catchAsync(async (req, res, next) => { 
  const user_id = req.body.user_id 
  const kyc_details = await db.models.appKycDetails.findOne({
      attributes: [`status`],
      where: {
          deleted_at: null,
          user_id
      }
  }) 
  if (!kyc_details) return next(new AppError('Not Found', 404))
  const updated = await db.models.appKycDetails.update({
    status: kyc_details.status ? 0 : 1,
    }, {
    where: {
      user_id: user_id,
    }
    })
    if (!updated) return next(new AppError('Not Found', 404))
    res.json({ message: 'Kyc Details updated successfully', error: false, data: updated });
})

exports.updateRefrenceStatus = catchAsync(async (req, res, next) => { 
  const user_id = req.body.user_id 
  const reference = await db.models.appReference.findOne({
      attributes: [`status`],
      where: {
          deleted_at: null,
          user_id
      }
  }) 
  if (!reference) return next(new AppError('Not Found', 404))
  const updated = await db.models.appReference.update({
    status: reference.status ? 0 : 1,
    }, {
    where: {
      user_id: user_id,
    }
    })
    if (!updated) return next(new AppError('Not Found', 404))
    res.json({ message: 'Reference Details updated successfully', error: false, data: updated });
})    

exports.updateCollegeStatus = catchAsync(async (req, res, next) => { 
  const user_id = req.body.user_id 
  const college_details = await db.models.appCollegeDetails.findOne({
      attributes: [`status`],
      where: {
          deleted_at: null,
          user_id
      }
  }) 
  if (!college_details) return next(new AppError('Not Found', 404))
  const updated = await db.models.appCollegeDetails.update({
    status: college_details.status ? 0 : 1,
    }, {
    where: {
      user_id: user_id,
    }
    })
    if (!updated) return next(new AppError('Not Found', 404))
    res.json({ message: 'College Details updated successfully', error: false, data: updated });
})

exports.updateEmployeeStatus = catchAsync(async (req, res, next) => { 
  const user_id = req.body.user_id 
  const emp_info = await db.models.appEmpInfo.findOne({
      attributes: [`status`],
      where: {
          deleted_at: null,
          user_id
      }
  }) 
  if (!emp_info) return next(new AppError('Not Found', 404))
  const updated = await db.models.appEmpInfo.update({
    status: emp_info.status ? 0 : 1,
    }, {
    where: {
      user_id: user_id,
    }
    })
    if (!updated) return next(new AppError('Not Found', 404))
    res.json({ message: 'Employee Details updated successfully', error: false, data: updated });
})

exports.updateBussinessStatus = catchAsync(async (req, res, next) => { 
  const user_id = req.body.user_id 
  const business_details = await db.models.appBusinessDetails.findOne({
      attributes: [`status`],
      where: {
          deleted_at: null,
          user_id
      }
  }) 
  if (!business_details) return next(new AppError('Not Found', 404))
  const updated = await db.models.appBusinessDetails.update({
    status: business_details.status ? 0 : 1,
    }, {
    where: {
      user_id: user_id,
    }
    })
    if (!updated) return next(new AppError('Not Found', 404))
    res.json({ message: 'Business Details updated successfully', error: false, data: updated });
})    

exports.updateBankStatus = catchAsync(async (req, res, next) => { 
  const user_id = req.body.user_id 
  const bank_detail = await db.models.appBankInfo.findOne({
      attributes: [`status`],
      where: {
          deleted_at: null,
          user_id
      }
  }) 
  if (!bank_detail) return next(new AppError('Not Found', 404))
  const updated = await db.models.appBankInfo.update({
    status: bank_detail.status ? 0 : 1,
    }, {
    where: {
      user_id: user_id,
    }
    })
    if (!updated) return next(new AppError('Not Found', 404))
    res.json({ message: 'Bank Details updated successfully', error: false, data: updated });
})    

