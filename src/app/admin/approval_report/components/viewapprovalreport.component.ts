import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApprovalReportService } from '../service/approvalreport.service';
import { PermissionService } from '../../permissions/service/permission.service';
import { User } from '../../../models/user';
import {Title} from "@angular/platform-browser";
import * as moment from 'moment';

@Component({
  selector: 'view-overall-customer',
  templateUrl: '../templates/viewapprovalreport.component.html'
})
export class ViewApprovalReportComponent implements OnInit {

  public approvalreport: User;
  public basic: any;
  public empInfo: any;
  bankInfo: any;
  kycInfo: any;
  collegeDetail: any;
  businessDetail: any;
  refInfo: User;
  contactDetail: any;
  approvalReportLoanDetails: User;
  loanStatus: boolean;
  users: any;
  countUserLoan: any;
  loanApplyCount: string;
  regMobNo: any;
  appListDetails: any;
  per_missions: any;
  
  constructor(
    private route: ActivatedRoute, 
    private approvalreportService: ApprovalReportService,
    private titleService:Title,
    private permissionService : PermissionService,
    ){ 
      this.titleService.setTitle("View Approval Report"); 
    }
    
  ngOnInit() {  
    const user_id = this.route.snapshot.paramMap.get('user_id');   
    const loan_id = this.route.snapshot.paramMap.get('loan_id'); 
    this.permissionService.checkPermission().subscribe(res=>{ 
      if(res){  
        this.per_missions = res.user;   
      }    
    })
    this.approvalreportService.getApprovalReportView(user_id).subscribe(res=>{  
      if(res){ this.approvalreport = res.data; }  
    })  

    this.approvalreportService.getBasicInfo(user_id).subscribe(res=>{  
      if(res){ this.basic = res.data; }  
    })    
    this.approvalreportService.getRefInfo(user_id).subscribe(res=>{ 
      if(res){ this.refInfo = res.data; }    
    })
    this.approvalreportService.getEmpInfo(user_id).subscribe(res=>{ 
      if(res){ this.empInfo = res.data[0];}  
    })
    this.approvalreportService.getBankInfo(user_id).subscribe(res=>{ 
      if(res){ this.bankInfo = res.data; }
    })
    this.approvalreportService.getKycInfo(user_id).subscribe(res=>{ 
      if(res){ 
        this.kycInfo = res.data[0]; 
        this.regMobNo = this.kycInfo.reg_mob_no;
      }  
    })
    this.approvalreportService.getCollegeDetails(user_id).subscribe(res=>{ 
      if(res){ this.collegeDetail = res.data[0]; }
    })
    this.approvalreportService.getBusinessDetails(user_id).subscribe(res=>{ 
      if(res){ this.businessDetail = res.data[0]; }  
    })
    this.approvalreportService.getContactDetails(user_id).subscribe(res=>{ 
      if(res){ this.contactDetail = res.data; }    
    }) 
    this.approvalreportService.getApplyLoanDetails(loan_id, user_id).subscribe(res=>{   
      if(res){ 
        this.approvalReportLoanDetails = res.data;
        this.loanStatus = res.status;   
        this.countUserLoan = res.countUserLoan.count;
        this.loanApplyCount = this.countUserLoan == 1 ? 'Fresh' : 'Re-Apply';   
      } 
    }) 
    this.approvalreportService.getUsers().subscribe(res=>{ 
      if(res){ this.users = res.data; }  
    })
    this.approvalreportService.getAppListDetails(user_id).subscribe(res=>{ 
      if(res){ this.appListDetails = res.data; 
      }
    })
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