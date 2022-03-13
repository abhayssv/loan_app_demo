import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from '../service/permission.service';
import { Permissions } from '../../../models/permissions';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'add-permission',
  templateUrl: '../templates/addpermission.component.html'
})

export class AddPermissionComponent implements OnInit{

    public permission:Permissions;

    constructor(
      private router: Router,
      private permissionService: PermissionService,
      private toastr: ToastrService,
      private titleService:Title
      ){ 
        this.titleService.setTitle("Add Permission"); 
      }
  
 
    ngOnInit(){
      this.permission = {
        id:null, 
        name: '', 
        message:'',
        permission:'',
        data: this.permission,
        user:''
      }
    }
    save(){ 
      this.permissionService.savePermission(this.permission)
        .subscribe(
        res => { 
            this.router.navigate(['/permissions']);
            this.toastr.success(res.message, 'Success');
        },
        
        error => {
            console.log(error);
        }
      );
    }
}
