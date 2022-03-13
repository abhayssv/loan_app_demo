import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListReviewerReportComponent } from './components/listreviewerreport.component';  
import { ReviewerReportService } from './service/reviewerreport.service'; 
import { ReviewerReportResolve  } from './service/reviewerreport.resolve';
import { ReviewerReportRoutingModule } from './reviewerreport.routing';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    ReviewerReportRoutingModule,
    NgxPaginationModule
  ],
  providers:[
    ReviewerReportService, 
    ReviewerReportResolve

  ],
  declarations:[
    ListReviewerReportComponent,  
  ]
})

export class ReviewerReportModule {}
