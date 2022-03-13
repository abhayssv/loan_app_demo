import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Category } from '../../../models/category';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-category',
  templateUrl: '../templates/listcategory.component.html'
})

export class ListCategoryComponent implements OnInit {

  public category: Category; 
  public indexOfClickedRow:number; 
  // setintrval: NodeJS.Timer;
  

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Category"); 
    }

  ngOnInit(){ 
    let self = this;
    let response = this.route.snapshot.data['categories']; 
    if(response){
      self.category = response.data;   
    }
    // this.setintrval = setInterval(()=>{
    //   this.categoryService.getsCategory().subscribe(res=>{ 
    //     if(res){ this.category = res.data; }
    //     console.log("Running", this.category ); 
    //     $(function (){
    //       $('#liscategory').dataTable({
    //         responsive:true,
    //         destroy: true,
    //         "order": []
    //       });
    //     }); 
    //   }) 
    // }, 3000); 
  } 
  
  delete1(category_id):void{
    var allCategory = <any>[];
    if(confirm("Do you really want to delete this category")){
      this.categoryService.deleteCategory(category_id)
      .subscribe(response => { 
        this.toastr.success(response['message'], 'Success');
        if(!response['error']){
          allCategory = this.category;
            this.category=allCategory.filter(h=> h.user_type !== category_id);
            this.router.navigate(['/category']);
        }
      });
    }
  }
  // ngOnDestroy() {
  //   clearInterval(this.setintrval); 
  // }
}

