import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CashFlattingService } from '../service/cashflatting.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Title } from "@angular/platform-browser";
// import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import 'moment/locale/pt-br';

declare var $: any;

@Component({
  selector: 'list-cash-flatting',
  templateUrl: '../templates/listcashflatting.component.html',
  styleUrls: ['../css/listcashflatting.component.css']
})

export class ListCashFlattingComponent implements OnInit {

  public cashflattings: any;
  public indexOfClickedRow:number;
  public searchcashflatting = {
    "loan_id" : "",
    "name" : "",
    "mobile_no" : "",
    "email" : "", 
    "id_number":""
  };
  status: any;
  cashflattingsCopy: any;
  firstDate: any;
  secondDate: any;
  diffInDays: number;
  firstDates: any;
  transactionDetails: Array<any> = [];
  transactionSummary: any = {}
  payAmount: number =0;
  selectedTrans: Array<any> = [];
  isShowTransaction: boolean = false;
  oustandingPaid: boolean = false; 
  isLoading: boolean = false;
  isSearching: boolean;
  searchOptions: object;
  limit:number = 10;
  p: number = 1;
  total:number;
  isChecked:boolean = false;
  validationMsg:string;
  submitted:boolean = false;
  amttToPay:number = 0;
 
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private cashflattingService: CashFlattingService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Cash Flating"); 
    }

    ngOnInit(){
      this.getCashFlating(this.p);
      this.cashflattingService.getStatus().subscribe(res=>{ 
        if(res){ 
          this.status = res.data;
        } 
      });  
   }


  getPage(pageNo: number) {
    this.p = pageNo;
    if(this.isSearching) {
      this.isLoading = true;
      this.searchFlat(this.p);
    } else {
      this.getCashFlating(this.p);
    }
  }

  getCashFlating = (p:number)=> {
    let offset = (p - 1) * this.limit;
    this.isLoading = true;
    this.cashflattingService.getCashFlattings(offset,this.limit)
    .subscribe(
      res => { 
          if(res){ 
            this.cashflattings = [].concat(res.data); 
            this.total = Number(res.total || 0);
          }
          this.isLoading = false;
      }, 
      error => {
          console.log(error);
          this.isLoading = false;
      }
    );
  }

  searchFlat(value){
    this.searchOptions = value;
    this.p = 1; 
    this.total = 0;
    this.isSearching = true;
    this.cashflattings = new Array<any>();
    this.isLoading = true;
    this.doSearch();
  } 

  doSearch = ()=>{
    let offset = (this.p - 1) * this.limit;
    this.cashflattingService.searchLoan(this.searchOptions,offset,this.limit)
      .subscribe(
      res => {
          this.isLoading =false; 
          if(res === undefined){
            this.toastr.error('Record not found.', 'Error');
          }
          if(res){ 
            this.cashflattings = res.data; 
          }
          
      }, 
      error => {
          console.log(error);
           this.isLoading =false;
      }
    );
  }


  reset() { 
    this.limit = 10;
    this.fieldReset();
    this.isSearching = false;
    this.p = 1;
    this.total = 0;
    this.getPage(1);
  }

  fieldReset(){
    this.searchcashflatting = {
    "loan_id" : "",
    "name" : "",
    "mobile_no" : "",
    "email" : "", 
    "id_number":""
   };
  }
 
  calculateDiff(data, dayDiff){    
    let date = new Date(data);
    let todaysDate = new Date();
    const currentDate = moment(); 
    this.firstDate = moment(data,"YYYY-MM-DD"); 
    this.secondDate = moment(currentDate).format("YYYY-MM-DD");
    this.diffInDays = Math.abs(this.firstDate.diff(this.secondDate, 'days'));  
    if(date >= todaysDate){  
      return dayDiff ? (-1 * this.diffInDays): 0;
    }else{    
      return this.diffInDays;
    } 
  }

  flatPop(fpopup, data) { 
    this.payAmount =0;
    this.getTransactionsByLoanId(data);
    this.modalService.open(fpopup, { backdropClass: 'dark-modal', centered: true });  
  }


  changeEvent(index, isChecked) {
   
   this.transactionDetails.forEach((each, i)=>{
      if(i === index) {
        each.isSelected = isChecked;
      } else {
        each.isSelected = false;
      }
   });

   this.isChecked = !!this.transactionDetails.filter(c=>c.isSelected ===true).length;
   this.calculatePayAmount();
  }

  calculatePayAmount() {
    this.selectedTrans = this.transactionDetails.filter(c=>c.isSelected === true);
    this.payAmount = 0;
    if(this.selectedTrans.length) {
      this.selectedTrans.map(each => {
        let pen = this.transactionSummary.penalityNonPaid?Number(each.penality):0;
        this.payAmount += Number((Number(each.installment)+pen).toFixed(2));
      })
    } 
  }

  getTransactionsByLoanId(data) {
   
    this.isShowTransaction = false;
    this.cashflattingService.getTransactionsByLoanId(data.loan_id).subscribe(res=>{ 
      if(res && res.data){ 
        this.transactionDetails = [].concat(res.data.transactions || []);
        this.transactionSummary = res.data.summary || {}; 
      } 
      this.isShowTransaction = true;
    });
  }

  extend(epopup, data) {
    this.modalService.open(epopup, { backdropClass: 'dark-modal', centered: true }); 
  }

  customExtend(cpopup, data) {
    this.modalService.open(cpopup, { backdropClass: 'dark-modal', centered: true }); 
  }

  toggleTransaction() { 
    this.isShowTransaction = !this.isShowTransaction; 
  }


  refresh(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);  
  }

  

  doFlatSaveNonBusiness(val){
     this.cashflattingService.saveFlat(val)
      .subscribe(
      res => {  
          if(res){   
            this.toastr.success(res.message, 'Success'); 
            setInterval(() => {
              window.location.reload(); 
            }, 3000);
          }
      }, 
      error => {
          console.log(error);
      }
    );
  }

  onChangeAmnt(f){
    this.validationMsg = '';
    f.submitted =false
  }

  getCredit(){
      this.cashflattingService.saveBusinessCredit()
      .subscribe(
      res => {  
          if(res){   
            this.toastr.success(res.message, 'Success'); 
          }
      }, 
      error => {
          console.log(error);
      }
    );
  }

  doFlatSaveBusiness(val){
       
       
         this.submitted = true;
         this.validationMsg = ''
         let penality = (this.selectedTrans.length && this.transactionSummary.penalityNonPaid) ?this.selectedTrans[0].penality: 0;
         let amount = this.selectedTrans.length ?this.selectedTrans[0].installment: 0;
         let tx_time = this.selectedTrans.length ?this.selectedTrans[0].forDate: moment().format('YYYY-MM-DD');
         
         if (!this.isChecked) {
           let pen = Number(this.transactionSummary.penalityNonPaid || 0);
           if(Number(this.payAmount) >= pen) {
             penality = pen;
             amount = Number(this.payAmount)-Number(penality);
           } else {
             penality = this.payAmount;
           }
         }


         const payload = {loan_id: val.loan_id, order_amount:amount , penality ,tx_time, overallPenality:this.transactionSummary.overallPenality}

         //if (balanceAmount - order_amount === 0 ) {
           //this.getCredit();
         //}
         
         this.cashflattingService.saveFlatBusiness(payload)
          .subscribe(
          res => {  
              if(res){   
                this.toastr.success(res.message, 'Success'); 
                setInterval(() => {
                  window.location.reload(); 
                }, 3000);
                setInterval(() => {
                  this.submitted = false;
                }, 3500);
              }
          }, 
          error => {
              console.log(error);
               this.submitted = false;
          }
        );
  }


  saveflat(val) {
    this.doFlatSaveBusiness(val)
  }
  saveExtend(val){   
    this.cashflattingService.saveExtend(val)
      .subscribe(
      res => {  
          if(res){   
            this.toastr.success(res.message, 'Success'); 
            setInterval(() => {
              window.location.reload(); 
            }, 3000);
          }
      }, 
      error => {
          console.log(error);
      }
    );
  }

  isShown: boolean = false ; // hidden by default 
  toggleShow() { 
    this.isShown = ! this.isShown; 
  }

  doCustomExtendBusiness(val) {
   this.cashflattingService.saveCustomExtendBusiness(val)
      .subscribe(
      res => {  
          if(res){   
            this.toastr.success(res.message, 'Success'); 
            setInterval(() => {
              window.location.reload(); 
            }, 3000);
          }
      }, 
      error => {
          console.log(error);
      }
    );
  }

  saveCustomExtend(val) {   
    this.doCustomExtendBusiness(val)
  }

  isShow = false;
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}

