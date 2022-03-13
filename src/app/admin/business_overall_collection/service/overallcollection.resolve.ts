import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OverallCollectionService } from './overallcollection.service'; 
 
@Injectable()
export class OverallCollectionResolve implements Resolve<any>{

  constructor(private overallCollectionService: OverallCollectionService){}

  resolve(){  
    // return this.overallCollectionService.getOverallCollections();
  }
}
 
@Injectable()
export class ViewOverallCollectionResolve implements Resolve<any>{
 
  constructor(private overallCollectionService: OverallCollectionService){}
  
  resolve(route: ActivatedRouteSnapshot){ 
    return this.overallCollectionService.getOverallCollection(route.paramMap.get('user_id'));
  }
}  
