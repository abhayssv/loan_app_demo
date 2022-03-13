import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionReportService } from '../service/collectionreport.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';  
import { Title } from "@angular/platform-browser";
import { ngxCsv } from 'ngx-csv/ngx-csv';

declare var $: any; 

@Component({
  selector: 'list-collection-report',
  templateUrl: '../templates/listcollectionreport.component.html'
})

export class ListCollectionReportComponent implements OnInit {

  public collectionreports: Array<User>;
  public indexOfClickedRow:number;
  public searchcollectionreport = {
    "loan_id" : "",
    "name" : "",
    "mobile_no" : "",
    "email" : "",
    "amount":"",
    "collection_team":"",
    "assigned_users":"",
    "from_date":"",
    "id_number":"",
    "tenure":"",
    "to_date":"",
    "user_type":"",
  };

  /* pagination */
  p: number = 1;
  limit: number = 10;
  total: number;
  length: any;
  
  status: any;  
  loanStatus: Array<object>;
  collectionreportsCopy: any;  
  users: any;  
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
  exportCollectionReports: Array<User>;
  exportCollectionReport: any;
  exportData: any;
  isLoading: boolean;
  isSearching: boolean;
  searchOptions: object;
  exporting: boolean = false;
  isExport: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private collectionreportService: CollectionReportService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Collection Report");
    } 
 
  ngOnInit(){
    this.getCollectionsReportLoan(this.p);

    this.collectionreportService.getStatus().subscribe(res=>{ 
      if(res){ this.status = res.data; }  
      this.loanStatus = this.status; 
    }) 
  } 

  getPage(pageNo: number) {
    this.p = pageNo;
    if(this.isSearching) {
      this.isLoading = true;
      this.isExport = false;
      this.getFilteredData();
    } else {
      this.getCollectionsReportLoan(this.p);
    }
  }

  getCollectionsReportLoan(p: number) {
    let offset = (p - 1) * this.limit;
    this.isLoading = true;
    this.collectionreportService.getCollectionLoanReport(offset, this.limit).subscribe(
      result => { 
        this.collectionreports = result.data;  
        this.length =this.collectionreports.length;
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
    this.isExport = false;
    this.getPage(1);
  }

  fieldReset() {
     this.searchcollectionreport = {
      "loan_id" : "",
      "name" : "",
      "mobile_no" : "",
      "email" : "",
      "amount":"",
      "collection_team":"",
      "assigned_users":"",
      "from_date":"",
      "id_number":"",
      "tenure":"",
      "to_date":"",
      "user_type":"",
    }
  } 

  onChangeCollection(collection_id) {  
    if (collection_id) {
      this.collectionreportService.getUsers(collection_id).subscribe(
        res => {
          this.users = res.data;  
        }
      );
    } else {
      this.users = null; 
    }
  }

   search(value){ 
    this.searchOptions = value;
    this.p = 1; 
    this.total = 0;
    this.isSearching = true;
    this.collectionreports = new Array<User>();
    this.isLoading = true;
    this.isExport = false;
    this.getFilteredData();
  } 

  getFilteredData(){   
    let offset = (this.p - 1) * this.limit;
    this.collectionreportService.getCollectionReport(this.searchOptions,offset, this.limit, this.isExport)
      .subscribe(
      res => { 
          if(res === undefined){
            this.toastr.error('Record not found.', 'Error');
            this.length = 0;
          }
          if(res){ 
            this.collectionreports =  [].concat(res.data); 
            this.length = res.data.length; 
            this.total = Number(res.total || 0); 
            
            if(this.isExport) {
              this.exportData = [].concat(res.data);
              this.downloadExportedData()
            }
          }
          this.isLoading = false;
          this.exporting = false
      }, 
      error => {
          console.log(error);
          this.isLoading = false;
      }
    );
  }

  getAllDataToExport() {
    this.exporting = true;
    this.collectionreportService.getCollectionReports()
      .subscribe(
      res => {  
        this.exporting = false;
        if (res.data && res.data.length) {
          this.exportData = res.data;
          this.downloadExportedData();
        } else {

        }
      },  
    );
  }

  downloadExportedData() {
    var list_tag = []; 
    this.exportData.forEach((item)=>{ 
      list_tag.push({
        "loan_id": item.loan_id,
        "username": item.appUser.username,
        "mobile_no":item.appUser.mobile_no,
        "email":item.appUser.email,
        "user_type":item.appUser.user_type == 0 ? "student":"employee",
        "required_amount":item.required_amount, 
        "disbursed_amount":item.disbursed_amount,
        "remaining_amount": item.remaining_amount,
        "payable_date": item.payable_date,
        "status":item.loanStatus.status,
        "reviewer_1":item.appUserReviewer_1 != null ? item.appUserReviewer_1.firstname + " " + item.appUserReviewer_1.lastname:"Not Assigned",
        "reviewer_2":item.appUserReviewer_2 != null ? item.appUserReviewer_2.firstname + " " + item.appUserReviewer_2.lastname:"Not Assigned", 
        "customer_care":item.customerCare != null ? item.customerCare.firstname + " " + item.customerCare.lastname:"Not Assigned",
        "s1":item.S1 != null ? item.S1.firstname + " " +  item.S1.lastname: "Not Assigned", 
        "s2":item.S2 != null ? item.S2.firstname + " " + item.S2.lastname: "Not Assinged",
        "s3":item.S3 != null ? item.S3.firstname + " " + item.S3.lastname: "Not Assigned", 
        "m1":item.M1 != null ? item.M1.firstname + " " + item.M1.lastname: "Not Assigned",
        "m2":item.M2 != null ? item.M2.firstname + " " + item.M2.lastname: "Not Assigned", 
        "collection_manager":item.collectionManager != null ? item.collectionManager.firstname + " " + item.collectionManager.lastname: "Not Assigned", 
      });
    });

    const listTag = list_tag; 
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Collection Sheet',
      useBom: true, 
      headers: ["Loan Id", "Customer Name", "Mobile Number", "Email", "User Type", "Required Amount", "disbursed_amount", "remaining_amount","payable_date", "Status", "reviewer_1", "reviewer_2", "Customer Care", "S1", "S2", "S3", "M1", "M2", "Collection Manager"]
    }; 
    new ngxCsv(listTag, "Collection Sheet", options);
  }

  exportSheet(){
    if(this.isSearching) {
      this.isExport = true;
      this.exporting = true;
      this.getFilteredData()
    } else {
      this.getAllDataToExport(); 
    }
    
  }

  isShow = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}

