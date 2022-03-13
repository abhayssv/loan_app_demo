import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CollectionTeamManagementService } from './collectionteammanagement.service';
// import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class CollectionTeamManagementResolve implements Resolve<any>{

  constructor(private collectionteammanagementService: CollectionTeamManagementService){}
  resolve(){
    return this.collectionteammanagementService.getsCollectionTeamManagement();
  }
}

@Injectable()
export class DetailCollectionTeamManagementResolve implements Resolve<any>{

  constructor(private collectionteammanagementService: CollectionTeamManagementService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.collectionteammanagementService.getCollectionTeamManagement(route.paramMap.get('id'));
  }
} 

@Injectable()
export class ViewCollectionTeamManagementResolve implements Resolve<any>{

  constructor(private collectionteammanagementService: CollectionTeamManagementService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.collectionteammanagementService.getCollectionTeamManagementView(route.paramMap.get('id'));
  }
}  