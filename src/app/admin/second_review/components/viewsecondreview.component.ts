import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecondreviewService } from '../service/secondreview.service';
import { PermissionService } from '../../permissions/service/permission.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'view-second-review',
  templateUrl: '../templates/viewsecondreview.component.html'
})
export class ViewSecondreviewComponent implements OnInit {
  loading = false;
  public secondreview: User;
  public basic: any;
  public empInfo: any;
  bankInfo: any;
  kycInfo: any;
  collegeDetail: any;
  businessDetail: any;
  status: any;
  secondReviewLoan: any; 
  refInfo: any;
  secondreviews: User;
  adharContact: string;
  contactDetail: any;
  loanStatus: boolean;
  users: User;
  regMobNo: any;
  customer_id: any;
  response1: any;
  countUserLoan: any;
  loanApplyCount: string;
  loanHistory: any; 
  selected_loan_id: any;
  public remarkReview = {
    "remark" : "",
  };
  remarkDetail: any;
  sortedRemarks: any[] = [];
  adhaarStatus: any;
  appListDetails: any;
  per_missions: any;
  userId:number;
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private secondreviewService: SecondreviewService,
    private toastr: ToastrService,
    private titleService:Title,
    private permissionService : PermissionService,
    ) {
      this.titleService.setTitle("View Second Review");
    }
  ngOnInit() { 

    this.permissionService.checkPermission().subscribe(res=>{ 
      if(res){  
        this.per_missions = res.user   
      }    
    })
    const user_id = this.route.snapshot.paramMap.get('user_id'); 
    const loan_id = this.route.snapshot.url[1].path;

     this.userId = Number(user_id) 

    this.secondreviewService.getSecondreviewView(user_id).subscribe(res=>{  
      if(res){ this.secondreview = res.data; }  
    })

    this.secondreviewService.getBasicInfo(user_id).subscribe(res=>{  
      if(res){ this.basic = res.data; }  
    })
    this.secondreviewService.getEmpInfo(user_id).subscribe(res=>{ 
      if(res){ this.empInfo = res.data[0];}   
    })
    this.secondreviewService.getBankInfo(user_id).subscribe(res=>{ 
      if(res){ this.bankInfo = res.data; }
    })
    this.secondreviewService.getRefInfo(user_id).subscribe(res=>{ 
      if(res){ this.refInfo = res.data; }    
    })
    this.secondreviewService.getKycInfo(user_id).subscribe(res=>{ 
      if(res){ 
        this.kycInfo = res.data[0];
        this.adhaarStatus = this.kycInfo.adhaar_status; 
      }   
    })
    this.secondreviewService.getCollegeDetails(user_id).subscribe(res=>{ 
      if(res){ this.collegeDetail = res.data[0]; }
    })
    this.secondreviewService.getBusinessDetails(user_id).subscribe(res=>{ 
      if(res){ this.businessDetail = res.data[0]; }  
    })
    this.secondreviewService.getApplyLoanDetails(loan_id, user_id).subscribe(res=>{   
      if(res){ 
        this.secondReviewLoan = res.data;
        this.loanStatus = res.status; 
        this.countUserLoan = res.countUserLoan.count;
        this.loanApplyCount = this.countUserLoan == 1 ? 'Fresh' : 'Re-Apply';  
      }    
    }) 
    this.secondreviewService.getContactDetails(user_id).subscribe(res=>{ 
      if(res){ this.contactDetail = res.data; }    
    })
    this.secondreviewService.getUsers().subscribe(res=>{ 
      if(res){ this.users = res.data; }  
    })
    this.secondreviewService.getLoanHistory(user_id).subscribe(res=>{ 
      if(res){ this.loanHistory = res.data; } 
    });
    this.secondreviewService.getRemarksDetails(loan_id).subscribe(res=>{ 
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
    this.secondreviewService.getAppListDetails(user_id).subscribe(res=>{ 
      if(res){ this.appListDetails = res.data; 
      }
    })
  }
  
  changeStatus(secondreviews, key, trans_id){
    const loan_id = this.route.snapshot.url[1].path; 
    let status = secondreviews[key];   
    let customerDetails = this.secondreview; 
    this.secondreviewService.changeStatus(status, loan_id, key, secondreviews, customerDetails, trans_id)
    .subscribe(response=>{ 
      this.toastr.success(response.message, 'Success'); 
      setInterval(() => {
        window.close(); 
      }, 3000);
      // this.router.navigate(['/second_review']);
    });
  } 

  changeStatusPending(trans_id){
    const loan_id = this.route.snapshot.url[1].path;
    this.secondreviewService.changeStatusPending(loan_id, trans_id)
    .subscribe(response=>{ 
      this.toastr.success(response.message, 'Success'); 
      setInterval(() => {
        window.close(); 
      }, 3000);
      // this.router.navigate(['/second_review']);
    });  
  }
  
  disburseMoney(){ 
    const user_id = this.route.snapshot.paramMap.get('user_id');   
    this.secondreviewService.getSecondreviewView(user_id).subscribe(res=>{   
    if(res){ this.secondreviews = res.data; }    
      const beneficiaryId = this.secondreviews.beneficiary_id;
      const reqAmount = this.secondReviewLoan.disbursed_amount;
      const trans_id = ('tranfer'+new Date().getTime()); 
      this.secondreviewService.disburseMoney(beneficiaryId, reqAmount, trans_id)
      .subscribe(response=>{ 
        if(response.subCode == "200"){
          this.loading = false;  
          this.toastr.success(response.message, 'Success');
          this.changeStatus(this.secondReviewLoan,'status',trans_id); 
        }else if(response.subCode == "201" || response.subCode == "202") {
          this.loading = false;
          this.toastr.error(response.message, 'Error');
          this.changeStatusPending(trans_id);
        } else{
          this.loading = false;
          this.toastr.error(response.message, 'Error');  
        } 
      });
    }) 
  } 

  addBeneficiary(){        
    this.loading = true;
    const beneficiaryId = this.secondreview.beneficiary_id; 
    if(beneficiaryId == null){ 
      const user_id = this.route.snapshot.paramMap.get('user_id');  
      this.secondreviewService.addBeneficiary(user_id)
      .subscribe(response=>{  
        if(response.subCode == "200"){ 
          this.disburseMoney(); 
        }else{
          this.loading = false;
          this.toastr.error(response.message, 'Error');  
        } 
      });
    }else{
      this.disburseMoney();
    }
  }  

  // viewAdhaarNo(adhaar_no){   
  //     this.customer_id = this.secondreview.user_id; 
  //     this.loading = true; 
  //     this.secondreviewService.adhaarValidation(adhaar_no, this.customer_id)
  //     .subscribe(response=>{ 
  //       // this.status_code = response;
  //       // const {status_code} = response;
  //       console.log("Responsesssss:", response);
  //       if(response.subCode == "200"){ 
  //         this.disburseMoney(); 
  //       }else{
  //         this.loading = false;
  //         this.toastr.error( 'Error');  
  //       } 
  //     });
  //   }

  viewAdhaarNo(adhaar_no){   
    this.customer_id = this.secondreview.user_id; 
    this.loading = true; 
    this.secondreviewService.adhaarValidation(adhaar_no, this.customer_id)
    .subscribe(response=>{  
      if(response['error'] == true){  
        this.loading = false; 
        this.toastr.error(response['message'], 'Error'); 
      }else{ 
        this.loading = false;
        this.adhaarStatus = 1;
        this.toastr.success(response['message'], 'Success');
      } 
    });
  }  
  
  remarkSubmission(value){
    if(value.remark.replace(/ /g, "").length == 0){
      this.toastr.error('Please Provide Some Remark', 'Error'); 
    }else{
      const loan_id = this.route.snapshot.url[1].path; 
      this.secondreviewService.submitReview(value,loan_id)
      .subscribe(response=>{ 
        this.toastr.success(response.message, 'Success'); 
      });
    }
  }
}