import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PermissionService } from '../service/permission.service';
import { Permissions } from '../../../models/permissions'; 
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'edit-permission',
  templateUrl: '../templates/editpermission.component.html'
})

export class EditPermissionComponent implements OnInit{

  public permission: Permissions;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private permissionService : PermissionService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("Edit Permission"); 
    }
 
  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['permission'];  
    if(response){ 
      self.permission= response.data; 
    }
  }
  
  save(){
    this.permissionService.savePermission(this.permission)
    .subscribe(
      res => {
        this.router.navigate(['/permissions'])
        this.toastr.success(res.message, 'Success');
       },
      error => {
        console.log(error);
      }
    );
  }
}
