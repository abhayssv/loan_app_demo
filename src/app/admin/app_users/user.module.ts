import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from './components/adduser.component';
import { ListUserComponent } from './components/listuser.component';
import { EditUserComponent } from './components/edituser.component'; 
import { ViewUserComponent } from './components/viewuser.component';
import { ViewContactComponent } from './components/viewcontact.component';
import { UserService } from './service/user.service';
import { ContactService } from '../contact/service/contact.service';
import { UserResolve , DetailUserResolve, ViewUserResolve, ViewContactResolve } from './service/user.resolve';
import { UserRoutingModule } from './user.routing';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    UserRoutingModule,
    NgxPaginationModule,
  ],
  providers:[
    UserService,
    ContactService,
    UserResolve,
    DetailUserResolve,
    ViewUserResolve,
    ViewContactResolve  
  ],
  declarations:[
    ListUserComponent,
    EditUserComponent,
    AddUserComponent,
    ViewUserComponent,
    ViewContactComponent
  ]
})

export class UserModule {}
