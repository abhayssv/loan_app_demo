import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddBusinessInterestComponent } from './components/addbusinessinterest.component';
import { ListBusinessInterestComponent } from './components/listbusinesstinterest.component';
import { EditBusinessInterestComponent } from './components/editbusinessinterest.component'; 
import { ViewBusinessInterestComponent } from './components/viewbusinessinterest.component'; 
import { BusinessInterestService } from './service/businessinterest.service';
import { BusinessInterestResolve , DetailBusinessInterestResolve, ViewBusinessInterestResolve } from './service/businessinterest.resolve';
import { BusinessInterestRoutingModule } from './businessinterest.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    BusinessInterestRoutingModule, 
    AngularEditorModule,
  ],
  providers:[
    BusinessInterestService, 
    BusinessInterestResolve,
    DetailBusinessInterestResolve,
    ViewBusinessInterestResolve,  
  ],
  declarations:[
    ListBusinessInterestComponent,
    EditBusinessInterestComponent,
    AddBusinessInterestComponent,
    ViewBusinessInterestComponent, 
  ]
})

export class BusinessInterestModule {}
