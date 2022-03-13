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
import {  of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'list-cash-flatting',
  templateUrl: '../templates/listcashflatting.component.html',
  styleUrls: ['../css/listcashflatting.component.css']
})

export class ListCashFlattingComponent implements OnInit {

  public cashflattings: User;
  public indexOfClickedRow:number;
  public searchcashflatting = {
    "loan_id" : "",
    "name" : "",
    "mobile_no" : "",
    "email" : "", 
    "id_number":""
  };
  public loanDetails = {
    "loan_id" : "",
    "username" : "",
    "total_payable_amount" : ""
  };
  status: any;
  cashflattingsCopy: any;
  firstDate: any;
  secondDate: any;
  diffInDays: number;
  firstDates: any;
  errorVal: any;
  loanDetail: any;
  repaymentLink: string;
  transactionDetails: any = [];
  payAmount: number;
  isShowTransaction: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  amtToPay:number =0;
  selectedTrans:Array<any> = [];
  trans:string;
  total_amount_check: boolean = false;
  total_pen_check:boolean = false;
 
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    // private datePipe: DatePipe,
    private cashflattingService: CashFlattingService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Cash Flating"); 
    }
 
  calculateDiff(data){    
    let date = new Date(data);
    let todaysDate = new Date();
    const currentDate = moment(); 
    this.firstDate = moment(data,"YYYY-MM-DD"); 
    this.secondDate = moment(currentDate).format("YYYY-MM-DD");
    this.diffInDays = Math.abs(this.firstDate.diff(this.secondDate, 'days'));  
    if(date >= todaysDate){  
      return 0;
    }else{    
      return this.diffInDays;
    } 
  } 
  flatPop(fpopup, data) { 
    this.modalService.open(fpopup, { backdropClass: 'dark-modal', centered: true });  
  }
  flatEmiPop(fpopupemi, loanId) { 
    this.loading = true;
    this.amtToPay = 0;
    this.selectedTrans = [];
    this.modalService.open(fpopupemi, { backdropClass: 'dark-modal', centered: true });

    this.cashflattingService.getEmployTransactions(loanId).subscribe(res => {
       if(!res.error){
         this.cashflattings.filter(c=>c.loan_id==loanId)[0]['emi'] = res.data;
       }
       this.loading = false;
    });

  }
  keyDescOrder = (a: any, b: any): number => {
    return a.id > b.id ? 1 : -1
  }

  paymentSelection(val){
    console.log(val)
    if (val.checked) {
      this.amtToPay = Number(this.amtToPay.toFixed(2))+Number((val.value + val.penality).toFixed(2));
      this.selectedTrans.push(val);
    } else if(this.selectedTrans.filter(c=>c.key === val.key).length){
      this.amtToPay = Number(this.amtToPay.toFixed(2)) - Number((val.value + val.penality).toFixed(2));
      const index = this.selectedTrans.indexOf(c=>c.key === val.key);
      this.selectedTrans.splice(index, 1);
    }
    
  }

  checkOutStansingSlected(){
    console.log(this.selectedTrans)
    let isCheck = this.selectedTrans.filter(c=>c.type === 'installment').length? 'inst':'';
    if(!isCheck){
      isCheck = this.selectedTrans.filter(c=>c.type === 'total').length? 'total':'';
    }
    console.log(isCheck)
    return isCheck;
  }

  submitEmiTrans() {
    const trans = this.selectedTrans.filter(c=>c.checked === true);
    of(...trans).pipe(concatMap((tran) => this.cashflattingService.employeeFlat(tran))).subscribe(res=>{
       if (!res.error){
           this.toastr.success(res.message);
           window.location.reload();
       }
    });
  }

  extend(epopup, data) {
    this.modalService.open(epopup, { backdropClass: 'dark-modal', centered: true }); 
  }
  customExtend(cpopup, data) {
    this.modalService.open(cpopup, { backdropClass: 'dark-modal', centered: true }); 
  } 
  payoutLinkGenerate(lpopup, data) {
    this.modalService.open(lpopup, { backdropClass: 'dark-modal', centered: true }); 
  }
  
  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['cashflattings'];  
    if(response){
      console.log("ResPonsE", response);
      
      self.cashflattings = response.data;  
      this.cashflattingsCopy = response.data; 
    }
    this.cashflattingService.getStatus().subscribe(res=>{ 
      if(res){ this.status = res.data; } 
    }) 
    $(document).ready(function() { 
      $('#listcashflattings').dataTable( {  
        "scrollX": true, 
        "order": [] 
      }); 
    });  
  }

  reset(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);   
  }

  refresh(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);  
  }

  searchFlat(value){  
    this.cashflattingService.searchLoan(value)
      .subscribe(
      res => { 
          if(res === undefined){
            this.toastr.error('Record not found.', 'Error');
          }
          if(res){ this.cashflattings = res.data; }
      }, 
      error => {
          console.log(error);
      }
    );
  } 

  saveflat(val){   
    this.submitted = true;
    this.cashflattingService.saveFlat(val)
      .subscribe(
      res => {  
          if(res){   
            this.toastr.success(res.message, 'Success'); 
            setInterval(() => {
              window.location.reload(); 
            }, 3000);
            setInterval(() => {
             this.submitted = false;
            }, 4000);
          }
      }, 
      error => {
          console.log(error);
          this.submitted = false;
      }
    );
  }
  saveExtend(val){
    this.submitted = true;   
    this.cashflattingService.saveExtend(val)
      .subscribe(
      res => {  
          if(res){   
            this.toastr.success(res.message, 'Success'); 
            setInterval(() => {
              window.location.reload(); 
            }, 3000);
            setInterval(() => {
             this.submitted = false;
            }, 4000);
          }
      }, 
      error => {
          console.log(error);
          this.submitted = false;
      }
    );
  }

  isShown: boolean = false ; // hidden by default 
  toggleShow() { 
    this.isShown = ! this.isShown; 
  }
  saveCustomExtend(val){ 
     this.submitted = true;  
    this.cashflattingService.saveCustomExtend(val)
      .subscribe(
      res => {  
          if(res){   
            this.toastr.success(res.message, 'Success'); 
            setInterval(() => {
              window.location.reload(); 
            }, 3000);

            setInterval(() => {
             this.submitted = false;
            }, 4000);
          }
      }, 
      error => {
          console.log(error);
          this.submitted = false;
      }
    );
  }

  isShow = false;
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  getLoanDetail(value){
    if(value.length == 6){
      console.log("value",value);
      this.errorVal = "";
      this.cashflattingService.getDetailByLoanId(value)
      .subscribe(
      response => {   
        if(response){  
          this.loanDetail = response.loanDetails; 
          console.log("Loan Details", this.loanDetail);
          
        } else {
          this.errorVal = "Invalid Loan Id"; 
        }
      }, 
      error => {
          console.log(error);
      }
    ); 
    }else{
      this.loanDetail = "";
      this.errorVal = "Please enter valid Loan Id"; 
    } 
  }

  getPaymentLink(val){ 
    var formValue = {
      "loan_id":val.loan_id,
      "customer_name": this.loanDetail.appUser.username,
      "amount": val.total_payable_amount,
      "mobile_no": this.loanDetail.appUser.mobile_no,
      "email": this.loanDetail.appUser.email,
    } 
    this.cashflattingService.createRepaymentLink(formValue)
    .subscribe(response=>{ 
      this.repaymentLink = response.data.link_url;  
      this.copyLink(this.repaymentLink) 
    });
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
    setInterval(() => {
      window.location.reload(); 
    }, 3000);
  } 

  filatPop(fpopup, data) { 
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
    this.calculatePayAmount();
  }
 
  calculatePayAmount() {
    const selected = this.transactionDetails.filter(c=>c.isSelected === true);
    this.payAmount = 0;
    if(selected.length) {
      let sum = Number(selected.reduce((s,a)=>s+a.amount,0));
      const penality = selected[0].penaltyAmountAfterPaymentDate || 0;
      this.payAmount = Number((sum+ Number(penality)).toFixed(2));
    } 
  }
 
  getTransactionsByLoanId(data) {
  
    this.isShowTransaction = false;
    this.cashflattingService.getTransactionsByLoanId(data.loan_id).subscribe(res=>{ 
      if(res){ 
        this.transactionDetails = Object.keys(res.data).map(key=>res.data[key]).sort((a,b)=>a.forDay>b.forDay?-1:1); 
        if(this.transactionDetails.length) {
          if(!this.transactionDetails[0].paid) {
          const penality = this.transactionDetails[0].penaltyAmountAfterPaymentDate || 0;
          this.payAmount = Number(Number(this.transactionDetails[0].amount + penality).toFixed(2));
          this.transactionDetails[0].isSelected = true;
          } else {
            const overDue =  moment(data.payable_date).endOf('day').unix() > moment().unix() ? true: false;
            this.payAmount = Number(data.remaining_amount.toFixed(2));
          }
        }
        
      } 
    });
  }
  saveiflat(val, cashflatting) {
    // console.log("Val:", val);
    // console.log("Cashflatting:", cashflatting);    
    this.doFlatSaveBusiness(val, cashflatting)
  }

  doFlatSaveBusiness(val, cashflatting){
    let tx_time = moment().format('YYYY-MM-DD');
    let selected = this.transactionDetails.filter(c=>c.isSelected === true);
    
    if(selected.length) {
       tx_time = moment(this.transactionDetails.filter(c=>c.isSelected ===true)[0].forDate).format('YYYY-MM-DD');
      
    }
      const balanceAmount = cashflatting.remaining_amount;
      const paidAmount = val.order_amount;
      
      const emiPenality = selected.length?(selected[0].penalityOnEMI || 0):0;
      const duePenality = selected.length?(selected[0].penaltyAmountAfterPaymentDate || 0): 0;
      const penality = Number((Number(duePenality) + Number(emiPenality)).toFixed(2));
      const order_amount = val.order_amount - penality 
      const payload = {loan_id: val.loan_id, order_amount , penality ,tx_time}

      if (balanceAmount - order_amount === 0 ) {
        this.getCredit();
      }

      
      this.cashflattingService.saveFlatBusiness(payload)
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
}

