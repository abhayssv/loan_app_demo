import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListOverallCustomerComponent } from './components/listoverallcustomer.component'; 
import { ViewOverallCustomerComponent } from './components/viewoverallcustomer.component'; 
import { OverallCustomerService } from './service/overallcustomer.service'; 
import { OverallCustomerResolve , ViewOverallCustomerResolve } from './service/overallcustomer.resolve';
import { OverallCustomerRoutingModule } from './overallcustomer.routing';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    OverallCustomerRoutingModule,
    NgxPaginationModule,
  ],
  providers:[
    OverallCustomerService, 
    OverallCustomerResolve, 
    ViewOverallCustomerResolve 

  ],
  declarations:[
    ListOverallCustomerComponent, 
    ViewOverallCustomerComponent, 
  ]
})

export class OverallCustomerModule {}
