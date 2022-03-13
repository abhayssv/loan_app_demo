import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListCollectionReportComponent } from './components/listcollectionreport.component';  
import { CollectionReportService } from './service/collectionreport.service'; 
import { CollectionReportResolve  } from './service/collectionreport.resolve';
import { CollectionReportRoutingModule } from './collectionreport.routing';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    CollectionReportRoutingModule,
    NgxPaginationModule
  ],
  providers:[
    CollectionReportService, 
    CollectionReportResolve

  ],
  declarations:[
    ListCollectionReportComponent,  
  ]
})

export class CollectionReportModule {}
