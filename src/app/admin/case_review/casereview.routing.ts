import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCaseReviewComponent } from './components/listcasereview.component'; 
import { ViewCasereviewComponent } from './components/viewcasereview.component';    
import { CaseReviewResolve, ViewCaseReviewResolve} from './service/casereview.resolve';

const routes: Routes = [
  { path: "", component:ListCaseReviewComponent, resolve: {casereviews: CaseReviewResolve}},  
  { path:"view/:loan_id/:user_id", component: ViewCasereviewComponent, resolve:{ casereview: ViewCaseReviewResolve} },  
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class CaseReviewRoutingModule {}
