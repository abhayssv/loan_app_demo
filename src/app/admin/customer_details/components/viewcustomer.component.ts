import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';  
import {Title} from "@angular/platform-browser"; 
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'view-customer',
  templateUrl: '../templates/viewcustomer.component.html'
})
export class ViewCustomerComponent implements OnInit {

  public customer: User;
  public basic: any;
  public empInfo: any;
  bankInfo: any;
  kycInfo: any;
  collegeDetail: any;
  businessDetail: any;
  status: any;
  customerLoan: any;
  refInfo: User;
  secondreviews: User;
  loading: boolean;
  adharContact: string;
  contactDetail: User;
  loanStatus: any; 
  countUserLoan: any;
  loanApplyCount: string;
  users: User;
  customer_id: any;
  response1: any;
  regMobNo: any;
  loanHistory: User;
  selected_loan_id: number;
  public remarkReview = {
    "remark" : "",
  };
  remarkDetail: any;
  sortedReviewerRemarks: any[] = [];
  sortedCollectionRemarks: any[] = [];
  adhaarStatus: any;
  panStatus:any;
  appListDetails: any;
  reasonToreject: string = '';
  enableAadarBtn:boolean = false;
  enablePanBtn:boolean =false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private customerService: CustomerService,
    private toastr: ToastrService,
    private titleService:Title,
    private modalService: NgbModal,
    ){ 
      this.titleService.setTitle("View Customer Detail"); 
    }
  ngOnInit() { 
    this.getSettings();
    this.customer = this.route.snapshot.data['customer'].data;
    const loan_id = this.route.snapshot.url[1].path;
    const customer_id = this.route.snapshot.paramMap.get('user_id'); 
    this.customerService.getBasicInfo(customer_id).subscribe(res=>{  
      if(res){ this.basic = res.data; }  
    })
    this.customerService.getRefInfo(customer_id).subscribe(res=>{ 
      if(res){ this.refInfo = res.data; }    
    })
    this.customerService.getEmpInfo(customer_id).subscribe(res=>{ 
      if(res){ this.empInfo = res.data[0];}   
    })
    this.customerService.getBankInfo(customer_id).subscribe(res=>{ 
      if(res){ this.bankInfo = res.data; }
    })
    this.customerService.getKycInfo(customer_id).subscribe(res=>{ 
      if(res){ 
        this.kycInfo = res.data[0]; 
        this.adhaarStatus = this.kycInfo.adhaar_status; 
        this.panStatus = this.kycInfo.pan_status; 
      }  
    })
    this.customerService.getCollegeDetails(customer_id).subscribe(res=>{ 
      if(res){ this.collegeDetail = res.data[0]; }
    })
    this.customerService.getBusinessDetails(customer_id).subscribe(res=>{ 
      if(res){ this.businessDetail = res.data[0]; }  
    })
    this.customerService.getApplyLoanDetails(loan_id, customer_id).subscribe(res=>{   
      if(res){ 
        console.log(res.data)
        this.customerLoan = res.data;
        this.loanStatus = res.status;   
        this.countUserLoan = res.countUserLoan.count;
        this.loanApplyCount = this.countUserLoan == 1 ? 'Fresh' : 'Re-Apply';   
      } 
    }) 
    this.customerService.getContactDetails(customer_id).subscribe(res=>{ 
      if(res){ this.contactDetail = res.data; }    
    })
    this.customerService.getUsers().subscribe(res=>{ 
      if(res){ this.users = res.data; }  
    })
    this.customerService.getLoanHistory(customer_id).subscribe(res=>{ 
      if(res){ this.loanHistory = res.data; } 
    })
    
    this.customerService.getReviewerRemarksDetails(loan_id).subscribe(res=>{  
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
    
    this.customerService.getCollectionRemarksDetails(loan_id).subscribe(res=>{  
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
    this.customerService.getAppListDetails(customer_id).subscribe(res=>{ 
      if(res){ this.appListDetails = res.data; 
      }
    })
  }

  getSettings() {
    this.customerService.getSettings().subscribe(res=>{ 
      if(res.data) { 
       this.enableAadarBtn = !!res.data.aadar_verification;
       this.enablePanBtn = !!res.data.pan_verification;
      }
    });
  }
  
  changeStatus(customerInfo, key) {
    const customerLoan = { ...customerInfo, ...{ status: 5}}
    const loan_id = this.route.snapshot.url[1].path; 
    let status = customerLoan[key];   
    let customerDetails = this.customer;
    const reason = this.reasonToreject;   
    this.customerService.changeStatus(status, loan_id, key, customerLoan, customerDetails, reason)
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

  changeStatusPending(trans_id){
    const loan_id = this.route.snapshot.url[1].path;
    this.customerService.changeStatusPending(loan_id, trans_id)
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
    this.customerService.getCustomerView(user_id).subscribe(res=>{   
      if(res){ this.secondreviews = res.data; }    
      const beneficiaryId = this.secondreviews.beneficiary_id;
      const reqAmount = this.customerLoan.disbursed_amount;
      const trans_id = ('tranfer'+new Date().getTime()); 
      this.customerService.disburseMoney(beneficiaryId, reqAmount, trans_id)
      .subscribe(response=>{ 
        if(response.subCode == "200"){
          this.loading = false;  
          this.toastr.success(response.message, 'Success');
          this.changeStatus(this.customerLoan,'status'); 
        }else if(response.subCode == "201" || response.subCode == "202") {
          this.loading = false;
          this.toastr.error(response.message, 'Error');
          this.changeStatusPending(trans_id);
        }else{
          this.loading = false;
          this.toastr.error(response.message, 'Error');  
        } 
      });
    }) 
  } 

  addBeneficiary(){        
    this.loading = true;
    const beneficiaryId = this.customer.beneficiary_id; 
    if(beneficiaryId == null){ 
      const user_id = this.route.snapshot.paramMap.get('user_id');  
      this.customerService.addBeneficiary(user_id)
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
  //   this.customer_id = this.customer.user_id; 
  //   this.loading = true; 
  //   this.customerService.getAdhaarDetails(adhaar_no, this.customer_id)
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

  changeBannedStatus(customerLoan, key){ 
    const loan_id = customerLoan.loan_id; 
    const user_id = customerLoan.user_id; 
    const user_status = '0';
    let status = customerLoan[key];      
    this.customerService.changeBannedStatus(status, loan_id, user_id, user_status )
    .subscribe(response=>{ 
      this.toastr.success("Loan and user banned sucessfully", 'Success'); 
      setInterval(() => {
        window.close(); 
      }, 3000); 
    });
  } 

  changeUnBannedStatus(customerLoan, key){ 
    const loan_id = customerLoan.loan_id; 
    const user_id = customerLoan.user_id; 
    const user_status = '1';
    let status = customerLoan[key];      
    this.customerService.changeUnBannedStatus(status, loan_id, user_id, user_status )
    .subscribe(response=>{ 
      this.toastr.success("Loan Reject and user unbanned sucessfully", 'Success'); 
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
      this.customerService.submitReview(value,loan_id)
      .subscribe(response=>{ 
        this.toastr.success(response.message, 'Success');
        setInterval(() => {
          window.close(); 
        }, 3000); 
      });
    }
  } 
  
  viewAdhaarNo(adhaar_no){   
    this.customer_id = this.customer.user_id; 
    this.loading = true; 
    this.customerService.adhaarValidation(adhaar_no, this.customer_id)
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

   viewPANNo(pan_no){   
    this.customer_id = this.customer.user_id; 
    this.loading = true; 
    this.customerService.panValidation(pan_no, this.customer_id)
    .subscribe(response=>{  
      if(response['error'] == true){  
        this.loading = false; 
        this.toastr.error(response['message'], 'Error'); 
      }else{ 
        this.loading = false;
        this.panStatus = 1;
        this.toastr.success(response['message'], 'Success');
      } 
    });
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