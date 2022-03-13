import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ListLocationRestrictionComponent } from './components/listlocationrestriction.component'; 
import { LocationRestrictionService } from './service/locationrestriction.service';
import { LocationRestrictionResolve } from './service/locationrestriction.resolve';
import { LocationRestrictionRoutingModule } from './loanrestriction.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    LocationRestrictionRoutingModule, 
    AngularEditorModule,
  ],
  providers:[
    LocationRestrictionService, 
    LocationRestrictionResolve,  
  ],
  declarations:[
    ListLocationRestrictionComponent, 
  ]
})

export class LocationRestrictionModule {}
