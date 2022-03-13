import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { Title } from "@angular/platform-browser";
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'list-customer',
  templateUrl: '../templates/listcustomer.component.html'
})

export class ListCustomerComponent implements OnInit {

  public customers: Array<User>;
  public indexOfClickedRow:number;
  public searchcustomer = {
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
  status: any;
  loanStatus: Array<object>;
  customersCopy: any;
  users: any;
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
  reviewers: any;
  assignerLists: any;
   
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private titleService:Title,
    private modalService: NgbModal,
    ){ 
      this.titleService.setTitle("List Customer Details"); 
    }

  ngOnInit(){ 
    this.getCustomerLoan(this.p);
    this.customerService.getStatus().subscribe(
      result => { 
        this.status = result.data; 
        this.loanStatus = this.status;  
      }
    )
    this.customerService.getReviewer().subscribe(res=>{ 
      if(res){ this.reviewers = res.data; }  
    })
    
    this.customerService.getAssignerList().subscribe(res=>{ 
      if(res){ this.assignerLists = res.data; }  
    })
  } 

  fieldReset() {
     this.searchcustomer = {
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
      this.getCustomerLoan(this.p);
    }
    
  }



  getCustomerLoan(p: number) {
    let offset = (p - 1) * this.limit;
    this.isLoading = true;
    this.customers = new Array<User>();
    this.customerService.getCustomers(offset, this.limit).subscribe(
      result => { 
        this.customers = result.data || []; 
        this.length = this.customers.length;
        this.total = Number(result.total || 0); 
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

  search(value){ 
    this.searchOptions = value;
    this.p = 1; 
    this.total = 0;
    this.doSearch()
  }

  doSearch() {
    this.isLoading = true;
    this.isSearching = true;
    this.customers = new Array<User>();
    let offset = (this.p - 1) * this.limit;
    this.customerService.searchLoan(this.searchOptions, offset, this.limit)
      .subscribe(
      res => { 
          if(res.data){
            this.customers = [].concat(res.data);
            this.length = this.customers.length || 0;
            this.total = Number(res.total || 0 );
         }
          this.isLoading = false;
      }, 
      error => {
          console.log(error);
      }
    ); 
  }

  isShow = false;
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}

