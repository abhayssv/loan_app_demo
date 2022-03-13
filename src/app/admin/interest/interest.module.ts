import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddInterestComponent } from './components/addinterest.component';
import { ListInterestComponent } from './components/listinterest.component';
import { EditInterestComponent } from './components/editinterest.component'; 
import { ViewInterestComponent } from './components/viewinterest.component'; 
import { InterestService } from './service/interest.service';
import { InterestResolve , DetailInterestResolve, ViewInterestResolve } from './service/interest.resolve';
import { InterestRoutingModule } from './interest.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    InterestRoutingModule, 
    AngularEditorModule,
  ],
  providers:[
    InterestService, 
    InterestResolve,
    DetailInterestResolve,
    ViewInterestResolve,  
  ],
  declarations:[
    ListInterestComponent,
    EditInterestComponent,
    AddInterestComponent,
    ViewInterestComponent, 
  ]
})

export class InterestModule {}
