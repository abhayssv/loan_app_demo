import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AppUserListService } from './appuserlist.service'; 
 
@Injectable()
export class AppUserListResolve implements Resolve<any>{

  constructor(private appuserlistService: AppUserListService){}

  resolve(){  
    return this.appuserlistService.getAppUserLists();
  }
}
