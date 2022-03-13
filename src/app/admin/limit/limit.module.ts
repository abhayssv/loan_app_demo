import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddLimitComponent } from './components/addlimit.component';
import { ListLimitComponent } from './components/listlimit.component';
import { EditLimitComponent } from './components/editlimit.component'; 
import { ViewLimitComponent } from './components/viewlimit.component'; 
import { LimitService } from './service/limit.service';
import { LimitResolve , DetailLimitResolve, ViewLimitResolve } from './service/limit.resolve';
import { LimitRoutingModule } from './limit.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    LimitRoutingModule, 
    AngularEditorModule,
  ],
  providers:[
    LimitService, 
    LimitResolve,
    DetailLimitResolve,
    ViewLimitResolve,  
  ],
  declarations:[
    ListLimitComponent,
    EditLimitComponent,
    AddLimitComponent,
    ViewLimitComponent, 
  ]
})

export class LimitModule {}
