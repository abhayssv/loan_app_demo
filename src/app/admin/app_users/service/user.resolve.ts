import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class UserResolve implements Resolve<any>{

  constructor(private userService: UserService){
    
  }

  resolve(){
  }
}

@Injectable()
export class DetailUserResolve implements Resolve<any>{

  constructor(private userService: UserService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.userService.getUser(route.paramMap.get('user_id'));
  }
} 

@Injectable()
export class ViewUserResolve implements Resolve<any>{

  constructor(private userService: UserService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.userService.getUserView(route.paramMap.get('user_id'));
  }
} 

@Injectable()
export class ViewContactResolve implements Resolve<any>{

  constructor(private contactService: ContactService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.contactService.getContact(route.paramMap.get('user_id'));
  }
} 
