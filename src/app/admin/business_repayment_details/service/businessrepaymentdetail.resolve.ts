import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BusinessRepaymentDetailService } from './businessrepaymentdetail.service'; 
 
@Injectable()
export class BusinessRepaymentDetailResolve implements Resolve<any>{

  constructor(private businessrepaymentdetailService: BusinessRepaymentDetailService){}

  resolve(){ 
  }
}
 
@Injectable()
export class ViewBusinessRepaymentDetailResolve implements Resolve<any>{
 
  constructor(private businessrepaymentdetailService: BusinessRepaymentDetailService){}
  
  resolve(route: ActivatedRouteSnapshot){ 
    return this.businessrepaymentdetailService.getBusinessRepaymentDetailView(route.paramMap.get('user_id'));
  }
}  
