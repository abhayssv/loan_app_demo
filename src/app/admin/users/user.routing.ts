import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './components/listuser.component';
import { EditUserComponent} from './components/edituser.component';
import { AddUserComponent } from './components/adduser.component'; 
import { ViewUserComponent } from './components/viewuser.component';  
import { UsersResolve, DetailUserResolve, ViewUserResolve  } from './service/users.resolve';

const routes: Routes = [
  { path: "", component:ListUserComponent, resolve: {users: UsersResolve}},
  { path:"edit/:user_id", component: EditUserComponent, resolve:{ user: DetailUserResolve} },
  { path:"add", component:AddUserComponent}, 
  { path:"view/:user_id", component: ViewUserComponent, resolve:{ user: ViewUserResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class UserRoutingModule {}
