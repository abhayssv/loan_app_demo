import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListAchivementComponent } from './components/listachivement.component';  
import { AchivementService } from './service/achivement.service'; 
import { AchivementResolve  } from './service/achivement.resolve';
import { AchivementRoutingModule } from './achivement.routing';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    AchivementRoutingModule,
    NgxPaginationModule
  ],
  providers:[
    AchivementService, 
    AchivementResolve

  ],
  declarations:[
    ListAchivementComponent,  
  ]
})

export class AchivementModule {}
