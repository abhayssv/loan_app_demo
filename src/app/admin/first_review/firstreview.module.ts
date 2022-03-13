import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListFirstreviewComponent } from './components/listfirstreview.component'; 
import { ViewFirstreviewComponent } from './components/viewfirstreview.component'; 
import { FirstreviewService } from './service/firstreview.service'; 
import { FirstreviewResolve , ViewFirstreviewResolve } from './service/firstreview.resolve';
import { FirstreviewRoutingModule } from './firstreview.routing';
import { RePaymentHistoryModule } from './../repayment_history/repayment_history.module';
import { UserVideoModule } from './../user_video/uservideo.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    RePaymentHistoryModule,
    FirstreviewRoutingModule,
    NgxPaginationModule,
    UserVideoModule
  ],
  providers:[
    FirstreviewService, 
    FirstreviewResolve, 
    ViewFirstreviewResolve  
  ],
  declarations:[
    ListFirstreviewComponent, 
    ViewFirstreviewComponent
  ]
})

export class FirstreviewModule {}
