import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomerComponent } from './components/listcustomer.component';  
import { ViewCustomerComponent } from './components/viewcustomer.component'; 
import { ViewAgreementPdfComponent } from './components/viewagreementpdf.component'; 
import { CustomerResolve, ViewCustomerResolve, ViewAgreementPdfResolve } from './service/customer.resolve';

const routes: Routes = [
  { path: "", component:ListCustomerComponent, resolve: {customers: CustomerResolve}}, 
  { path:"view/:loan_id/:user_id", component: ViewCustomerComponent, resolve:{ customer: ViewCustomerResolve}},
  { path:"view/pdf/:loan_id/:user_id", component: ViewAgreementPdfComponent, resolve:{ customer: ViewAgreementPdfResolve}}, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class CustomerRoutingModule {}
