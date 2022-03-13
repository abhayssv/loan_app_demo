import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PermissionService } from './permission.service';
// import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class PermissionResolve implements Resolve<any>{

  constructor(private permissionService: PermissionService){}
  resolve(){
    return this.permissionService.getPermissions();
  }
}

@Injectable()
export class DetailPermissionResolve implements Resolve<any>{

  constructor(private permissionService: PermissionService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.permissionService.getPermission(route.paramMap.get('id'));
  }
} 

@Injectable()
export class ViewPermissionResolve implements Resolve<any>{

  constructor(private permissionService: PermissionService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.permissionService.getPermissionView(route.paramMap.get('id'));
  }
} 

// @Injectable()
// export class ViewContactResolve implements Resolve<any>{

//   constructor(private contactService: ContactService){}

//   resolve(route: ActivatedRouteSnapshot){
//     return this.contactService.getContact(route.paramMap.get('permission_id'));
//   }
// } 
