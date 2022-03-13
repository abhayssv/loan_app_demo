import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OverallCustomerService } from '../service/overallcustomer.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';  
import { Title } from "@angular/platform-browser";

declare var $: any; 

@Component({
  selector: 'list-overall-customer',
  templateUrl: '../templates/listoverallcustomer.component.html'
})

export class ListOverallCustomerComponent implements OnInit {

  public overallcustomers: Array<User>;
  public indexOfClickedRow:number;
  /* pagination */
  p: number = 1;
  limit: number = 10;
  total: number;
  length: any;
  public searchoverallcustomer = {
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
  overallcustomersCopy: any;
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
  reviewers: User;
  assignerLists: User;
  isLoading: boolean;
  isSearching: boolean;
  searchOptions: object;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private overallcustomerService: OverallCustomerService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Overall Customer Applied"); 
    }

  
  ngOnInit(){   
    this.getOverallLoanDetail(this.p);
    this.overallcustomerService.getStatus().subscribe(res=>{ 
      if(res){ this.loanStatus = res.data; } 
    })  
    this.overallcustomerService.getReviewer().subscribe(res=>{ 
      if(res){ this.reviewers = res.data; }  
    })
    
    this.overallcustomerService.getAssignerList().subscribe(res=>{ 
      if(res){ this.assignerLists = res.data; }  
    }) 
  }

  getPage(pageNo: number) {
    this.p = pageNo;
    if(this.isSearching) {
      this.doSearch();
    } else {
       this.getOverallLoanDetail(this.p);
    }
  }

  getOverallLoanDetail(p: number) {
    let offset = (p - 1) * this.limit;
    this.isLoading = true;
    this.overallcustomerService.getOverallLoan(offset, this.limit).subscribe(
      result => { 
        this.overallcustomers = result.data;
        this.length =this.overallcustomers.length;
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

  fieldReset() {
    this.searchoverallcustomer = {
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
  
  refresh(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]); 
  }

  changeStatus(overallcustomer, key){
    let status = overallcustomer[key];
    this.overallcustomerService.changeStatus(status, overallcustomer.loan_id, key)
    .subscribe(response=>{ 
      this.toastr.success(response.message, 'Success'); 
    });
  } 

  search(value){ 
    this.searchOptions = value;
    this.p = 1; 
    this.total = 0;
    this.doSearch()
  }

  doSearch(){ 
    this.isLoading = true;
    this.isSearching = true;
    this.overallcustomers = new Array<User>();
    let offset = (this.p - 1) * this.limit;
    this.overallcustomerService.searchLoan(this.searchOptions,offset, this.limit)
      .subscribe(
      res => { 
          if(res){
            this.total = Number(res.total || 0 ); 
            this.overallcustomers = [].concat(res.data);
            this.length = this.overallcustomers.length || 0;
          }
          this.isLoading = false;
      }, 
      error => {
          console.log(error);
      }
    );
  }
}

