import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { SubCategory } from '../../../models/subcategory';
import {Title} from "@angular/platform-browser"; 

@Component({
  selector: 'view-subcategory',
  templateUrl: '../templates/viewsubcategory.component.html'
})
export class ViewSubCategoryComponent implements OnInit {

  public subcategory: SubCategory; 
  permissions: any;
  constructor(
    private route: ActivatedRoute,
    private titleService:Title
    ){ 
      this.titleService.setTitle("View Sub Category"); 
    }

  ngOnInit() {
    this.subcategory = this.route.snapshot.data['subcategory'].data;
    this.permissions = this.route.snapshot.data['subcategory'].permission;   
  }
}