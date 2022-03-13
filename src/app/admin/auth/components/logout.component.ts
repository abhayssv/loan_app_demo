import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminAuthService } from '../service/adminauth.service';

@Component({
  selector: 'app-logout',
  templateUrl: '../templates/logout.component.html'
})

export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AdminAuthService
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}