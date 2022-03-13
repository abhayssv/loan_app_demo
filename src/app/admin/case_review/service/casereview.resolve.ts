import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CaseReviewService } from './casereview.service'; 
 
@Injectable()
export class CaseReviewResolve implements Resolve<any>{

  constructor(private casereviewService: CaseReviewService){}

  resolve(){ 
    // return this.casereviewService.getCaseReviews();
  }
} 

@Injectable()
export class ViewCaseReviewResolve implements Resolve<any>{
 
  constructor(private casereviewService: CaseReviewService){}
  
  resolve(route: ActivatedRouteSnapshot){ 
  }
}  