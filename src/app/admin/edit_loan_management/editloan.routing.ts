import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEditLoanComponent } from './components/listeditloan.component';
import { EditLoanComponent} from './components/editloan.component'; 
import { ViewEditLoanComponent } from './components/vieweditloan.component';   
import { EditLoanResolve, DetailEditLoanResolve, ViewEditLoanResolve } from './service/editloan.resolve';

const routes: Routes = [
  { path: "", component:ListEditLoanComponent, resolve: {editloans: EditLoanResolve}},
  { path:"edit/:loan_id/:id", component: EditLoanComponent, resolve:{ editloan: DetailEditLoanResolve} },  
  { path:"view/:loan_id/:id", component: ViewEditLoanComponent, resolve:{ editloan: ViewEditLoanResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class EditLoanRoutingModule {}
