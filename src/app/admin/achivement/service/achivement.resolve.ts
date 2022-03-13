import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AchivementService } from './achivement.service'; 
 
@Injectable()
export class AchivementResolve implements Resolve<any>{

  constructor(private achivementService: AchivementService){} 
  resolve(){  
  }
}
