import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLocationRestrictionComponent } from './components/listlocationrestriction.component';    
import { LocationRestrictionResolve } from './service/locationrestriction.resolve';

const routes: Routes = [
  { path: "", component:ListLocationRestrictionComponent, resolve: {locationrestrictions: LocationRestrictionResolve}}, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class LocationRestrictionRoutingModule {}
