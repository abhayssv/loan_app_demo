import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseReviewService } from '../service/casereview.service';
import { PermissionService } from '../../permissions/service/permission.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import * as moment from 'moment';

@Component({
  selector: 'view-case-review',
  templateUrl: '../templates/viewcasereview.component.html'
})
export class ViewCasereviewComponent implements OnInit { 
  public casereviews: User;
  public basic: any;
  public empInfo: any;
  bankInfo: any;
  kycInfo: any;
  collegeDetail: any;
  businessDetail: any;
  applyLoanDetail: any;
  status: any;
  refInfo: User;
  casereview: User;
  contactDetail: any;
  adharContact: string;
  loanStatus: boolean;
  users: User;
  countUserLoan: any;
  loanApplyCount: string;
  customer_id: any;
  clientId: any;
  adharApiRes: any;
  regMobNo: any;
  response1: {};
  loading = false;
  appListDetails: any;
  per_missions: any;
  user_id:number;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private casereviewService: CaseReviewService,
    private toastr: ToastrService,
    private titleService:Title,
    private permissionService : PermissionService,
  ) {
    this.titleService.setTitle("View Case Review");
  }
  ngOnInit() {   
    const user_id = this.route.snapshot.paramMap.get('user_id');  
    const loan_id = this.route.snapshot.url[1].path;
    this.user_id = Number(user_id);
      
    this.casereviewService.getCaseReviewView(user_id).subscribe(res=>{  
      if(res){ this.casereviews = res.data; }  
    })

    this.permissionService.checkPermission().subscribe(res=>{ 
      if(res){  
        this.per_missions = res.user   
      }    
    })
    
    this.casereviewService.getBasicInfo(user_id).subscribe(res=>{  
      if(res){ this.basic = res.data; }  
    })
    this.casereviewService.getRefInfo(user_id).subscribe(res=>{ 
      if(res){ this.refInfo = res.data; }    
    })
    this.casereviewService.getEmpInfo(user_id).subscribe(res=>{ 
      if(res){ this.empInfo = res.data[0];}  
    })
    this.casereviewService.getBankInfo(user_id).subscribe(res=>{ 
      if(res){ this.bankInfo = res.data; }
    })
    this.casereviewService.getKycInfo(user_id).subscribe(res=>{ 
      if(res){ 
        this.kycInfo = res.data[0]; 
        this.regMobNo = this.kycInfo.reg_mob_no;
      }  
    })
    this.casereviewService.getCollegeDetails(user_id).subscribe(res=>{ 
      if(res){ this.collegeDetail = res.data[0]; }
    })
    this.casereviewService.getBusinessDetails(user_id).subscribe(res=>{ 
      if(res){ this.businessDetail = res.data[0]; }  
    }) 
    this.casereviewService.getApplyLoanDetails(loan_id, user_id).subscribe(res=>{   
      if(res){ 
        this.casereview = res.data;
        this.loanStatus = res.status;   
        this.countUserLoan = res.countUserLoan.count;
        this.loanApplyCount = this.countUserLoan == 1 ? 'Fresh' : 'Re-Apply';   
      } 
    }) 
    this.casereviewService.getStatus().subscribe(res=>{ 
      if(res){ this.status = res.data; } 
      this.status.shift()   
    })
    this.casereviewService.getContactDetails(user_id).subscribe(res=>{ 
      if(res){ this.contactDetail = res.data; }    
    })
    this.casereviewService.getUsers().subscribe(res=>{ 
      if(res){ this.users = res.data; }  
    })
    this.casereviewService.getAppListDetails(user_id).subscribe(res=>{ 
      if(res){ this.appListDetails = res.data; 
      }
    })
  }

  changeStatus(casereview, key){ 
    const email = this.casereviews.email;
    const loan_id = this.route.snapshot.url[1].path; 
    let status = casereview[key];   
    this.casereviewService.changeStatus(status, loan_id, key, email)
    .subscribe(response=>{ 
      this.toastr.success(response.message, 'Success');
      setInterval(() => {
        window.close(); 
      }, 3000); 
    });
  } 

  // viewAdhaarNo(adhaar_no){  
  //   // const adhaar_nos = "882638084815"; 
  //   // const adhaar_nos = "111111111111";
  //   this.customer_id = this.casereviews.user_id; 
  //   this.loading = true; 
  //   this.casereviewService.getAdhaarDetails(adhaar_no, this.customer_id)
  //   .subscribe(response=>{ 
  //     this.response1 = response;  
  //     this.regMobNo = this.response1['mobileNumber']; 
  //     if(this.response1['error'] == true){  
  //       this.loading = false; 
  //       this.toastr.error(response['message'], 'Error'); 
  //     }else{ 
  //       this.loading = false;
  //       this.toastr.success(response['message'], 'Success');
  //     } 
  //   });
  // }
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