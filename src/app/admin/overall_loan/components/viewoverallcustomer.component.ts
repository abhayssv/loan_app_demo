import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverallCustomerService } from '../service/overallcustomer.service'; 
import { User } from '../../../models/user';
import {Title} from "@angular/platform-browser";
import * as moment from 'moment';

@Component({
  selector: 'view-overall-customer',
  templateUrl: '../templates/viewoverallcustomer.component.html'
})
export class ViewOverallCustomerComponent implements OnInit {

  public overallcustomer: User;
  public basic: any;
  public empInfo: any;
  bankInfo: any;
  kycInfo: any;
  collegeDetail: any;
  businessDetail: any;
  refInfo: User;
  adharContact: string;
  contactDetail: any;
  overallLoanDetails: User;
  loanStatus: boolean;
  users: any;
  countUserLoan: any;
  loanApplyCount: string;
  regMobNo: any;
  appListDetails: any;
  
  constructor(
    private route: ActivatedRoute, 
    private overallcustomerService: OverallCustomerService, 
    private titleService:Title
    ){ 
      this.titleService.setTitle("View Overall Customer Applied"); 
    }
  ngOnInit() {  
    const user_id = this.route.snapshot.paramMap.get('user_id'); 
    const loan_id = this.route.snapshot.paramMap.get('loan_id'); 
     
    this.overallcustomerService.getOverallCustomerView(user_id).subscribe(res=>{  
      if(res){ this.overallcustomer = res.data; }  
    }) 
    this.overallcustomerService.getBasicInfo(user_id).subscribe(res=>{  
      if(res){ this.basic = res.data; }  
    }) 
    this.overallcustomerService.getRefInfo(user_id).subscribe(res=>{ 
      if(res){ this.refInfo = res.data; }    
    })
    this.overallcustomerService.getEmpInfo(user_id).subscribe(res=>{ 
      if(res){ this.empInfo = res.data[0];}  
    })
    this.overallcustomerService.getBankInfo(user_id).subscribe(res=>{ 
      if(res){ this.bankInfo = res.data; }
    })
    this.overallcustomerService.getKycInfo(user_id).subscribe(res=>{ 
      if(res){ 
        this.kycInfo = res.data[0];
        this.regMobNo = this.kycInfo.reg_mob_no;
      }  
    })
    this.overallcustomerService.getCollegeDetails(user_id).subscribe(res=>{ 
      if(res){ this.collegeDetail = res.data[0]; }
    })
    this.overallcustomerService.getBusinessDetails(user_id).subscribe(res=>{ 
      if(res){ this.businessDetail = res.data[0]; }  
    })
    this.overallcustomerService.getContactDetails(user_id).subscribe(res=>{ 
      if(res){ this.contactDetail = res.data; }    
    }) 
    this.overallcustomerService.getApplyLoanDetails(loan_id, user_id).subscribe(res=>{   
      if(res){ 
        this.overallLoanDetails = res.data;
        this.loanStatus = res.status;   
        this.countUserLoan = res.countUserLoan.count;
        this.loanApplyCount = this.countUserLoan == 1 ? 'Fresh' : 'Re-Apply';   
      } 
    }) 
    this.overallcustomerService.getUsers().subscribe(res=>{ 
      if(res){ this.users = res.data; }  
    })
    this.overallcustomerService.getAppListDetails(user_id).subscribe(res=>{ 
      if(res){ this.appListDetails = res.data; 
      }
    })
  }
  viewAdhaarNo(){ 
    this.adharContact = "Null";
  }

  calculateDiff(data){    
    let date = new Date(data);
    let todaysDate = new Date();
    const currentDate = moment(); 
    const firstDate = moment(data,"YYYY-MM-DD"); 
    const secondDate = moment(currentDate).format("YYYY-MM-DD");
    const diffInDays = Math.abs(firstDate.diff(secondDate, 'days'));  
    if(date >= todaysDate){  
      return 0;
    }else{    
      return diffInDays;
    } 
  } 
  
}