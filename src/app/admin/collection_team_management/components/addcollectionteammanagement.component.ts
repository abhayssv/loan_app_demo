import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionTeamManagementService } from '../service/collectionteammanagement.service';
import { CollectionTeamManagement } from '../../../models/collectionteammanagement';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';

@Component ({
  selector: 'add-collection-team-management',
  templateUrl: '../templates/addcollectionteammanagement.component.html'
})

export class AddCollectionTeamManagementComponent implements OnInit{

    public collectionteammanagement:CollectionTeamManagement; 
    constructor(
      private router: Router,
      private collectionteammanagementService: CollectionTeamManagementService,
      private toastr: ToastrService
    ) { } 

    ngOnInit(){
       
    }
    save(val){ 
      this.collectionteammanagementService.saveCollectionTeamManagement(val)
        .subscribe(
        res => { 
            this.router.navigate(['/collectionteammanagement']);
            this.toastr.success(res.message, 'Success');
        }, 
        error => {
            console.log(error);
        }
      );
    }
}
