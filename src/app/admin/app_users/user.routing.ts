import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './components/listuser.component';
import { EditUserComponent} from './components/edituser.component';
import { AddUserComponent } from './components/adduser.component'; 
import { ViewUserComponent } from './components/viewuser.component'; 
import { ViewContactComponent } from './components/viewcontact.component'; 
import { UserResolve, DetailUserResolve, ViewUserResolve, ViewContactResolve  } from './service/user.resolve';

const routes: Routes = [
  { path: "", component:ListUserComponent, resolve: {users: UserResolve}},
  { path:"edit/:id", component: EditUserComponent, resolve:{ user: DetailUserResolve} },
  { path:"add", component:AddUserComponent}, 
  { path:"view/:user_id", component: ViewUserComponent, resolve:{ user: ViewUserResolve} },
  { path:"contact/:user_id", component: ViewContactComponent, resolve:{ contact: ViewContactResolve} },
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class UserRoutingModule {}
