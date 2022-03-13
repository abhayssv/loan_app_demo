import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LocationRestrictionService } from './locationrestriction.service';
// import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class LocationRestrictionResolve implements Resolve<any>{

  constructor(private locationRestrictionService: LocationRestrictionService){}
  resolve(){ 
    return this.locationRestrictionService.getLocationRestrictions();
  }
}

  