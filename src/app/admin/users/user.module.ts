import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from './components/adduser.component';
import { ListUserComponent } from './components/listuser.component';
import { EditUserComponent } from './components/edituser.component'; 
import { ViewUserComponent } from './components/viewuser.component'; 
import { AdminUsersService } from './service/adminusers.service';
import { ContactService } from '../contact/service/contact.service';
import { UsersResolve , DetailUserResolve, ViewUserResolve } from './service/users.resolve';
import { UserRoutingModule } from './user.routing';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  providers:[
    AdminUsersService,
    ContactService,
    UsersResolve,
    DetailUserResolve,
    ViewUserResolve

  ],
  declarations:[
    ListUserComponent,
    EditUserComponent,
    AddUserComponent,
    ViewUserComponent
  ]
})

export class UserModule {}
