'use strict'; 
var appUserProfile = require('../controllers/appUserProfileController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var upload = require('../lib/multerEmpProofUpload');
var uploadKyc = require('../lib/multerKycUpload');

var multerware = upload.fields([ 
  { name: 'employment_proof', maxCount: 1},
  { name: 'salary_slip_first', maxCount: 1},
  { name: 'salary_slip_second', maxCount: 1},
  { name: 'salary_slip_third', maxCount: 1},
  { name: 'college_id_image', maxCount: 1 },
  { name: 'shop_image', maxCount: 1 },
  { name: 'shop_agree_image', maxCount: 1 },
  { name: 'cheque_leaf_image', maxCount: 1 },
  { name: 'bank_statement_image', maxCount: 1 }
])
var multerKyc = uploadKyc.fields([ 
  { name: 'adhaar_front_image', maxCount: 1},
  { name: 'adhaar_back_image', maxCount: 1},
  { name: 'pan_card_image', maxCount: 1},
  { name: 'selfee_image', maxCount: 1}
])


module.exports = function (app) {
  // Get FULL FILL API Route...
  app.get('/api/profile/full_fill_count', appUserProfile.getFullFillCount);

  // Basic Information Routes...
  app.post('/api/profile/basic_info/save_info', appUserProfile.saveBasicInfo);
  app.get('/api/profile/basic_info', appUserProfile.getbasicInfoById); 

  // Employement Information Routes...
  app.get('/api/profile/emp_info', appUserProfile.getEmpInfoById); 
  app.post('/api/profile/emp_info/save_info', appUserProfile.saveEmpInfo); 
  app.post('/api/profile/emp_info/upload_info',multerware, appUserProfile.uploadEmpDecx);
  app.post('/api/profile/emp_info/sal_slip', multerware, appUserProfile.uploadSalSlip);

  // Bank Details Routes
  app.get('/api/profile/bank', appUserProfile.getBankDetailsById);
  app.post('/api/profile/bank/byIfsc_Code',appUserProfile.getBankDetailsByIFSC_CODE);
  app.post('/api/profile/bank/save_bank_details', appUserProfile.saveBankDetails);

  // KYC Details Routes
  app.get('/api/profile/kyc', appUserProfile.getKycDetailsById);  
  app.post('/api/profile/kyc/save_kyc_details',multerKyc, appUserProfile.saveKycDetails); 
  app.post('/api/profile/kyc/adhaar/get_adhaar_details', appUserProfile.getAdhaarClientId); 
  app.post('/api/profile/kyc/pan/get_pan_details', appUserProfile.getPANClientId); 
  // app.get('/api/profile/kyc/update/all', appUserProfile.updateKycDetailsById); 

  // Referance Details Routes
  app.get('/api/profile/ref', appUserProfile.getRefDetailsById); 
  app.post('/api/profile/ref/save_ref_details', appUserProfile.saveRefDetails);

  // College Details Routes
  app.get('/api/profile/college_details', appUserProfile.getCollegeDetailsById); 
  app.post('/api/profile/save_college_details', appUserProfile.saveCollegeDetails);
  app.post('/api/profile/upload_college_id',multerware, appUserProfile.uploadCollegeId);

  // Business Details Routes
  app.get('/api/profile/business_details', appUserProfile.getBusinessDetailsById); 
  app.post('/api/profile/save_business_details',multerware, appUserProfile.saveBusinessDetails);


  // Get Information Route for Admin
  app.get('/api/admin/profile/basic_info/:user_id', appUserProfile.getBasicInfoAdmin);
  app.get('/api/admin/profile/emp_info/:user_id', appUserProfile.getEmpInfoAdmin); 
  app.get('/api/admin/profile/bank/:user_id', appUserProfile.getbankDetailAdmin); 
  app.get('/api/admin/profile/kyc/:user_id', appUserProfile.getKycDetailsAdmin); 
  app.get('/api/admin/profile/ref/:user_id', appUserProfile.getRefDetailsAdmin);
  app.get('/api/admin/profile/college/:user_id', appUserProfile.getCollegeDetailsAdmin);
  app.get('/api/admin/profile/business/:user_id', appUserProfile.getBisinessDetailsAdmin);  
  app.get('/api/admin/profile/app_list/get_details/:user_id', appUserProfile.getAppListDetailsAdmim); 

  // Update status from Admin
  app.post('/api/admin/profile/basic_info/status_update', appUserProfile.updateBasicStatus);
  app.post('/api/admin/profile/emp_info/status_update', appUserProfile.updateEmployeeStatus); 
  app.post('/api/admin/profile/bank/status_update', appUserProfile.updateBankStatus); 
  app.post('/api/admin/profile/kyc/status_update', appUserProfile.updateKycStatus); 
  app.post('/api/admin/profile/ref/status_update', appUserProfile.updateRefrenceStatus);
  app.post('/api/admin/profile/college/status_update', appUserProfile.updateCollegeStatus);
  app.post('/api/admin/profile/business/status_update', appUserProfile.updateBussinessStatus); 

};