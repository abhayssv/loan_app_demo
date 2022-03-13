import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FirstreviewService } from './firstreview.service'; 
 
@Injectable()
export class FirstreviewResolve implements Resolve<any>{

  constructor(private firstreviewService: FirstreviewService){}

  resolve(){  
   
  }
}
 
@Injectable()
export class ViewFirstreviewResolve implements Resolve<any>{
 
  constructor(private firstreviewService: FirstreviewService){}
  
  resolve(route: ActivatedRouteSnapshot){ 
  }
}  
