import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewerReportService } from '../service/reviewerreport.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr'; 
import { Title } from "@angular/platform-browser";
import { ngxCsv } from 'ngx-csv/ngx-csv';

declare var $: any; 

@Component({
  selector: 'list-reviewer-report',
  templateUrl: '../templates/listreviewerreport.component.html'
})

export class ListReviewerReportComponent implements OnInit {

  public reviewerreports: Array<User>;
  public indexOfClickedRow:number;
  public searchreviewerreport = {
    "from_date":"",
    "to_date":"",
    "loan_id" : "",
    "name" : "",
    "mobile_no" : "",
    "email" : "", 
    "user_type" : "",
    "tenure" : "",
    "status" : "",
    "amount":"",
    "id_number":"",
    "reviewer":"",
    "assigned_users":"" 
  };

  /* pagination */
  p: number = 1;
  limit: number = 10;
  total: number;
  length: any;

  status: any;  
  loanStatus: Array<object>;
  reviewerreportsCopy: any;  
  userRole: any;
  users: any;
  statusByRole: any; 
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
  exportData: any;
  exportReviewerReport: User;
  isLoading: boolean;
  isSearching: boolean;
  searchOptions: object;
  exporting: boolean = false;
  isExport: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private reviewerreportService: ReviewerReportService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Reviewer Report"); 
    }  
 
  ngOnInit(){   
    this.getReviewerReportLoan(this.p);
    this.reviewerreportService.getStatus().subscribe(res=>{ 
      if(res){ this.status = res.data; }  
      this.loanStatus = this.status; 
    }) 
  } 

  reset() { 
    this.limit = 10;
    this.fieldReset();
    this.isSearching = false;
    this.isExport = false;
    this.statusByRole = null;
    this.p = 1;
    this.total = 0;
    this.getPage(1);
  } 

  getPage(pageNo: number) {
    this.p = pageNo;
    this.isExport = false;
    if(this.isSearching) {
      this.isLoading = true;
      this.getFilterdData();
    } else {
      this.getReviewerReportLoan(this.p);
    }
    
  }

  getReviewerReportLoan(p: number) {
    let offset = (p - 1) * this.limit;
    this.reviewerreports = new Array<User>();
    this.isLoading = true;

    this.reviewerreportService.getReviewerLoanReport(offset, this.limit).subscribe(
      res => { 
        if(res) {
         this.reviewerreports = [].concat(res.data);
         this.length = this.reviewerreports.length; 
         this.total = Number(res.total || 0);
        } 
        this.isLoading = false;
      }
    )
  } 

  onChangeReviewer(reviewer_id) {  
    this.users = []
    if (reviewer_id) {
      this.reviewerreportService.getStatusByRole(reviewer_id).subscribe(
        res => {
          this.statusByRole = res.data; 
          this.users = res.users;  
        }
      );
    } else {
      this.statusByRole = null; 
    }
  }

  search(value){ 
    this.searchOptions = value;
    this.p = 1; 
    this.total = 0;
    this.isSearching = true;
    this.isExport = false;
    this.reviewerreports = new Array<User>();
    this.isLoading = true;
    this.getFilterdData()
  }

  getFilterdData(){  
    let offset = (this.p - 1) * this.limit;
    this.reviewerreportService.getReviewerReport(this.searchOptions, offset, this.limit, this.isExport)
      .subscribe(
      res => { 
        this.isLoading = false;
        this.exporting = false;
        if(res.data && res.data.length) { 
          this.reviewerreports = [].concat(res.data);
          this.length = res.data.length; 
          this.total = Number(res.total || 0);
          
          if(this.isExport){
            this.exportData = [].concat(res.data);
            this.downloadExportedData()
          } 
        } else {
          this.toastr.error('Record not found.', 'Error');
          this.reviewerreports = [];
        } 
        
      }, 
      error => {
        console.log(error);
        this.isLoading = false
      }
    );
  }

  getAllDataToExport() {
    this.exporting = true;
    this.reviewerreportService.getReviewerReports()
      .subscribe(
      res => {  
        if(res.data && res.data.length){
          this.exportData = res.data 
          this.downloadExportedData();
        } else {
          this.toastr.error('Record not found.', 'Error');
        }
        this.exporting = false;
      },  
    );
  }

  fieldReset() {
     this.searchreviewerreport = {
        "from_date":"",
        "to_date":"",
        "loan_id" : "",
        "name" : "",
        "mobile_no" : "",
        "email" : "", 
        "user_type" : "",
        "tenure" : "",
        "status" : "",
        "amount":"",
        "id_number":"",
        "reviewer":"",
        "assigned_users":"" 
      }
  }
  
  downloadExportedData(){
    var list_tag = []; 
    console.log("Data", this.exportData);
    this.exportData.forEach((item)=>{ 
      const appUser = item.appUser || {}
      list_tag.push({
        "loan_id": item.loan_id,
        "username": appUser.username || '',
        "mobile_no":appUser.mobile_no || '',
        "email":appUser.email || '',
        "user_type":appUser.user_type ? (appUser.user_type == 0 ? "student":"employee") : '',
        "required_amount":item.required_amount, 
        "disbursed_amount":item.disbursed_amount,
        "remaining_amount": item.remaining_amount,
        "payable_date": item.payable_date,
        "status":item.loanStatus.status,
        "reviewer_1":item.appUserReviewer_1 != null ? item.appUserReviewer_1.firstname +  item.appUserReviewer_1.lastname: "Not Assigned",
        "reviewer_2":item.appUserReviewer_2 != null ? item.appUserReviewer_2.firstname +  item.appUserReviewer_2.lastname: "Not Assigned", 
      });
    });

    const listTag = list_tag; 
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Reviewer Sheet',
      useBom: true, 
      headers: ["Loan Id", "Customer Name", "Mobile Number", "Email", "User Type", "Required Amount", "disbursed_amount", "remaining_amount","payable_date", "Status", "reviewer_1", "reviewer_2"]
    }; 
    new ngxCsv(listTag, "Reviewer Sheet", options);
    this.toastr.success('Successfully Exported.');
  }

  exportSheet(){    
    if(this.isSearching) {
      this.isExport = true;
      this.exporting = true;
      this.getFilterdData();
    } else {
      this.getAllDataToExport();
    }
  }

  isShow = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}

