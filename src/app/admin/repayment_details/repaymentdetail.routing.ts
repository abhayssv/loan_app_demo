import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRepaymentDetailComponent } from './components/listrepaymentdetail.component';  
import { ViewRepaymentDetailComponent } from './components/viewrepaymentdetail.component';  
import { RepaymentDetailResolve, ViewRepaymentDetailResolve } from './service/repaymentdetail.resolve';

const routes: Routes = [
  { path: "", component:ListRepaymentDetailComponent, resolve: {repaymentdetails: RepaymentDetailResolve}}, 
  { path:"view/:loan_id/:user_id", component: ViewRepaymentDetailComponent, resolve:{ repaymentdetail: ViewRepaymentDetailResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class RepaymentDetailRoutingModule {}
