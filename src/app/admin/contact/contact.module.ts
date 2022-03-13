import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListContactComponent } from './components/listcontact.component'; 
import { ViewContactComponent } from './components/viewcontact.component';
import { ContactService } from './service/contact.service';
import { ContactResolve , DetailContactResolve, ViewContactResolve } from './service/contact.resolve';
import { ContactRoutingModule } from './contact.routing';


@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    ContactRoutingModule
  ],
  providers:[
    ContactService,
    ContactResolve,
    DetailContactResolve,
    ViewContactResolve 
  ],
  declarations:[
    ListContactComponent, 
    ViewContactComponent
  ]
})

export class ContactModule {}
