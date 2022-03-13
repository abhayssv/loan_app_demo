import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Profile } from '../../../models/profile';

@Component({
  selector: 'view-profile',
  templateUrl: '../templates/viewprofile.component.html'
})
export class ViewProfileComponent implements OnInit {

  public profile: Profile;
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.profile = this.route.snapshot.data['profile'].data;
  }
}