import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListApproverAchivementComponent } from './components/listapproverachivement.component';   
import { ApproverAchivementResolve } from './service/approverachivement.resolve';

const routes: Routes = [
  { path: "", component:ListApproverAchivementComponent, resolve: {approverachivements: ApproverAchivementResolve}} 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class ApproverAchivementRoutingModule {}
