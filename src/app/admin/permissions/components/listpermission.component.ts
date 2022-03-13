import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../service/permission.service';
import { Permissions } from '../../../models/permissions';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-permission',
  templateUrl: '../templates/listpermission.component.html'
})

export class ListPermissionComponent implements OnInit {

  public permissions: Permissions; 
  public indexOfClickedRow:number; 
  // setintrval: NodeJS.Timer;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private permissionService: PermissionService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Permission"); 
    }

  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['permissions']; 
    if(response){
      self.permissions = response.data;  
    }
    $(function (){
      $('#lispermissions').DataTable({
        responsive:true,
        "order": []
      });
    });  
    // this.setintrval = setInterval(()=>{
    //   this.permissionService.getPermissions().subscribe(res=>{ 
    //     if(res){ this.permissions = res.data; } 
    //     $(function (){
    //       $('#lispermissions').dataTable({
    //         responsive:true,
    //         destroy: true,
    //         "order": []
    //       });
    //     }); 
    //   }) 
    // }, 3000);  
  } 
  
  delete1(permission_id):void{
    var allPermissions = <any>[];
    if(confirm("Do you really want to delete this permission")){
      this.permissionService.deletePermission(permission_id)
      .subscribe(response => { 
        this.toastr.success(response['message'], 'Success'); 
        if(!response['error']){
          allPermissions = this.permissions; 
            this.permissions=allPermissions.filter(h=> h.id !== permission_id);
            // this.router.navigate(['/permissions']);
        }
      });
    }
  }
  // ngOnDestroy() {
  //   clearInterval(this.setintrval); 
  // }
}

