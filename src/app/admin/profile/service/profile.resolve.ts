import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileResolve implements Resolve<any> {

  constructor(private profileService: ProfileService) {}

  resolve() {
    return this.profileService.getProfile();
  }
}
