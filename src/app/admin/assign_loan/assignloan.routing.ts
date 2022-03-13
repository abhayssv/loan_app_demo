import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAssignLoanComponent } from './components/listassignloan.component';  
import { ViewAssignLoanComponent } from './components/viewassignloan.component';  
import { AssignLoanResolve, ViewAssignLoanResolve } from './service/assignloan.resolve';

const routes: Routes = [
  { path: "", component:ListAssignLoanComponent, resolve: {assignloans: AssignLoanResolve}}, 
  { path:"view/:loan_id/:user_id", component: ViewAssignLoanComponent, resolve:{ assignloan: ViewAssignLoanResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class AssignLoanRoutingModule {}
