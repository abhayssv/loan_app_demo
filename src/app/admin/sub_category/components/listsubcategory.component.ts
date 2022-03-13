import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategoryService } from '../service/subcategory.service';
import { SubCategory } from '../../../models/subcategory';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-subcategory',
  templateUrl: '../templates/listsubcategory.component.html'
})

export class ListSubCategoryComponent implements OnInit {

  public subcategory: SubCategory; 
  public indexOfClickedRow:number; 
  userCategory: SubCategory;
  // setintrval: NodeJS.Timer;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private subcategoryService: SubCategoryService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Sub Category"); 
    }

  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['subcategories']; 
    if(response){
      self.subcategory = response.data;   
    } 
    $(function (){
      $('#listsubcategory').DataTable({
        responsive:true,
        "order": []
      });
    });
    // this.setintrval = setInterval(()=>{
    //   this.subcategoryService.getsSubCategory().subscribe(res=>{ 
    //     if(res){ this.subcategory = res.data; }
    //     console.log("Running", this.subcategory ); 
    //     $(function (){
    //       $('#listsubcategory').dataTable({
    //         responsive:true,
    //         destroy: true,
    //         "order": []
    //       });
    //     }); 
    //   }) 
    // }, 3000);  
  } 
  
  delete1(subcategory_id):void{
    var allSubCategory = <any>[];
    if(confirm("Do you really want to delete this subcategory")){
      this.subcategoryService.deleteSubCategory(subcategory_id)
      .subscribe(response => { 
        this.toastr.success(response['message'], 'Success');
        if(!response['error']){
          allSubCategory = this.subcategory;
          this.subcategory=allSubCategory.filter(h=> h.id !== subcategory_id);
          this.router.navigate(['/sub_category']);
        }
      });
    }
  }
  // ngOnDestroy() {
  //   clearInterval(this.setintrval); 
  // }
}

