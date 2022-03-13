import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DaysManagementService } from './daysmanagement.service'; 
 
@Injectable()
export class DaysManagementResolve implements Resolve<any>{

  constructor(private daysmanagementService: DaysManagementService){}

  resolve(){  
    return this.daysmanagementService.getDaysManagements();
  }
}
