import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApproverAchivementService } from './approverachivement.service'; 
 
@Injectable()
export class ApproverAchivementResolve implements Resolve<any>{

  constructor(private approverachivementService: ApproverAchivementService){} 
  resolve(){  
  }
}
