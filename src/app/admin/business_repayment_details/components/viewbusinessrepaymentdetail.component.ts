import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessRepaymentDetailService } from '../service/businessrepaymentdetail.service';
import { User } from '../../../models/user';

@Component({
  selector: 'view-second-review',
  templateUrl: '../templates/viewbusinessrepaymentdetail.component.html'
})
export class ViewBusinessRepaymentDetailComponent implements OnInit {

  public businessrepaymentdetail: User;
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
  public empInfo: any;
  bankInfo: any;
  kycInfo: any;
  collegeDetail: any;
  businessDetail: any;
  adharContact: string;
  contactDetail: any;
  refInfo: any;
  regMobNo: any;
  cashflatting: any;
  loanStatus: any;
  countUserLoan: any;
  loanApplyCount: string;
  users: any;
  appListDetails: any;
  
  constructor(
    private route: ActivatedRoute, 
    private businessrepaymentdetailService: BusinessRepaymentDetailService
  ) {

  }
  ngOnInit() { 
    const user_id = this.route.snapshot.paramMap.get('user_id');
    const loan_id = this.route.snapshot.url[1].path;    
    this.businessrepaymentdetailService.getBasicInfo(user_id).subscribe(res=>{  
      if(res){ this.basic = res.data; }  
    })
    this.businessrepaymentdetailService.getEmpInfo(user_id).subscribe(res=>{ 
      if(res){ this.empInfo = res.data[0];}   
    })
    this.businessrepaymentdetailService.getRefInfo(user_id).subscribe(res=>{ 
      if(res){ this.refInfo = res.data; }    
    })
    this.businessrepaymentdetailService.getBankInfo(user_id).subscribe(res=>{ 
      if(res){ this.bankInfo = res.data; }
    })
    this.businessrepaymentdetailService.getKycInfo(user_id).subscribe(res=>{ 
      if(res){ 
        this.kycInfo = res.data[0]; 
        this.regMobNo = this.kycInfo.reg_mob_no;
      }  
    })
    this.businessrepaymentdetailService.getCollegeDetails(user_id).subscribe(res=>{ 
      if(res){ this.collegeDetail = res.data[0]; }
    })
    this.businessrepaymentdetailService.getBusinessDetails(user_id).subscribe(res=>{ 
      if(res){ this.businessDetail = res.data[0]; }  
    })
    this.businessrepaymentdetailService.getApplyLoanDetails(loan_id, user_id).subscribe(res=>{   
      if(res){ 
        this.cashflatting = res.data;
        this.loanStatus = res.status;   
        this.countUserLoan = res.countUserLoan.count;
        this.loanApplyCount = this.countUserLoan == 1 ? 'Fresh' : 'Re-Apply';   
      } 
    }) 
    this.businessrepaymentdetailService.getContactDetails(user_id).subscribe(res=>{ 
      if(res){ this.contactDetail = res.data; }    
    })
    this.businessrepaymentdetailService.getUsers().subscribe(res=>{ 
      if(res){ this.users = res.data; }  
    })
    this.businessrepaymentdetailService.getAppListDetails(user_id).subscribe(res=>{ 
      if(res){ this.appListDetails = res.data; 
      }
    })
  }

  viewAdhaarNo(){ 
    this.adharContact = "Null";
  }
  
}