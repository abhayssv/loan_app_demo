import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApprovalReportService } from './approvalreport.service'; 
 
@Injectable()
export class ApprovalReportResolve implements Resolve<any>{

  constructor(private approvalreportService: ApprovalReportService){}

  resolve(){  
  }
}
 
@Injectable()
export class ViewApprovalReportResolve implements Resolve<any>{
 
  constructor(private approvalreportService: ApprovalReportService){}
  
  resolve(route: ActivatedRouteSnapshot){ 
  }
}  
