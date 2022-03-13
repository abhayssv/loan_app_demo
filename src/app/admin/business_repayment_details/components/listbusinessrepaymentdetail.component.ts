import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessRepaymentDetailService } from '../service/businessrepaymentdetail.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'list-second-review',
  templateUrl: '../templates/listbusinessrepaymentdetail.component.html'
})

export class ListBusinessRepaymentDetailComponent implements OnInit {

  public businessrepaymentdetails: Array<User>=[];
  public indexOfClickedRow:number;
  public searchbusinessrepaymentdetail = {
    "loan_id" : "",
    "name" : "",
    "mobile_no" : "",
    "email" : "",
    "from_date":"",
    "to_date":"",
    "status":"",
    "payment_method":"",
    "trans_id":"",
    "order_id":"",
    "id_number":"" 
  };
  statuss: Array<any>  = [
    { id: 1, status: "SUCCESS" },
    { id: 2, status: "FLAGGED" },
    { id: 3, status: "PENDING" },
    { id: 4, status: "FAILED" },
    { id: 1, status: "CANCELLED" },
    { id: 2, status: "Extend" },
    { id: 3, status: "Partial Extend" },
    { id: 4, status: "Cash Flat" }
  ];
  repaymentLink: any;
  businessrepaymentdetailsCopy: any;
  businessDetailsByLoanId: User;
  p: number = 1;
  limit:number = 10;
  total: number;
  isSearching: boolean = false;
  isLoading: boolean = false;
  view_by_id:any;
  searchOptions:any;
 
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private modalService: NgbModal,
    private businessrepaymentdetailService: BusinessRepaymentDetailService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List BusinessRepayment Details"); 
    }

  ngOnInit(){
    this.getBusinessRepaymentDetails();
  }

   getPage(pageNo: number) {
    this.p = pageNo;
    if (this.isSearching) {
      this.doSearch();
    } else {
      this.getBusinessRepaymentDetails();
    }
    
  }

  getBusinessRepaymentDetails() {
    this.isLoading = true;
    let offset = (this.p -1 ) * this.limit;
    this.businessrepaymentdetailService.getBusinessRepaymentDetails(offset, this.limit).subscribe(res=>{ 
      if (res) { 
        this.businessrepaymentdetails = [].concat(res.data); 
        this.total = Number(res.total) || 0;
      } 

      this.isLoading = false;
    });;
  }

  copyLink(val){
    const selBox = document.createElement('textarea'); 
    selBox.value = val; 
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success("Link Copied Successfully", 'Success');
  }

  createBusinessRepaymentLink(orderId){  
    this.businessrepaymentdetailService.createBusinessRepaymentLink(orderId)
    .subscribe(response=>{ 
      this.repaymentLink = response.message;  
      this.copyLink(this.repaymentLink.paymentLink) 
    });  
  } 

  reset() { 
    this.limit = 10;
    this.fieldReset();
    this.isSearching = false;
    this.p = 1;
    this.total = 0;
    this.view_by_id = '';
    this.getPage(1);
  } 

   fieldReset() {
    this.searchbusinessrepaymentdetail = {
      "loan_id" : "",
      "name" : "",
      "mobile_no" : "",
      "email" : "",
      "from_date":"",
      "to_date":"",
      "status":"",
      "payment_method":"",
      "trans_id":"",
      "order_id":"",
      "id_number":"" 
    }
  }

  refresh(){
    window.location.reload(); 
  }

  listPop(lpopup, loan_id) {  
    this.businessrepaymentdetailService.getAllBusinessDetails(loan_id)
      .subscribe(
      res => { 
        this.businessDetailsByLoanId = res.data;   
        console.log("DATA", this.businessDetailsByLoanId); 
      }, 
      error => {
          console.log(error);
      }
    );
    this.modalService.open(lpopup, {backdrop: 'static',size: 'lg',  keyboard: false, centered: true});
  }

   search(value) { 
    this.searchOptions = value;
    this.p = 1; 
    this.total = 0;
    this.doSearch()
   }

  doSearch(){ 
    this.isLoading = true;
    this.isSearching = true;
    this.businessrepaymentdetails = new Array<User>();
    let offset = (this.p - 1) * this.limit;

    this.businessrepaymentdetailService.searchLoan(this.searchOptions, offset,this.limit)
      .subscribe(
      res => { 
          if(res){ 
            this.businessrepaymentdetails = [].concat(res.data);
            this.total = Number(res.total) || 0;
          }
         this.isLoading = false;
      }, 
      error => {
          console.log(error);
      }
    );
  }
}

