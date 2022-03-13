import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionTeamManagementService } from '../service/collectionteammanagement.service';
import { CollectionTeamManagement } from '../../../models/collectionteammanagement';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-collection-team-management',
  templateUrl: '../templates/listcollectionteammanagement.component.html'
})

export class ListCollectionTeamManagementComponent implements OnInit {

  public collectionteammanagement: CollectionTeamManagement; 
  public indexOfClickedRow:number; 

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private collectionteammanagementService: CollectionTeamManagementService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List CollectionTeamManagement"); 
    }

  ngOnInit(){ 
    let self = this;
    let response = this.route.snapshot.data['collectionteammanagements']; 
    console.log(response);
    
    if(response){
      self.collectionteammanagement = response.data;   
    }  
    $(function (){
      $('#listcollection').dataTable({
        responsive:true,
        destroy: true,
        "order": []
      });
    });  
  } 
  
  delete1(collectionteammanagement_id):void{
    var allCollectionTeamManagement = <any>[];
    if(confirm("Do you really want to delete this collectionteammanagement")){
      this.collectionteammanagementService.deleteCollectionTeamManagement(collectionteammanagement_id)
      .subscribe(response => { 
        this.toastr.success(response['message'], 'Success');
        if(!response['error']){
          allCollectionTeamManagement = this.collectionteammanagement;
            this.collectionteammanagement=allCollectionTeamManagement.filter(h=> h.user_type !== collectionteammanagement_id);
            this.router.navigate(['/collectionteammanagement']);
        }
      });
    }
  }
  
}

