import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CashFlattingService } from './cashflatting.service'; 
 
@Injectable()
export class CashFlattingResolve implements Resolve<any>{

  constructor(private cashflattingService: CashFlattingService){}

  resolve(){ 
    return this.cashflattingService.getCashFlattings();
  }
}
 
@Injectable()
export class ViewCashFlattingResolve implements Resolve<any>{
 
  constructor(private cashflattingService: CashFlattingService){}
  
  resolve(route: ActivatedRouteSnapshot){ 
  }
}  
