import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCollectionTeamManagementComponent } from './components/addcollectionteammanagement.component';
import { ListCollectionTeamManagementComponent } from './components/listcollectionteammanagement.component';
import { EditCollectionTeamManagementComponent } from './components/editcollectionteammanagement.component'; 
import { ViewCollectionTeamManagementComponent } from './components/viewcollectionteammanagement.component'; 
import { CollectionTeamManagementService } from './service/collectionteammanagement.service';
import { CollectionTeamManagementResolve , DetailCollectionTeamManagementResolve, ViewCollectionTeamManagementResolve } from './service/collectionteammanagement.resolve';
import { CollectionTeamManagementRoutingModule } from './collectionteammanagement.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    CollectionTeamManagementRoutingModule, 
    AngularEditorModule,
  ],
  providers:[
    CollectionTeamManagementService, 
    CollectionTeamManagementResolve,
    DetailCollectionTeamManagementResolve,
    ViewCollectionTeamManagementResolve,  
  ],
  declarations:[
    ListCollectionTeamManagementComponent,
    EditCollectionTeamManagementComponent,
    AddCollectionTeamManagementComponent,
    ViewCollectionTeamManagementComponent, 
  ]
})

export class CollectionTeamManagementModule {}
