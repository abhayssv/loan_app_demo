import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignLoanService } from '../service/assignloan.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'view-first-review',
  templateUrl: '../templates/viewassignloan.component.html'
})
export class ViewAssignLoanComponent implements OnInit {

  public assignloans: User;
  public basic: any;
  public empInfo: any;
  bankInfo: any;
  kycInfo: any;
  collegeDetail: any;
  businessDetail: any;
  applyLoanDetail: any;
  status: any;
  refInfo: User;
  assignloan: User;
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
  loanHistory: any;
  public remarkReview = {
    "remark" : "",
  };
  remarkDetail: any;
  sortedRemarks: any[] = [];
  appListDetails: any;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private assignloanService: AssignLoanService,
    private toastr: ToastrService,
    private titleService:Title,
  ) {
    this.titleService.setTitle("View First Review");
  }
  ngOnInit() {   
    const user_id = this.route.snapshot.paramMap.get('user_id');  
    const loan_id = this.route.snapshot.url[1].path; 
    this.assignloanService.getAssignLoanView(user_id).subscribe(res=>{  
      if(res){ this.assignloans = res.data; }  
    })
    this.assignloanService.getBasicInfo(user_id).subscribe(res=>{  
      if(res){ this.basic = res.data; }  
    })
    this.assignloanService.getRefInfo(user_id).subscribe(res=>{ 
      if(res){ this.refInfo = res.data; }    
    })
    this.assignloanService.getEmpInfo(user_id).subscribe(res=>{ 
      if(res){ this.empInfo = res.data[0];}  
    })
    this.assignloanService.getBankInfo(user_id).subscribe(res=>{ 
      if(res){ this.bankInfo = res.data; }
    })
    this.assignloanService.getKycInfo(user_id).subscribe(res=>{ 
      if(res){ 
        this.kycInfo = res.data[0]; 
        // this.regMobNo = this.kycInfo.reg_mob_no;
      }  
    })
    this.assignloanService.getCollegeDetails(user_id).subscribe(res=>{ 
      if(res){ this.collegeDetail = res.data[0]; }
    })
    this.assignloanService.getBusinessDetails(user_id).subscribe(res=>{ 
      if(res){ this.businessDetail = res.data[0]; }  
    }) 
    this.assignloanService.getApplyLoanDetails(loan_id, user_id).subscribe(res=>{   
      if(res){ 
        this.assignloan = res.data;
        this.loanStatus = res.status;   
        this.countUserLoan = res.countUserLoan.count;
        this.loanApplyCount = this.countUserLoan == 1 ? 'Fresh' : 'Re-Apply';   
      } 
    }) 
    this.assignloanService.getStatus().subscribe(res=>{ 
      if(res){ this.status = res.data; } 
      this.status.shift()   
    })
    this.assignloanService.getContactDetails(user_id).subscribe(res=>{ 
      if(res){ this.contactDetail = res.data; }    
    })
    this.assignloanService.getUsers().subscribe(res=>{ 
      if(res){ this.users = res.data; }  
    })
    this.assignloanService.getLoanHistory(user_id).subscribe(res=>{ 
      if(res){ this.loanHistory = res.data; } 
    });
    this.assignloanService.getRemarksDetails(loan_id).subscribe(res=>{ 
      if(res){ 
        this.remarkDetail = res.data; 
        if(this.remarkDetail.length > 0){
          this.remarkDetail.map((rec,index)=>{
            for(let key in rec.remarks){
              let obj = {
                remark: rec.remarks[key].remark,
                date: rec.remarks[key].remark_submitted_date,
                username:rec.user.firstname + " " + rec.user.lastname
              }
              this.sortedRemarks.push(obj)
            }
            })
            this.sortedRemarks.sort((a,b) =>{
              let A = new Date(a.date)
              let B = new Date(b.date)
              return A.valueOf()-B.valueOf() ;
          });
        }    
      }  
    })
    this.assignloanService.getAppListDetails(user_id).subscribe(res=>{ 
      if(res){ this.appListDetails = res.data; 
      }
    })
  }

  changeStatus(assignloan, key){ 
    const email = this.assignloans.email;
    const loan_id = this.route.snapshot.url[1].path; 
    let status = assignloan[key];   
    this.assignloanService.changeStatus(status, loan_id, key, email)
    .subscribe(response=>{ 
      this.toastr.success(response.message, 'Success');
      setInterval(() => {
        window.close(); 
      }, 3000); 
    });
  } 

  remarkSubmission(value){
    if(value.remark.replace(/ /g, "").length == 0){
      this.toastr.error('Please Provide Some Remark', 'Error'); 
    }else{
      const loan_id = this.route.snapshot.url[1].path; 
      this.assignloanService.submitReview(value,loan_id)
      .subscribe(response=>{ 
        this.toastr.success(response.message, 'Success');
      });
    }
  }

}