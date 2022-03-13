import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ContactService } from './contact.service';


@Injectable()
export class ContactResolve implements Resolve<any>{

  constructor(private contactService: ContactService){}

  resolve(){
    return this.contactService.getContacts();
  }
}

@Injectable()
export class DetailContactResolve implements Resolve<any>{

  constructor(private contactService: ContactService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.contactService.getContact(route.paramMap.get('id'));
  }
} 

@Injectable()
export class ViewContactResolve implements Resolve<any>{

  constructor(private contactService: ContactService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.contactService.getContactView(route.paramMap.get('id'));
  }
} 
