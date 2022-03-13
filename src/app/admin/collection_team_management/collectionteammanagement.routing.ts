import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCollectionTeamManagementComponent } from './components/listcollectionteammanagement.component';
import { EditCollectionTeamManagementComponent} from './components/editcollectionteammanagement.component';
import { AddCollectionTeamManagementComponent } from './components/addcollectionteammanagement.component'; 
import { ViewCollectionTeamManagementComponent } from './components/viewcollectionteammanagement.component';   
import { CollectionTeamManagementResolve, DetailCollectionTeamManagementResolve, ViewCollectionTeamManagementResolve } from './service/collectionteammanagement.resolve';

const routes: Routes = [
  { path: "", component:ListCollectionTeamManagementComponent, resolve: {collectionteammanagements: CollectionTeamManagementResolve}},
  { path:"edit/:id", component: EditCollectionTeamManagementComponent, resolve:{ collectionteammanagement: DetailCollectionTeamManagementResolve} },
  { path:"add", component:AddCollectionTeamManagementComponent}, 
  { path:"view/:id", component: ViewCollectionTeamManagementComponent, resolve:{ collectionteammanagement: ViewCollectionTeamManagementResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class CollectionTeamManagementRoutingModule {}
