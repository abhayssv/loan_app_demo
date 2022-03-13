import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Permissions } from '../../../models/permissions'; 
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'view-permission',
  templateUrl: '../templates/viewpermission.component.html'
})
export class ViewPermissionComponent implements OnInit {

  public permission: Permissions;
  constructor(
    private route: ActivatedRoute,
    private titleService:Title
    ){ 
      this.titleService.setTitle("View Permission"); 
    }

  ngOnInit() {
    this.permission = this.route.snapshot.data['permission'].data;
  }
}