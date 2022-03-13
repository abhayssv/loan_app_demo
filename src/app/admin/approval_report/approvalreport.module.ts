import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListApprovalReportComponent } from './components/listapprovalreport.component'; 
import { ViewApprovalReportComponent } from './components/viewapprovalreport.component'; 
import { ApprovalReportService } from './service/approvalreport.service'; 
import { ApprovalReportResolve , ViewApprovalReportResolve } from './service/approvalreport.resolve';
import { ApprovalReportRoutingModule } from './approvalreport.routing';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    ApprovalReportRoutingModule,
    NgxPaginationModule,
  ],
  providers:[
    ApprovalReportService, 
    ApprovalReportResolve, 
    ViewApprovalReportResolve 

  ],
  declarations:[
    ListApprovalReportComponent, 
    ViewApprovalReportComponent, 
  ]
})

export class ApprovalReportModule {}
