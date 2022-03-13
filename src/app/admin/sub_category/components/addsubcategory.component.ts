import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategoryService } from '../service/subcategory.service';
import { SubCategory } from '../../../models/subcategory';  
import { ToastrService } from 'ngx-toastr';

@Component ({
  selector: 'add-subcategory',
  templateUrl: '../templates/addsubcategory.component.html'
})

export class AddSubCategoryComponent implements OnInit{

    public subcategory :SubCategory; 
    userCategory: SubCategory;
    userSubCategoryPermission: any;
    selectedId:any = [];
    constructor(
      private router: Router,
      private subcategoryService: SubCategoryService,
      private toastr: ToastrService
    ) { }  

    ngOnInit(){
      this.subcategory = {
        id:null,  
        user_type:null,
        name:'',
        permission:'',
        message:'',
        data: this.subcategory, 
      }
      this.subcategoryService.getUserCategory().subscribe(res=>{ 
        if(res){ this.userCategory = res.data; }  
      }) 
      this.subcategoryService.getSubCategoryPermission().subscribe(res=>{ 
        if(res){ this.userSubCategoryPermission = res.data; }   
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
