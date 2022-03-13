import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApprovalReportService } from '../service/approvalreport.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr'; 
import {Title} from "@angular/platform-browser"; 

declare var $: any; 

@Component({
  selector: 'list-overall-customer',
  templateUrl: '../templates/listapprovalreport.component.html'
})

export class ListApprovalReportComponent implements OnInit {

  public approvalreports: Array<User>;
  public indexOfClickedRow:number;
  /* pagination */
  p: number = 1;
  limit: number = 10;
  total: number;
  length: any;
  isLoading: boolean;
  isSearching: boolean;
  searchOptions: object;
  public searchapprovalreport = {
    "from_date" : "",
    "to_date" : "",
    "loan_id" : "", 
    "mobile_no" : "",
    "email" : "",
    "name" :"",
    "user_type" : "",
    "tenure" : "",
    "status" : "",
    "amount":"",
    "id_number":"",
    "reviewer":"",
    "assigner":""
  };
  loanStatus: any; 
  approvalreportsCopy: User;
  user_types = [
    { id: 0, name: "Student" },
    { id: 1, name: "Employee" },
    { id: 2, name: "Self Employee" },
  ];

  tenures = [
    { id: 1, days: 7 },
    { id: 2, days: 14 },
    { id: 3, days: 21 },
    { id: 3, days: 28 },
  ];

  amounts = [
    { id: 1, amount: 500 },
    { id: 2, amount: 1000 },
    { id: 3, amount: 1500 },
    { id: 4, amount: 2000 },
    { id: 1, amount: 2500 },
    { id: 2, amount: 3000 },
    { id: 3, amount: 3500 },
    { id: 4, amount: 4000 },
    { id: 1, amount: 4500 },
    { id: 2, amount: 5000 },
    { id: 3, amount: 6500 },
    { id: 4, amount: 7000 },
  ]; 
  assignerLists: any;
  reviewers: any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private approvalreportService: ApprovalReportService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Approval Report"); 
    }

  
  ngOnInit(){  
    this.getApprovalReportLoanDetail(this.p);
    this.approvalreportService.getStatus().subscribe(res=>{ 
      if(res){ this.loanStatus = res.data; } 
    })
    this.approvalreportService.getReviewer().subscribe(res=>{ 
      if(res){ this.reviewers = res.data; }  
    })
    
    this.approvalreportService.getAssignerList().subscribe(res=>{ 
      if(res){ this.assignerLists = res.data; }  
    }) 
  }

  getPage(pageNo: number) {
    this.p = pageNo;
    if(this.isSearching) {
      this.doSearch();
    } else {
      this.getApprovalReportLoanDetail(this.p);
    }
  }

  fieldReset() {
     this.searchapprovalreport = {
        "from_date" : "",
        "to_date" : "",
        "loan_id" : "", 
        "mobile_no" : "",
        "email" : "",
        "name" :"",
        "user_type" : "",
        "tenure" : "",
        "status" : "",
        "amount":"",
        "id_number":"",
        "reviewer":"",
        "assigner":""
      }
  }

  getApprovalReportLoanDetail(p: number) {
    let offset = (p - 1) * this.limit;
    this.isLoading = true;
    this.approvalreports = new Array<User>();
    this.approvalreportService.getApprovalReportLoan(offset, this.limit).subscribe(
      result => { 
        this.approvalreports = result.data;
        this.length =this.approvalreports.length;
        this.total = result.total; 
        this.isLoading = false;
      }
    )
  }

  reset() { 
    this.limit = 10;
    this.fieldReset();
    this.isSearching = false;
    this.p = 1;
    this.total = 0;
    this.getPage(1);
  }  

  refresh(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]); 
  }
  
  changeStatus(approvalreport, key){
    let status = approvalreport[key];
    this.approvalreportService.changeStatus(status, approvalreport.loan_id, key)
    .subscribe(response=>{ 
      this.toastr.success(response.message, 'Success'); 
    });
  } 

  searchLoan(value) { 
    this.searchOptions = value;
    this.p = 1; 
    this.total = 0;
    this.doSearch()
  }

  doSearch(){
    this.isLoading = true;
    this.isSearching = true;
    this.approvalreports = new Array<User>();
    let offset = (this.p - 1) * this.limit;  

    this.approvalreportService.searchLoan(this.searchOptions, offset, this.limit)
      .subscribe(
      res => { 
          if(res){ 
            this.approvalreports = [].concat(res.data);
            this.length = this.approvalreports.length || 0;
            this.total = Number(res.total || 0 ); 
          }
          this.isLoading = false;
      }, 
      error => {
          console.log(error);
      }
    );
  }
}

