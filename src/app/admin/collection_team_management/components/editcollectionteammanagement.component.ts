import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CollectionTeamManagementService } from '../service/collectionteammanagement.service';
import { CollectionTeamManagement } from '../../../models/collectionteammanagement';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'edit-collection-team-management',
  templateUrl: '../templates/editcollectionteammanagement.component.html'
})

export class EditCollectionTeamManagementComponent implements OnInit{

  public collectionteammanagement: CollectionTeamManagement;
  public user_role : any;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private collectionteammanagementService : CollectionTeamManagementService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("Edit Collection Team Management"); 
    }
 
  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['collectionteammanagement']; 
    console.log("response",response);
    
    if(response){ 
      self.collectionteammanagement= response.data;  
      if(self.collectionteammanagement.role_id == 7){
        this.user_role = "Customer Care";
      }else if(self.collectionteammanagement.role_id == 8){
        this.user_role = "S1";
      }else if(self.collectionteammanagement.role_id == 9){
        this.user_role = "S2";
      }else if(self.collectionteammanagement.role_id == 10){
        this.user_role = "S3";
      }else if(self.collectionteammanagement.role_id == 11){
        this.user_role = "M1";
      }else if(self.collectionteammanagement.role_id == 12){
        this.user_role = "M2";
      }
    }
  } 
  save(){
    this.collectionteammanagementService.saveCollectionTeamManagement(this.collectionteammanagement)
    .subscribe(
      res => {
        this.router.navigate(['/collection_team_management'])
        this.toastr.success(res.message, 'Success');
      },
      error => {
        console.log(error);
      }
    );
  }
}
