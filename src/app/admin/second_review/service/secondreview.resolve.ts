import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SecondreviewService } from './secondreview.service'; 
 
@Injectable()
export class SecondreviewResolve implements Resolve<any>{

  constructor(private secondreviewService: SecondreviewService){}

  resolve(){ 
  }
}
 
@Injectable()
export class ViewSecondreviewResolve implements Resolve<any>{
 
  constructor(private secondreviewService: SecondreviewService){}
  
  resolve(route: ActivatedRouteSnapshot){ 
  }
}  
