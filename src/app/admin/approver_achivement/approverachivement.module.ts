import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListApproverAchivementComponent } from './components/listapproverachivement.component';  
import { ApproverAchivementService } from './service/approverachivement.service'; 
import { ApproverAchivementResolve  } from './service/approverachivement.resolve';
import { ApproverAchivementRoutingModule } from './approverachivement.routing';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    ApproverAchivementRoutingModule,
    NgxPaginationModule
  ],
  providers:[
    ApproverAchivementService, 
    ApproverAchivementResolve

  ],
  declarations:[
    ListApproverAchivementComponent,  
  ]
})

export class ApproverAchivementModule {}
