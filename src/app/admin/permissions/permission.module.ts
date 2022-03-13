import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddPermissionComponent } from './components/addpermission.component';
import { ListPermissionComponent } from './components/listpermission.component';
import { EditPermissionComponent } from './components/editpermission.component'; 
import { ViewPermissionComponent } from './components/viewpermission.component'; 
import { PermissionService } from './service/permission.service';
import { PermissionResolve , DetailPermissionResolve, ViewPermissionResolve } from './service/permission.resolve';
import { PermissionRoutingModule } from './permission.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    PermissionRoutingModule, 
    AngularEditorModule,
  ],
  providers:[
    PermissionService, 
    PermissionResolve,
    DetailPermissionResolve,
    ViewPermissionResolve,  
  ],
  declarations:[
    ListPermissionComponent,
    EditPermissionComponent,
    AddPermissionComponent,
    ViewPermissionComponent, 
  ]
})

export class PermissionModule {}
