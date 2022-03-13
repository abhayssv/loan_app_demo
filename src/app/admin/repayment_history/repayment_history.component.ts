import { Output, EventEmitter,Component, OnInit, OnDestroy, Input, ViewChild, SimpleChanges, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { RepaymentService } from './repayment_history.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({ 
  selector: 'repayment-history', 
  templateUrl: 'repayment_history.component.html' 
})
export class RepaymentComponent implements OnInit, OnDestroy {
  @Input() loanId: Number;
  @Output() close = new EventEmitter<any>();
  @ViewChild('payment', {static : true}) payment : TemplateRef<any>;
  paymentHistory:Array<any> = []

  constructor(private repaymentService: RepaymentService, private modalService: NgbModal) { }
  ngOnInit() {
    
  }

  ngOnDestroy(){
   
  }

   ngOnChanges(changes: SimpleChanges) {
     if(changes.loanId && changes.loanId.currentValue){
       this.getRePaymentHistory(changes.loanId.currentValue);
     }
    
   }

  getRePaymentHistory(loanId) {

    this.repaymentService.getRePaymentHistory(loanId)
      .subscribe(
      res => { 
        this.paymentHistory = res.data;  
        this.modalService.open(this.payment, {backdrop: 'static',size: 'lg',  keyboard: false, centered: true}); 
      }, 
      error => {
          console.log(error);
      }
    );   
  }
}