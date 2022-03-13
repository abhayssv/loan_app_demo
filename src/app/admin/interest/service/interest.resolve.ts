import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { InterestService } from './interest.service';
// import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class InterestResolve implements Resolve<any>{

  constructor(private interestService: InterestService){}
  resolve(){
    return this.interestService.getInterests();
  }
}

@Injectable()
export class DetailInterestResolve implements Resolve<any>{

  constructor(private interestService: InterestService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.interestService.getInterest(route.paramMap.get('id'));
  }
} 

@Injectable()
export class ViewInterestResolve implements Resolve<any>{

  constructor(private interestService: InterestService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.interestService.getInterestView(route.paramMap.get('id'));
  }
} 

// @Injectable()
// export class ViewContactResolve implements Resolve<any>{

//   constructor(private contactService: ContactService){}

//   resolve(route: ActivatedRouteSnapshot){
//     return this.contactService.getContact(route.paramMap.get('id'));
//   }
// } 
