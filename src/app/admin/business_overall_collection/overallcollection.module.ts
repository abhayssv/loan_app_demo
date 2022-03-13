import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListOverallCollectionComponent } from './components/listoverallcollection.component'; 
import { ViewOverallBusinessCollectionComponent } from './components/viewoverallcollection.component'; 
import { OverallCollectionService } from './service/overallcollection.service'; 
import { OverallCollectionResolve , ViewOverallCollectionResolve } from './service/overallcollection.resolve';
import { OverallCollectionRoutingModule } from './overallcollection.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { RePaymentHistoryModule } from './../repayment_history/repayment_history.module';
import { UserVideoModule } from './../user_video/uservideo.module';

@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    OverallCollectionRoutingModule,
    NgxPaginationModule,
    RePaymentHistoryModule,
    UserVideoModule
  ],
  providers:[
    OverallCollectionService, 
    OverallCollectionResolve, 
    ViewOverallCollectionResolve 

  ],
  declarations:[
    ListOverallCollectionComponent, 
    ViewOverallBusinessCollectionComponent, 
  ]
})

export class BusinessOverallCollectionModule {}
