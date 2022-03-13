import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListAssignLoanComponent } from './components/listassignloan.component'; 
import { ViewAssignLoanComponent } from './components/viewassignloan.component'; 
import { AssignLoanService } from './service/assignloan.service'; 
import { AssignLoanResolve , ViewAssignLoanResolve } from './service/assignloan.resolve';
import { AssignLoanRoutingModule } from './assignloan.routing';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    AssignLoanRoutingModule
  ],
  providers:[
    AssignLoanService, 
    AssignLoanResolve, 
    ViewAssignLoanResolve  
  ],
  declarations:[
    ListAssignLoanComponent, 
    ViewAssignLoanComponent, 
  ]
})

export class AssignLoanModule {}
