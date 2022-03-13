import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDaysManagementComponent } from './components/listdaysmanagement.component';  
import { DaysManagementResolve } from './service/daysmanagement.resolve';

const routes: Routes = [
  { path: "", component:ListDaysManagementComponent, resolve: {daysmanagement: DaysManagementResolve}}, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class DaysManagementRoutingModule {}
