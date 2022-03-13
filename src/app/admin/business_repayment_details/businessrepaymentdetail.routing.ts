import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBusinessRepaymentDetailComponent } from './components/listbusinessrepaymentdetail.component';  
import { ViewBusinessRepaymentDetailComponent } from './components/viewbusinessrepaymentdetail.component';  
import { BusinessRepaymentDetailResolve, ViewBusinessRepaymentDetailResolve } from './service/businessrepaymentdetail.resolve';

const routes: Routes = [
  { path: "", component:ListBusinessRepaymentDetailComponent, resolve: {businessrepaymentdetails: BusinessRepaymentDetailResolve}}, 
  { path:"view/:loan_id/:user_id", component: ViewBusinessRepaymentDetailComponent, resolve:{ businessrepaymentdetail: ViewBusinessRepaymentDetailResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class BusinessRepaymentDetailRoutingModule {}
