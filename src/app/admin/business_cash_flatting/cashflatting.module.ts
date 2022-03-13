import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListCashFlattingComponent } from './components/listcashflatting.component'; 
import { ViewCashFlattingComponent } from './components/viewcashflatting.component'; 
import { CashFlattingService } from './service/cashflatting.service'; 
import { CashFlattingResolve , ViewCashFlattingResolve } from './service/cashflatting.resolve';
import { CashFlattingRoutingModule } from './cashflatting.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { RePaymentHistoryModule } from './../repayment_history/repayment_history.module';

@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    CashFlattingRoutingModule,
    NgxPaginationModule,
    RePaymentHistoryModule
  ],
  providers:[
    CashFlattingService, 
    CashFlattingResolve, 
    ViewCashFlattingResolve 

  ],
  declarations:[
    ListCashFlattingComponent, 
    ViewCashFlattingComponent, 
  ]
})

export class BusinessCashFlattingModule {}
