import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListContactComponent } from './components/listcontact.component';
import { ViewContactComponent } from './components/viewcontact.component'; 
import { ContactResolve, DetailContactResolve, ViewContactResolve } from './service/contact.resolve';

const routes: Routes = [
  { path: "", component:ListContactComponent, resolve: {contact: ContactResolve}},
  { path:"view/:id", component: ViewContactComponent, resolve:{ contact: ViewContactResolve} },

];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class ContactRoutingModule {}
