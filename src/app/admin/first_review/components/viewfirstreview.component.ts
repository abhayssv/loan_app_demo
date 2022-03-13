import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirstreviewService } from '../service/firstreview.service';
import { PermissionService } from '../../permissions/service/permission.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'view-first-review',
  templateUrl: '../templates/viewfirstreview.component.html'
})
export class ViewFirstreviewComponent implements OnInit {

  public firstreviews: User;
  public basic: any;
  public empInfo: any;
  bankInfo: any;
  kycInfo: any;
  collegeDetail: any;
  businessDetail: any;
  applyLoanDetail: any;
  status: any;
  refInfo: User;
  firstreview: User;
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
  reasonToreject: string = '';
  per_missions: any;
  selected_loan_id: number;
  userId:number

  
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private firstreviewService: FirstreviewService,
    private toastr: ToastrService,
    private titleService:Title,
    private modalService: NgbModal,
    private permissionService : PermissionService,
  ) {
    this.titleService.setTitle("View First Review");
  }
  ngOnInit() {   
    const user_id = this.route.snapshot.paramMap.get('user_id');  
    const loan_id = this.route.snapshot.url[1].path; 
    this.userId = Number(user_id)
    this.firstreviewService.getFirstreviewView(user_id).subscribe(res=>{ 
      if(res){ this.firstreviews = res.data; }    
    })

    this.permissionService.checkPermission().subscribe(res=>{ 
      if(res){  
        this.per_missions = res.user   
      }    
    })

    this.firstreviewService.getBasicInfo(user_id).subscribe(res=>{  
      if(res){ this.basic = res.data; }  
    })
    this.firstreviewService.getRefInfo(user_id).subscribe(res=>{ 
      if(res){ this.refInfo = res.data; }    
    })
    this.firstreviewService.getEmpInfo(user_id).subscribe(res=>{ 
      if(res){ this.empInfo = res.data[0];}  
    })
    this.firstreviewService.getBankInfo(user_id).subscribe(res=>{ 
      if(res){ this.bankInfo = res.data; }
    })
    this.firstreviewService.getKycInfo(user_id).subscribe(res=>{ 
      if(res){ 
        this.kycInfo = res.data[0]; 
        // this.regMobNo = this.kycInfo.reg_mob_no;
      }  
    })
    this.firstreviewService.getCollegeDetails(user_id).subscribe(res=>{ 
      if(res){ this.collegeDetail = res.data[0]; }
    })
    this.firstreviewService.getBusinessDetails(user_id).subscribe(res=>{ 
      if(res){ this.businessDetail = res.data[0]; }  
    }) 
    this.firstreviewService.getApplyLoanDetails(loan_id, user_id).subscribe(res=>{   
      if(res){ 
        this.firstreview = res.data;
        console.log("FIIII", this.firstreview);
        
        this.loanStatus = res.status;   
        this.countUserLoan = res.countUserLoan.count;
        this.loanApplyCount = this.countUserLoan == 1 ? 'Fresh' : 'Re-Apply';   
      } 
    }) 
    this.firstreviewService.getStatus().subscribe(res=>{ 
      if(res){ this.status = res.data; } 
      this.status.shift()   
    })
    this.firstreviewService.getContactDetails(user_id).subscribe(res=>{ 
      if(res){ this.contactDetail = res.data; }    
    })
    this.firstreviewService.getUsers().subscribe(res=>{ 
      if(res){ this.users = res.data; }  
    })
    this.firstreviewService.getLoanHistory(user_id).subscribe(res=>{ 
      if(res){ this.loanHistory = res.data; } 
    });
    this.firstreviewService.getRemarksDetails(loan_id).subscribe(res=>{ 
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
    this.firstreviewService.getAppListDetails(user_id).subscribe(res=>{ 
      if(res){ this.appListDetails = res.data; 
      }
    })
  }

  changeStatus(firstreview, key){ 
    const email = this.firstreviews.email;
    const loan_id = this.route.snapshot.url[1].path;
    const reason  = this.reasonToreject; 
    let status = firstreview[key];  
    this.firstreviewService.changeStatus(status, loan_id, key, email, reason)
    .subscribe(response=>{  
      this.toastr.success(response.message, 'Success');
      setInterval(() => {
        window.close(); 
      }, 3000); 
    });
  } 

  statusChangeConfirm(confirmpop) {
    this.modalService.open(confirmpop, { backdropClass: 'dark-modal', centered: true }); 
  }

  remarkSubmission(value){
    if(value.remark.replace(/ /g, "").length == 0){
      this.toastr.error('Please Provide Some Remark', 'Error'); 
    }else{
      const loan_id = this.route.snapshot.url[1].path; 
      this.firstreviewService.submitReview(value,loan_id)
      .subscribe(response=>{ 
        this.toastr.success(response.message, 'Success');
      });
    }
  }

}