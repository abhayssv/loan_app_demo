import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BusinessInterestService } from './businessinterest.service';
// import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class BusinessInterestResolve implements Resolve<any>{

  constructor(private businessinterestService: BusinessInterestService){}
  resolve(){
    return this.businessinterestService.getBusinessInterests();
  }
}

@Injectable()
export class DetailBusinessInterestResolve implements Resolve<any>{

  constructor(private businessinterestService: BusinessInterestService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.businessinterestService.getBusinessInterest(route.paramMap.get('id'));
  }
} 

@Injectable()
export class ViewBusinessInterestResolve implements Resolve<any>{

  constructor(private businessinterestService: BusinessInterestService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.businessinterestService.getBusinessInterestView(route.paramMap.get('id'));
  }
} 

// @Injectable()
// export class ViewContactResolve implements Resolve<any>{

//   constructor(private contactService: ContactService){}

//   resolve(route: ActivatedRouteSnapshot){
//     return this.contactService.getContact(route.paramMap.get('id'));
//   }
// } 
