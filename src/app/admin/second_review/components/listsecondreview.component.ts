import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecondreviewService } from '../service/secondreview.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { Title } from "@angular/platform-browser"; 
import { PermissionService } from '../../permissions/service/permission.service'; 
import { Permissions } from '../../../models/permissions';

declare var $: any;

@Component({
  selector: 'list-second-review',
  templateUrl: '../templates/listsecondreview.component.html'
})

export class ListSecondreviewComponent implements OnInit {

  public secondreviews: Array<User> =[];
  subcategory: Permissions;
  public indexOfClickedRow:number;
  public searchsecondreview = {
    "from_date":"",
    "to_date":"",
    "loan_id" : "",
    "name" : "",
    "mobile_no" : "",
    "email" : "",
    "id_number":"",
    "user_type": "",
    "tenure":"",
    "amount":""  
  }; 
  secondreviewsCopy: any;
  per_missions: any;
  dataArray = [];
  secondReviewers: any;
  limit:number = 10;
  p:number = 1;
  isSearching:boolean = false;
  isLoading:boolean = false;
  total: number = 0;

   user_types = [
    { id: 0, name: "Student" },
    { id: 1, name: "Employee" },
    { id: 2, name: "Self Employee" },
  ];

  tenures = [
    { id: 1, days: 7 },
    { id: 2, days: 14 },
    { id: 3, days: 21 },
    { id: 4, days: 28 },
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
 
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private secondreviewService: SecondreviewService,
    private permissionService : PermissionService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Second Review"); 
    }

  ngOnInit(){
    this.getSecondReviewLoans();
    this.getSecondReviewer();
    this.checkPermission();
  } 

  search(e) {
   e.preventDefault();
   this.isSearching = true;
   this.p = 1;
   this.getSecondReviewLoans();
  } 

  getSecondReviewLoans() {
    const offset = (this.p - 1) * this.limit;
    let api;
    this.isLoading = true;

    if(this.isSearching) {
     api = this.secondreviewService.searchSecondReviewerLoans(this.limit, offset, this.searchsecondreview)
    } else {
     api = this.secondreviewService.getSecondreviews(this.limit, offset)
    }

    api.subscribe(res => { 
      if(res){ 
        this.secondreviews = [].concat(res.data);
        this.total = res.total;
      }   
      this.isLoading =false
    }) 
  }

  getSecondReviewer(){
     this.secondreviewService.getSecondReviewer().subscribe(res=>{ 
      if(res){ this.secondReviewers = res.data; }   
     })  
  }

  checkPermission() {
    this.permissionService.checkPermission().subscribe(res=>{  
      if(res){ 
        this.subcategory = res.data  
        this.per_missions = res.permission   
        let stringified=JSON.stringify(this.per_missions);  
        JSON.parse(stringified).forEach(element => this.dataArray.push(element.per_name));  
      }    
    })
  }

  getPage(pageNo: number) {
    this.p = pageNo;
    this.getSecondReviewLoans();
  }

  reset(){ 
    this.isSearching = false;
    this.searchsecondreview = {
        "from_date":"",
        "to_date":"",
        "loan_id" : "",
        "name" : "",
        "mobile_no" : "",
        "email" : "",
        "id_number":"",
        "user_type": "",
        "tenure":"",
        "amount":"" 
    } 
    this.getSecondReviewLoans();
  }

  refresh(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]); 
  }
}

