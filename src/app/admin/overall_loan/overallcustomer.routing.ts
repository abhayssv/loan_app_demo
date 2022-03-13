import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOverallCustomerComponent } from './components/listoverallcustomer.component';  
import { ViewOverallCustomerComponent } from './components/viewoverallcustomer.component';  
import { OverallCustomerResolve, ViewOverallCustomerResolve } from './service/overallcustomer.resolve';

const routes: Routes = [
  { path: "", component:ListOverallCustomerComponent, resolve: {overallcustomers: OverallCustomerResolve}}, 
  { path:"view/:loan_id/:user_id", component: ViewOverallCustomerComponent, resolve:{ overallcustomer: ViewOverallCustomerResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class OverallCustomerRoutingModule {}
