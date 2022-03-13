import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../../app_users/service/user.service';
import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class UserResolve implements Resolve<any>{

  constructor(private userService: UserService){}

  resolve(){
  }
}

@Injectable()
export class ViewContactResolve implements Resolve<any>{

  constructor(private contactService: ContactService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.contactService.getContact(route.paramMap.get('user_id'));
  }
} 
