import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ReviewerReportService } from './reviewerreport.service'; 
 
@Injectable()
export class ReviewerReportResolve implements Resolve<any>{

  constructor(private reviewerreportService: ReviewerReportService){} 
  resolve(){  
  }
}
