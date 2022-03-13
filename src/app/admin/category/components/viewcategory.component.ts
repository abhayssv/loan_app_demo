import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Title} from "@angular/platform-browser";

import { Category } from '../../../models/category'; 

@Component({
  selector: 'view-category',
  templateUrl: '../templates/viewcategory.component.html'
})
export class ViewCategoryComponent implements OnInit {

  public category: Category;
  constructor(
    private route: ActivatedRoute,
    private titleService:Title
    ){ 
      this.titleService.setTitle("View Category"); 
    }

  ngOnInit() {
    this.category = this.route.snapshot.data['category'].data;  
  }
}