import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AssignLoanService } from './assignloan.service'; 
 
@Injectable()
export class AssignLoanResolve implements Resolve<any>{

  constructor(private assignloanService: AssignLoanService){}

  resolve(){  
    return this.assignloanService.getAssignLoans();
  }
}
 
@Injectable()
export class ViewAssignLoanResolve implements Resolve<any>{
 
  constructor(private assignloanService: AssignLoanService){}
  
  resolve(route: ActivatedRouteSnapshot){ 
  }
}  
