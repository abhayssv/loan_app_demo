import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReviewerReportComponent } from './components/listreviewerreport.component';   
import { ReviewerReportResolve } from './service/reviewerreport.resolve';

const routes: Routes = [
  { path: "", component:ListReviewerReportComponent, resolve: {reviewerreports: ReviewerReportResolve}} 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class ReviewerReportRoutingModule {}
