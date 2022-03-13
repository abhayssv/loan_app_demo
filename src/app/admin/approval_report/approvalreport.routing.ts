import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListApprovalReportComponent } from './components/listapprovalreport.component';  
import { ViewApprovalReportComponent } from './components/viewapprovalreport.component';  
import { ApprovalReportResolve, ViewApprovalReportResolve } from './service/approvalreport.resolve';

const routes: Routes = [
  { path: "", component:ListApprovalReportComponent, resolve: {approvalreports: ApprovalReportResolve}}, 
  { path:"view/:loan_id/:user_id", component: ViewApprovalReportComponent, resolve:{ approvalreport: ViewApprovalReportResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class ApprovalReportRoutingModule {}
