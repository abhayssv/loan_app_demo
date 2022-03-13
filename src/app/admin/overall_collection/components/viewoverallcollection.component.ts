import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverallCollectionService } from '../service/overallcollection.service';
import { PermissionService } from '../../permissions/service/permission.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Permissions } from '../../../models/permissions'; 
import { Title } from "@angular/platform-browser";
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'view-overall-collection',
  templateUrl: '../templates/viewoverallcollection.component.html'
})
export class ViewOverallCollectionComponent implements OnInit {

  public overallcollections: User;
  public basic: any;
  public empInfo: any;
  bankInfo: any;
  kycInfo: any;
  collegeDetail: any;
  businessDetail: any;
  applyLoanDetail: any;
  status: any;
  regMobNo: any;
  cashflatting: any;
  loanStatus: any;
  countUserLoan: any;
  loanApplyCount: string;
  contactDetail: any;
  users: any;
  refInfo: User;
  overallcollection: User;
  public remarkReview = {
    "remark" : "",
  };
  remarkDetail: any;
  sortedReviewerRemarks: any[] = [];
  sortedCollectionRemarks: any[] = [];
  per_missions: any;
  subcategory: Permissions;
  dataArray = [];
  userModule: string[];
  appListDetails: any;
  contact_permission: any;
  reminder:any;
  loan_id:any;
  loanHistory:any;
  userId:number;
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private overallCollectionService: OverallCollectionService,
    private toastr: ToastrService,
    private permissionService : PermissionService,
    private titleService:Title,
    private modalService: NgbModal,
  ) {
    this.titleService.setTitle("View Overall Collection");
  }
  ngOnInit() {  
    const user_id = this.route.snapshot.paramMap.get('user_id');
    const loan_id = this.route.snapshot.url[1].path;  
    this.loan_id = loan_id;
    this.userId = Number(user_id);
    this.overallCollectionService.getOverallCollection(user_id).subscribe(res=>{  
      if(res){ 
        this.overallcollections = res.data; }  
    })

    this.overallCollectionService.getLoanHistory(user_id).subscribe(res=>{ 
      if(res){ this.loanHistory = res.data; } 
    });

    this.overallCollectionService.getBasicInfo(user_id).subscribe(res=>{  
      if(res){ this.basic = res.data; }  
    })
    this.overallCollectionService.getEmpInfo(user_id).subscribe(res=>{ 
      if(res){ this.empInfo = res.data[0];}   
    })
    this.overallCollectionService.getRefInfo(user_id).subscribe(res=>{ 
      if(res){ this.refInfo = res.data; }    
    })
    this.overallCollectionService.getBankInfo(user_id).subscribe(res=>{ 
      if(res){ this.bankInfo = res.data; }
    })
    this.overallCollectionService.getKycInfo(user_id).subscribe(res=>{ 
      if(res){ 
        this.kycInfo = res.data[0]; 
        this.regMobNo = this.kycInfo.reg_mob_no;
      }  
    })
    this.overallCollectionService.getCollegeDetails(user_id).subscribe(res=>{ 
      if(res){ this.collegeDetail = res.data[0]; }
    })
    this.overallCollectionService.getBusinessDetails(user_id).subscribe(res=>{ 
      if(res){ this.businessDetail = res.data[0]; }  
    })
    this.overallCollectionService.getApplyLoanDetails(loan_id, user_id).subscribe(res=>{   
      if(res){ 
        this.overallcollection = res.data;
        this.loanStatus = res.status;   
        this.countUserLoan = res.countUserLoan.count;
        this.loanApplyCount = this.countUserLoan == 1 ? 'Fresh' : 'Re-Apply';   
      } 
    }) 
    this.overallCollectionService.getContactDetails(user_id).subscribe(res=>{ 
      if(res){ this.contactDetail = res.data; }    
    })
    this.overallCollectionService.getUsers().subscribe(res=>{ 
      if(res){ this.users = res.data; }  
    })
    this.overallCollectionService.getReviewerRemarksDetails(loan_id).subscribe(res=>{ 
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
              this.sortedReviewerRemarks.push(obj)
            }
            })
            this.sortedReviewerRemarks.sort((a,b) =>{
              let A = new Date(a.date)
              let B = new Date(b.date)
              return A.valueOf()-B.valueOf() ;
          });
        }    
      }  
    })
    this.overallCollectionService.getCollectionRemarksDetails(loan_id).subscribe(res=>{ 
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
              this.sortedCollectionRemarks.push(obj)
            }
            })
            this.sortedCollectionRemarks.sort((a,b) =>{
              let A = new Date(a.date)
              let B = new Date(b.date)
              return A.valueOf()-B.valueOf() ;
          });
        }    
      }  
    })
    this.permissionService.checkPermission().subscribe(res=>{ 
      if(res){ 
        this.subcategory = res.data; 
        this.per_missions = res.permission;
        this.contact_permission = res.user   
        let stringified=JSON.stringify(this.per_missions); 
        JSON.parse(stringified).forEach(element => this.dataArray.push(element.per_name)); 
      }    
    })
    this.overallCollectionService.getAppListDetails(user_id).subscribe(res=>{ 
      if(res){ this.appListDetails = res.data; 
      }
    })
  } 

  reminderPopup(rempopup) {
    this.reminder = { choose_date: '', description: '' ,loan_id : this.loan_id}
    this.modalService.open(rempopup, { backdropClass: 'dark-modal', centered: true }); 
  }
  saveReminder() {
    if(this.reminder.description &&  this.reminder.choose_date && this.reminder.loan_id){
      this.overallCollectionService.addReminder(this.reminder).subscribe(res=>{ 
        this.modalService.dismissAll();
        if(!res.error) { 
          this.toastr.success(res.message, 'Success'); 
        } else {
          this.toastr.error(res.message, 'Failed'); 
        }
      });
    } else {
      let message = this.reminder.choose_date ? 'Please Add Some Reminder': 'Please Add Reminder Time'
      if(!this.reminder.loan_id) {
        message = 'Please Add Loan Id';
      }
      this.toastr.error(message, 'Failed');
    }
  }

  remarkSubmission(value){
    if(value.remark.replace(/ /g, "").length == 0){
      this.toastr.error('Please Provide Some Remark', 'Error'); 
    }else{
      const loan_id = this.route.snapshot.url[1].path; 
      this.overallCollectionService.submitReview(value,loan_id)
      .subscribe(response=>{ 
        this.toastr.success(response.message, 'Success'); 
      });
    }
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