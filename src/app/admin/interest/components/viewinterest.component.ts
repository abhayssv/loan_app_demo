import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Interest } from '../../../models/interest';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'view-interest',
  templateUrl: '../templates/viewinterest.component.html'
})
export class ViewInterestComponent implements OnInit {

  public interest: Interest;
  constructor(private route: ActivatedRoute) { 
  }
 
  ngOnInit() {
    this.interest = this.route.snapshot.data['interest'].data;  
  }
}