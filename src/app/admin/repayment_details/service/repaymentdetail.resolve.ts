import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RepaymentDetailService } from './repaymentdetail.service'; 
 
@Injectable()
export class RepaymentDetailResolve implements Resolve<any>{

  constructor(private repaymentdetailService: RepaymentDetailService){}

  resolve(){ 
   // return this.repaymentdetailService.getRepaymentDetails();
  }
}
 
@Injectable()
export class ViewRepaymentDetailResolve implements Resolve<any>{
 
  constructor(private repaymentdetailService: RepaymentDetailService){}
  
  resolve(route: ActivatedRouteSnapshot){ 
    return this.repaymentdetailService.getRepaymentDetailView(route.paramMap.get('user_id'));
  }
}  
