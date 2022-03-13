import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListBusinessRepaymentDetailComponent } from './components/listbusinessrepaymentdetail.component'; 
import { ViewBusinessRepaymentDetailComponent } from './components/viewbusinessrepaymentdetail.component'; 
import { BusinessRepaymentDetailService } from './service/businessrepaymentdetail.service'; 
import { BusinessRepaymentDetailResolve , ViewBusinessRepaymentDetailResolve } from './service/businessrepaymentdetail.resolve';
import { BusinessRepaymentDetailRoutingModule } from './businessrepaymentdetail.routing';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    BusinessRepaymentDetailRoutingModule,
    NgxPaginationModule
  ],
  providers:[
    BusinessRepaymentDetailService, 
    BusinessRepaymentDetailResolve, 
    ViewBusinessRepaymentDetailResolve 

  ],
  declarations:[
    ListBusinessRepaymentDetailComponent, 
    ViewBusinessRepaymentDetailComponent, 
  ]
})

export class BusinessRepaymentDetailModule {}
