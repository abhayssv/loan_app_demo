import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInterestComponent } from './components/listinterest.component';
import { EditInterestComponent} from './components/editinterest.component';
import { AddInterestComponent } from './components/addinterest.component'; 
import { ViewInterestComponent } from './components/viewinterest.component';   
import { InterestResolve, DetailInterestResolve, ViewInterestResolve } from './service/interest.resolve';

const routes: Routes = [
  { path: "", component:ListInterestComponent, resolve: {interests: InterestResolve}},
  { path:"edit/:id", component: EditInterestComponent, resolve:{ interest: DetailInterestResolve} },
  { path:"add", component:AddInterestComponent}, 
  { path:"view/:id", component: ViewInterestComponent, resolve:{ interest: ViewInterestResolve} },
  // { path:"contact/:id", component: ViewContactComponent, resolve:{ contact: ViewContactResolve} },
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class InterestRoutingModule {}
