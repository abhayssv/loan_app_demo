import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAppUserListComponent } from './components/listappuserlist.component';  
import { AppUserListResolve } from './service/appuserlist.resolve';

const routes: Routes = [
  { path: "", component:ListAppUserListComponent, resolve: {appuserlist: AppUserListResolve}}, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class AppUserListRoutingModule {}
