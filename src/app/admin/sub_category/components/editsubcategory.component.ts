import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SubCategoryService } from '../service/subcategory.service';
import { SubCategory } from '../../../models/subcategory';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'edit-subcategory',
  templateUrl: '../templates/editsubcategory.component.html'
})

export class EditSubCategoryComponent implements OnInit{

  public sub_cate_gory: SubCategory;
  userCategory: SubCategory; 
  selectedId: any = [];
  per_missions: any; 
  id: any;
   
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private subcategoryService : SubCategoryService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("Edit Sub Category"); 
    }
 
  ngOnInit(){ 
    this.subcategoryService.getUserCategory().subscribe(res=>{ 
      if(res){ this.userCategory = res.data; } 
    })
    this.subcategoryService.getSubCategoryPermission().subscribe(res=>{ 
      if(res){ 
        this.per_missions = res.data  
      }    
    })   
    this.getData();
  }

  getData(){
    this.id = this.route.snapshot.params.id; 
    this.subcategoryService.getSubCategory(this.id).subscribe(res=>{ 
      if(res){ 
        this.sub_cate_gory = res.data;  
        this.selectedId = res.data.permission; 
      }    
    })  
  }

  onChange(event){
    let index = this.selectedId.indexOf(parseInt(event.target.value));
    if(index == -1){
      this.selectedId.push(parseInt(event.target.value)); 
    }else{
      this.selectedId.splice(index,1)
    }  
  }

  save(val){   
    val.permission = this.selectedId; 
    this.subcategoryService.saveSubCategory(val)
      .subscribe(
      res => { 
        this.router.navigate(['/sub_category']);
        this.toastr.success(res.message, 'Success');
      }, 
      error => {
          console.log(error);
      }
    );
  } 
}
