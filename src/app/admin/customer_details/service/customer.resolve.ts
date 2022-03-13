import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CustomerService } from './customer.service'; 
 
@Injectable()
export class CustomerResolve implements Resolve<any>{

  constructor(private userService: CustomerService){}

  resolve(){ 
    // return this.userService.getCustomers();
  }
} 

@Injectable()
export class ViewCustomerResolve implements Resolve<any>{
 
  constructor(private userService: CustomerService){}
  
  resolve(route: ActivatedRouteSnapshot){ 
    return this.userService.getCustomerView(route.paramMap.get('user_id'));
  }
} 

@Injectable()
export class ViewAgreementPdfResolve implements Resolve<any>{
 
  constructor(private userService: CustomerService){}
  
  resolve(route: ActivatedRouteSnapshot){ 
    return this.userService.getAgreementPdfData(route.paramMap.get('loan_id'));
  }
}
