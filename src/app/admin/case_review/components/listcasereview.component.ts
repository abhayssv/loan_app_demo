import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseReviewService } from '../service/casereview.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { Title } from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-second-review',
  templateUrl: '../templates/listcasereview.component.html'
})

export class ListCaseReviewComponent implements OnInit {

  public casereviews: Array<User>;
  public indexOfClickedRow:number;
  public searchcasereview = {
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
  status: any = [];
  casereviewsCopy: any;
  /* pagination */
  p: number = 1;
  limit: number = 10;
  total: number;
  length: any;
  isLoading: boolean;
  isSearching: boolean;
  searchOptions: object;

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
  loanStatus: any;
  reviewers: any;
  assignerLists: any;
 
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private casereviewService: CaseReviewService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Case Review"); 
    }

  ngOnInit(){
    this.getCaseReview(this.p);
    this.casereviewService.getStatus().subscribe(
      result => { 
        this.loanStatus = result.data;    
      }
    )
    this.casereviewService.getReviewer().subscribe(res=>{ 
      if(res){ this.reviewers = res.data; }  
    })
    
    this.casereviewService.getAssignerList().subscribe(res=>{ 
      if(res){ this.assignerLists = res.data; }  
    }) 
  } 

  fieldReset() {
     this.searchcasereview = {
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

  getPage(pageNo: number) {
    this.p = pageNo;
    if(this.isSearching) {
      this.doSearch();
    } else {
       this.getCaseReview(this.p);
    }
  }

  getCaseReview(p: number) {
    let offset = (p - 1) * this.limit;
    this.isLoading = true;
    this.casereviewService.getCasesReview(offset, this.limit).subscribe(
      result => {  
        this.casereviews = result.data; 
        this.length = this.casereviews.length || 0;
        this.total = result.total || 0; 
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

  search(value){ 
    this.searchOptions = value;
    this.p = 1; 
    this.total = 0;
    this.doSearch()
  }

  doSearch(){  
    this.isLoading = true;
    this.isSearching = true;
    this.casereviews = new Array<User>();
    let offset = (this.p - 1) * this.limit;
    
    this.casereviewService.searchLoan(this.searchOptions, offset, this.limit)
      .subscribe(
      res => { 
          if(res){ 
            this.casereviews = [].concat(res.data);
            this.length = this.casereviews.length || 0;
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

