import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCollectionReportComponent } from './components/listcollectionreport.component';   
import { CollectionReportResolve } from './service/collectionreport.resolve';

const routes: Routes = [
  { path: "", component:ListCollectionReportComponent, resolve: {collectionreports: CollectionReportResolve}} 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class CollectionReportRoutingModule {}
