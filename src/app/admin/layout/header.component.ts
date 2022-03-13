import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from '../../models/profile';
import { ChangeProfileService } from '../../shared/change-profile.service';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  public profile_details: Profile;
  currentDate: Date;

  constructor(private route: ActivatedRoute, private changeProfileService: ChangeProfileService, private router: Router) { }
  ngOnInit() {
    this.profile_details =  this.route.snapshot.data['profile'].data;
    this.changeProfileService.getEmittedValue()
      .subscribe(profile => this.profile_details=profile);
    this.currentDate = new Date();
  }
  logout() {
  	if(confirm('Are you sure you want to end the session?')){
  		this.router.navigate(['/logout']);
  	}
  }
}
