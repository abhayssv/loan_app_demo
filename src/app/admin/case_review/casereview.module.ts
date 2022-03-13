import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListCaseReviewComponent } from './components/listcasereview.component';
import { ViewCasereviewComponent } from './components/viewcasereview.component';   
import { CaseReviewService } from './service/casereview.service'; 
import { CaseReviewResolve, ViewCaseReviewResolve } from './service/casereview.resolve';
import { CaseReviewRoutingModule } from './casereview.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserVideoModule } from './../user_video/uservideo.module';

@NgModule ({
  imports:[
    UserVideoModule,
    CommonModule,
    FormsModule,
    CaseReviewRoutingModule,
    NgxPaginationModule,
  ],
  providers:[
    CaseReviewService, 
    CaseReviewResolve, 
    ViewCaseReviewResolve   
  ],
  declarations:[
    ListCaseReviewComponent,
    ViewCasereviewComponent  
  ]
})

export class CaseReviewModule {}
