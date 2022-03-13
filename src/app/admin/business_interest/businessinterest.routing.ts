import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBusinessInterestComponent } from './components/listbusinesstinterest.component';
import { EditBusinessInterestComponent} from './components/editbusinessinterest.component';
import { AddBusinessInterestComponent } from './components/addbusinessinterest.component'; 
import { ViewBusinessInterestComponent } from './components/viewbusinessinterest.component';   
import { BusinessInterestResolve, DetailBusinessInterestResolve, ViewBusinessInterestResolve } from './service/businessinterest.resolve';

const routes: Routes = [
  { path: "", component:ListBusinessInterestComponent, resolve: {businessinterests: BusinessInterestResolve}},
  { path:"edit/:id", component: EditBusinessInterestComponent, resolve:{ businessinterest: DetailBusinessInterestResolve} },
  { path:"add", component:AddBusinessInterestComponent}, 
  { path:"view/:id", component: ViewBusinessInterestComponent, resolve:{ businessinterest: ViewBusinessInterestResolve} },
  // { path:"contact/:id", component: ViewContactComponent, resolve:{ contact: ViewContactResolve} },
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class BusinessInterestRoutingModule {}
