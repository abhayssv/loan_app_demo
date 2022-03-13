import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFirstreviewComponent } from './components/listfirstreview.component';  
import { ViewFirstreviewComponent } from './components/viewfirstreview.component';  
import { FirstreviewResolve, ViewFirstreviewResolve } from './service/firstreview.resolve';

const routes: Routes = [
  { path: "", component:ListFirstreviewComponent, resolve: {firstreviews: FirstreviewResolve}}, 
  { path:"view/:loan_id/:user_id", component: ViewFirstreviewComponent, resolve:{ firstreview: ViewFirstreviewResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class FirstreviewRoutingModule {}
