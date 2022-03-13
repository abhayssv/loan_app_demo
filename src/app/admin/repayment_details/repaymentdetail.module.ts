import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListRepaymentDetailComponent } from './components/listrepaymentdetail.component'; 
import { ViewRepaymentDetailComponent } from './components/viewrepaymentdetail.component'; 
import { RepaymentDetailService } from './service/repaymentdetail.service'; 
import { RepaymentDetailResolve , ViewRepaymentDetailResolve } from './service/repaymentdetail.resolve';
import { RepaymentDetailRoutingModule } from './repaymentdetail.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { RePaymentHistoryModule } from './../repayment_history/repayment_history.module';


@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    RepaymentDetailRoutingModule,
    NgxPaginationModule,
    RePaymentHistoryModule
  ],
  providers:[
    RepaymentDetailService, 
    RepaymentDetailResolve, 
    ViewRepaymentDetailResolve 

  ],
  declarations:[
    ListRepaymentDetailComponent, 
    ViewRepaymentDetailComponent, 
  ]
})

export class RepaymentDetailModule {}
