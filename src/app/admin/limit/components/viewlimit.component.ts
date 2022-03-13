import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { userLimit } from '../../../models/userLimit';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'view-limit',
  templateUrl: '../templates/viewlimit.component.html'
})
export class ViewLimitComponent implements OnInit {

  public limit: userLimit;
  constructor(private route: ActivatedRoute) { 
  }
 
  ngOnInit() {
    this.limit = this.route.snapshot.data['limit'].data;  
  }
}