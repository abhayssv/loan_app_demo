import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OverallCustomerService } from './overallcustomer.service'; 
 
@Injectable()
export class OverallCustomerResolve implements Resolve<any>{

  constructor(private overallcustomerService: OverallCustomerService){}

  resolve(){  
  }
}
 
@Injectable()
export class ViewOverallCustomerResolve implements Resolve<any>{
 
  constructor(private overallcustomerService: OverallCustomerService){}
  
  resolve(route: ActivatedRouteSnapshot){ 
  }
}  
