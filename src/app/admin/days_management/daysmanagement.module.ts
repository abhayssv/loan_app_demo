import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListDaysManagementComponent } from './components/listdaysmanagement.component'; 
 
import { DaysManagementService } from './service/daysmanagement.service'; 
import { DaysManagementResolve } from './service/daysmanagement.resolve';
import { DaysManagementRoutingModule } from './daysmanagement.routing';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    DaysManagementRoutingModule
  ],
  providers:[
    DaysManagementService, 
    DaysManagementResolve,  

  ],
  declarations:[
    ListDaysManagementComponent
  ]
})

export class DaysManagementModule {}
