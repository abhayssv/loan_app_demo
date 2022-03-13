import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LimitService } from './limit.service';
// import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class LimitResolve implements Resolve<any>{

  constructor(private limitService: LimitService){}
  resolve(){ 
    return this.limitService.getLimits();
  }
}

@Injectable()
export class DetailLimitResolve implements Resolve<any>{

  constructor(private limitService: LimitService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.limitService.getLimit(route.paramMap.get('id'));
  }
} 

@Injectable()
export class ViewLimitResolve implements Resolve<any>{

  constructor(private limitService: LimitService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.limitService.getLimitView(route.paramMap.get('id'));
  }
} 

// @Injectable()
// export class ViewContactResolve implements Resolve<any>{

//   constructor(private contactService: ContactService){}

//   resolve(route: ActivatedRouteSnapshot){
//     return this.contactService.getContact(route.paramMap.get('id'));
//   }
// } 
