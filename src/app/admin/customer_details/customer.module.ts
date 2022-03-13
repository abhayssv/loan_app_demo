import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListCustomerComponent } from './components/listcustomer.component'; 
import { ViewCustomerComponent } from './components/viewcustomer.component'; 
import { ViewAgreementPdfComponent } from './components/viewagreementpdf.component'; 
import { CustomerService } from './service/customer.service'; 
import { CustomerResolve , ViewCustomerResolve, ViewAgreementPdfResolve } from './service/customer.resolve';
import { CustomerRoutingModule } from './customer.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { RePaymentHistoryModule } from './../repayment_history/repayment_history.module';
 

@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    RePaymentHistoryModule,
    CustomerRoutingModule,
    NgxPaginationModule,
  ],
  providers:[
    CustomerService, 
    CustomerResolve, 
    ViewCustomerResolve, 
    ViewAgreementPdfResolve
  ],
  declarations:[
    ListCustomerComponent, 
    ViewCustomerComponent,
    ViewAgreementPdfComponent
  ]
})

export class CustomerModule {}
