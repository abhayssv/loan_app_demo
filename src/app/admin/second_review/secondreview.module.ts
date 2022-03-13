import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListSecondreviewComponent } from './components/listsecondreview.component'; 
import { ViewSecondreviewComponent } from './components/viewsecondreview.component'; 
import { SecondreviewService } from './service/secondreview.service'; 
import { SecondreviewResolve , ViewSecondreviewResolve } from './service/secondreview.resolve';
import { SecondreviewRoutingModule } from './secondreview.routing';
import { RePaymentHistoryModule } from './../repayment_history/repayment_history.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserVideoModule } from './../user_video/uservideo.module';

@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    RePaymentHistoryModule,
    SecondreviewRoutingModule,
    NgxPaginationModule,
    UserVideoModule
  ],
  providers:[
    SecondreviewService, 
    SecondreviewResolve, 
    ViewSecondreviewResolve 

  ],
  declarations:[
    ListSecondreviewComponent, 
    ViewSecondreviewComponent, 
  ]
})

export class SecondreviewModule {}
