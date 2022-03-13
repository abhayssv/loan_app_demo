import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CollectionReportService } from './collectionreport.service'; 
 
@Injectable()
export class CollectionReportResolve implements Resolve<any>{

  constructor(private collectionreportService: CollectionReportService){} 
  resolve(){  
  }
}
