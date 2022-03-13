import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListAppUserListComponent } from './components/listappuserlist.component'; 
 
import { AppUserListService } from './service/appuserlist.service'; 
import { AppUserListResolve } from './service/appuserlist.resolve';
import { AppUserListRoutingModule } from './appuserlist.routing';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    AppUserListRoutingModule
  ],
  providers:[
    AppUserListService, 
    AppUserListResolve,  

  ],
  declarations:[
    ListAppUserListComponent
  ]
})

export class AppUserListModule {}
