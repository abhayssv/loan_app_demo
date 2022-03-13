import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminUsersService } from '../service/adminusers.service';
import { adminUser } from '../../../models/adminUser';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'view-user',
  templateUrl: '../templates/viewuser.component.html'
})
export class ViewUserComponent implements OnInit {

  public user: adminUser; 
  userCategory: adminUser;
  userSubCategory: adminUser;
  constructor(
    private route: ActivatedRoute, 
    private userService: AdminUsersService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("View Users"); 
    }
  ngOnInit() {
    this.user = this.route.snapshot.data['user'].data[0]; 
    this.userService.getUserCategory().subscribe(res=>{ 
      if(res){ this.userCategory = res.data; }  
    })
    this.userService.getAllUserSubCategory().subscribe(res=>{ 
      if(res){ this.userSubCategory = res.data; }  
    })
  }
  
}