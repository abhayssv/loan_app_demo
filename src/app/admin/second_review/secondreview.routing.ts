import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSecondreviewComponent } from './components/listsecondreview.component';  
import { ViewSecondreviewComponent } from './components/viewsecondreview.component';  
import { SecondreviewResolve, ViewSecondreviewResolve } from './service/secondreview.resolve';

const routes: Routes = [
  { path: "", component:ListSecondreviewComponent, resolve: {secondreviews: SecondreviewResolve}}, 
  { path:"view/:loan_id/:user_id", component: ViewSecondreviewComponent, resolve:{ secondreview: ViewSecondreviewResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class SecondreviewRoutingModule {}
