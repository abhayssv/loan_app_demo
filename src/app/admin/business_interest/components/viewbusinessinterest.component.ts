import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { BusinessInterest } from '../../../models/businessinterest';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'view-businessinterest',
  templateUrl: '../templates/viewbusinessinterest.component.html'
})
export class ViewBusinessInterestComponent implements OnInit {

  public businessinterest: BusinessInterest;
  constructor(private route: ActivatedRoute) { 
  }
 
  ngOnInit() {
    this.businessinterest = this.route.snapshot.data['business_interest'].data;  
  }
}