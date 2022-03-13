import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CashFlattingService } from '../service/cashflatting.service';
import { User } from '../../../models/user';

@Component({
  templateUrl: '../templates/viewcashflatting.component.html'
})
export class ViewCashFlattingComponent implements OnInit {

  public cashflattings: User;
  public basic: any;
  public empInfo: any;
  bankInfo: any;
  kycInfo: any;
  collegeDetail: any;
  businessDetail: any;
  contactDetail: any;
  adharContact: string;
  regMobNo: any;
  cashflatting: any;
  loanStatus: any;
  countUserLoan: any;
  loanApplyCount: string;
  status: User;
  users: any;
  refInfo: any;
  appListDetails: any;
  selected_loan_id: number = null;
  loanHistory: Array<any>;
  transSummary:any;

  constructor(
    private route: ActivatedRoute, 
    private cashflattingService: CashFlattingService
  ) {
  }
  ngOnInit() { 
    const user_id = this.route.snapshot.paramMap.get('user_id'); 
    this.cashflattingService.getCashFlattingView(user_id).subscribe(res=>{
      if(res){
        this.cashflattings = res.data;
      }
    });

    const loan_id = this.route.snapshot.url[1].path;  

    this.cashflattingService.getBasicInfo(user_id).subscribe(res=>{  
      if(res){ 
        this.basic = res.data; 
      }  
    });

    this.cashflattingService.getRefInfo(user_id).subscribe(res=>{ 
      if(res){ 
        this.refInfo = res.data; 
      }    
    });

    this.cashflattingService.getEmpInfo(user_id).subscribe(res=>{ 
      if(res){ 
        this.empInfo = res.data[0];
      }   
    });

    this.cashflattingService.getBankInfo(user_id).subscribe(res=>{ 
      if(res){ 
        this.bankInfo = res.data; 
      }
    });

    this.cashflattingService.getLoanHistory(user_id).subscribe(res=>{ 
      if(res) { 
        this.loanHistory = [].concat(res.data); 
      } 
    });

    this.cashflattingService.getKycInfo(user_id).subscribe(res=>{ 
      if(res){ 
        this.kycInfo = res.data[0]; 
        this.regMobNo = this.kycInfo.reg_mob_no;
      }  
    })

    this.cashflattingService.getCollegeDetails(user_id).subscribe(res=>{ 
      if(res){ 
        this.collegeDetail = res.data[0]; 
      }
    })

    this.cashflattingService.getBusinessDetails(user_id).subscribe(res=>{ 
      if(res){ 
        this.businessDetail = res.data[0]; 
      }  
    })

    this.cashflattingService.getApplyLoanDetails(loan_id, user_id).subscribe(res=>{   
      if(res){ 
        this.cashflatting = res.data;
        this.loanStatus = res.status;   
        this.countUserLoan = res.countUserLoan.count;
        this.loanApplyCount = this.countUserLoan == 1 ? 'Fresh' : 'Re-Apply';   
      } 
    }) 

    this.cashflattingService.getContactDetails(user_id).subscribe(res=>{ 
      if(res){ 
        this.contactDetail = res.data; 
      }    
    })

    this.cashflattingService.getUsers().subscribe(res=>{ 
      if(res){ 
        this.users = res.data; 
      }  
    })

    this.cashflattingService.getAppListDetails(user_id).subscribe(res=>{ 
      if(res){ 
        this.appListDetails = res.data; 
      }
    })

     this.cashflattingService.getTransactionsByLoanId(loan_id).subscribe(res=>{ 
      if(res){ 
        this.transSummary = res.data; 
      }
    })
    
  }
  viewAdhaarNo(){ 
    this.adharContact = "Null";
  }
  
}