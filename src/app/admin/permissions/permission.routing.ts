import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPermissionComponent } from './components/listpermission.component';
import { EditPermissionComponent} from './components/editpermission.component';
import { AddPermissionComponent } from './components/addpermission.component'; 
import { ViewPermissionComponent } from './components/viewpermission.component';   
import { PermissionResolve, DetailPermissionResolve, ViewPermissionResolve } from './service/permission.resolve';

const routes: Routes = [
  { path: "", component:ListPermissionComponent, resolve: {permissions: PermissionResolve}},
  { path:"edit/:id", component: EditPermissionComponent, resolve:{ permission: DetailPermissionResolve} },
  { path:"add", component:AddPermissionComponent}, 
  { path:"view/:id", component: ViewPermissionComponent, resolve:{ permission: ViewPermissionResolve} },
  // { path:"contact/:id", component: ViewContactComponent, resolve:{ contact: ViewContactResolve} },
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class PermissionRoutingModule {}
