import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Category } from '../../../models/category';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'edit-category',
  templateUrl: '../templates/editcategory.component.html'
})

export class EditCategoryComponent implements OnInit{

  public cate_gory: Category;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private categoryService : CategoryService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("Edit Category"); 
    }
 
  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['category']; 
    if(response){ 
      self.cate_gory= response.data;  
    }
  }
  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
  }
  save(){
    this.categoryService.saveCategory(this.cate_gory)
    .subscribe(
      res => {
        this.router.navigate(['/category'])
        this.toastr.success(res.message, 'Success');
       },
      error => {
        console.log(error);
      }
    );
  }
}
