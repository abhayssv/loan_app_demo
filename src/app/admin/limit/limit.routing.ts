import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLimitComponent } from './components/listlimit.component';
import { EditLimitComponent} from './components/editlimit.component';
import { AddLimitComponent } from './components/addlimit.component'; 
import { ViewLimitComponent } from './components/viewlimit.component';   
import { LimitResolve, DetailLimitResolve, ViewLimitResolve } from './service/limit.resolve';

const routes: Routes = [
  { path: "", component:ListLimitComponent, resolve: {limits: LimitResolve}},
  { path:"edit/:id", component: EditLimitComponent, resolve:{ limit: DetailLimitResolve} },
  { path:"add", component:AddLimitComponent}, 
  { path:"view/:id", component: ViewLimitComponent, resolve:{ limit: ViewLimitResolve} },
  // { path:"contact/:id", component: ViewContactComponent, resolve:{ contact: ViewContactResolve} },
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class LimitRoutingModule {}
