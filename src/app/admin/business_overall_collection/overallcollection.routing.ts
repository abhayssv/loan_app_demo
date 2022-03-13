import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOverallCollectionComponent } from './components/listoverallcollection.component';  
import { ViewOverallBusinessCollectionComponent } from './components/viewoverallcollection.component';  
import { OverallCollectionResolve, ViewOverallCollectionResolve } from './service/overallcollection.resolve';

const routes: Routes = [
  { path: "", component:ListOverallCollectionComponent, resolve: {overallcollections: OverallCollectionResolve}}, 
  { path:"view/:loan_id/:user_id", component: ViewOverallBusinessCollectionComponent, resolve:{ overallcollection: ViewOverallCollectionResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class OverallCollectionRoutingModule {}
