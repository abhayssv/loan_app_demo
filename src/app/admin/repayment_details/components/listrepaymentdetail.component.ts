import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepaymentDetailService } from '../service/repaymentdetail.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-second-review',
  templateUrl: '../templates/listrepaymentdetail.component.html'
})

export class ListRepaymentDetailComponent implements OnInit {

  public repaymentdetails: Array<User> = [];
  public indexOfClickedRow:number;
  public selected_loan_id:number;
  public view_by_id:any;
  public searchrepaymentdetail = {
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
  // status: any;
  repaymentLink: any;
 
  statuss = [
    { id: 1, status: "SUCCESS" },
    { id: 2, status: "FLAGGED" },
    { id: 3, status: "PENDING" },
    { id: 4, status: "FAILED" },
    { id: 1, status: "CANCELLED" },
    { id: 2, status: "Extend" },
    { id: 3, status: "Partial Extend" },
    { id: 4, status: "Cash Flat" }
  ]; 
  p: number = 1;
  limit: number = 10;
  total: number;
  isSearching: boolean = false;
  isLoading: boolean = false;
  searchOptions: any;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private repaymentdetailService: RepaymentDetailService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Repayment Details"); 
    }

  ngOnInit(){
    this.getApplyLoanDetails();
  }

  getApplyLoanDetails(){
    let offset = (this.p -1 ) * this.limit;
    this.isLoading = true;
    this.repaymentdetailService.getRepaymentDetails(offset, this.limit)
      .subscribe(
      res => {
          if(res){ 
            this.repaymentdetails = [].concat(res.data); 
            this.total = Number(res.total || 0);
          }
          this.isLoading = false;
      }, 
      error => {
          console.log(error);
      });
  }

  getPage(pageNo: number) {
    this.p = pageNo;
    if(this.isSearching) {
      this.doSearch();
    } else {
      this.getApplyLoanDetails();
    }
    
  }

  fieldReset() {
    this.searchrepaymentdetail = {
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

   reset() { 
    this.limit = 10;
    this.fieldReset();
    this.isSearching = false;
    this.p = 1;
    this.total = 0;
    this.view_by_id = '';
    this.getPage(1);
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

  createRepaymentLink(orderId){  
    this.repaymentdetailService.createRepaymentLink(1000)
    .subscribe(response=>{ 
      this.repaymentLink = response.message;  
      this.copyLink(this.repaymentLink.paymentLink) 
    });  
  } 

  refresh(){
    window.location.reload(); 
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
    this.repaymentdetails = new Array<User>();
    let offset = (this.p - 1) * this.limit;

    this.repaymentdetailService.searchLoan(this.searchOptions, this.limit, offset)
      .subscribe(
      res => { 
          if(res === undefined){
            this.toastr.error('Record not found.', 'Error');
          }
          if(res){ 
            this.repaymentdetails = [].concat(res.data); 
            this.total =  Number(res.total || 0);
          }
          this.isLoading = false;
      }, 
      error => {
          console.log(error);
      }); 
  }
}

