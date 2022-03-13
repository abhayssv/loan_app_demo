import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Title} from "@angular/platform-browser";

import { CollectionTeamManagement } from '../../../models/collectionteammanagement'; 

@Component({
  selector: 'view-collectionteammanagement',
  templateUrl: '../templates/viewcollectionteammanagement.component.html'
})
export class ViewCollectionTeamManagementComponent implements OnInit {

  public collectionteammanagement: CollectionTeamManagement;
  constructor(
    private route: ActivatedRoute,
    private titleService:Title
    ){ 
      this.titleService.setTitle("View Collection Team Management"); 
    }

  ngOnInit() {
    this.collectionteammanagement = this.route.snapshot.data['collectionteammanagement'].data;  
  }
}