import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'view-user',
  templateUrl: '../templates/viewuser.component.html'
})
export class ViewUserComponent implements OnInit {

  public user: User;
  public basic: any = {
    email:null,
    mobile_no:null,
    username: null,
    gender:null,
    father_name:null,
    mother_name:null,
    date_of_birth:null,
    marital_status:null,
    watsapp_num:null,
    highest_qualification: null,
    current_address:null,
    permanent_address:null
  };
  public empInfo: any = {
    company_name: null,
    designation: null,
    date_of_join: null,
    industry_type:null,
    monthly_take_home:null,
    reason_for_loan:null,
  };
  bankInfo: any = {
    account_name: null,
    account_no: null,
    bank_name: null,
    branch: null,
    ifsc_code:null
  }
  kycInfo: any = {
    adhaar_no: null,
    pan_no: null,
    adhaar_front_image: null,
    adhaar_back_image:null,
    selfee_image: null
  }
  collegeDetail: any = {
    college_name: null,
    qualification: null,
    reason_of_loan: null,
    college_address:null,
  }
  businessDetail: any = {
    agree_full_name: null,
    agree_shop_name:null,
    shop_address:null,
    reason_for_loan: null,
    daily_income:null,
    required_amount:null,
    days:null,
    bank_statement_image:null,
    cheque_leaf_image:null,
    shop_image:null,
    shop_agree_image:null,
  }
  refInfo: any = {
    rel_first: null,
    number_first:null,
    rel_second:null,
    number_second:null,
    rel_third:null,
    number_third:null,
    rel_foruth:null,
    number_fourth:null
  }
  adharContact: string;
  contactDetail: any = {
    name:null,
    mobile_no:null,
  }
  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("View Customer"); 
    }
  ngOnInit() {
    const user_id = this.route.snapshot.paramMap.get('user_id'); 
    this.userService.getBasicInfo(user_id).subscribe(res=>{ 
      if(res){ this.basic = res.data; 
      }   
    }) 
    this.userService.getBankInfo(user_id).subscribe(res=>{ 
      if(res){ this.bankInfo = res.data; } 
    })
    this.userService.getKycInfo(user_id).subscribe(res=>{ 
      if(res){ this.kycInfo = res.data[0]; }  
    })
    this.userService.getRefInfo(user_id).subscribe(res=>{ 
      if(res){ this.refInfo = res.data; }    
    })
    this.userService.getCollegeDetails(user_id).subscribe(res=>{ 
      if(res){ this.collegeDetail = res.data[0]; } 
    })
    this.userService.getEmpInfo(user_id).subscribe(res=>{ 
      if(res){ this.empInfo = res.data[0];}    
    })
    this.userService.getBusinessDetails(user_id).subscribe(res=>{ 
      if(res){ this.businessDetail = res.data[0]; }  
    })
    this.userService.getContactDetails(user_id).subscribe(res=>{ 
      if(res){ this.contactDetail = res.data; } 
    })
  } 

  changeStatus(firstreview, key, form_id){
    const user_id = this.route.snapshot.url[1].path; 
    let status = firstreview[key];   
    if(form_id == 'basic_status'){ 
      this.userService.changeBasicStatus(status, user_id, key)
      .subscribe(response=>{ 
        this.toastr.success(response.message, 'Success'); 
      });
    } else if(form_id == 'kyc_status'){ 
      this.userService.changeKycStatus(status, user_id, key)
      .subscribe(response=>{ 
        this.toastr.success(response.message, 'Success');  
      });
    } else if(form_id == 'bank_status'){ 
      this.userService.changeBankStatus(status, user_id, key)
      .subscribe(response=>{ 
        this.toastr.success(response.message, 'Success');  
      });
    } else if(form_id == 'ref_status'){ 
      this.userService.changeRefStatus(status, user_id, key)
      .subscribe(response=>{ 
        this.toastr.success(response.message, 'Success'); 
      });
    } else if(form_id == 'col_status'){ 
      this.userService.changeCollegeStatus(status, user_id, key)
      .subscribe(response=>{ 
        this.toastr.success(response.message, 'Success');  
      });
    } else if(form_id == 'emp_status'){ 
      this.userService.changeEmpStatus(status, user_id, key)
      .subscribe(response=>{ 
        this.toastr.success(response.message, 'Success');  
      });
    } else{ 
      this.userService.changeBusinessStatus(status, user_id, key)
      .subscribe(response=>{ 
        this.toastr.success(response.message, 'Success');  
      });
    } 
  } 
  viewAdhaarNo(){ 
    this.adharContact = "Null";
  }
}