import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AdminUsersService } from './adminusers.service'; 

@Injectable()
export class UsersResolve implements Resolve<any>{

  constructor(private userService: AdminUsersService){}

  resolve(){
    return this.userService.getUsers();
  }
}

@Injectable()
export class DetailUserResolve implements Resolve<any>{

  constructor(private userService: AdminUsersService){}

  resolve(route: ActivatedRouteSnapshot){      
    return this.userService.getUser(route.paramMap.get('user_id'));
  }
} 

@Injectable()
export class ViewUserResolve implements Resolve<any>{

  constructor(private userService: AdminUsersService){}

  resolve(route: ActivatedRouteSnapshot){   
    return this.userService.getUserView(route.paramMap.get('user_id'));
  }
}  