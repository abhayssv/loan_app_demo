import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Category } from '../../../models/category';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';

@Component ({
  selector: 'add-category',
  templateUrl: '../templates/addcategory.component.html'
})

export class AddCategoryComponent implements OnInit{

    public category:Category; 
    constructor(
      private router: Router,
      private categoryService: CategoryService,
      private toastr: ToastrService
    ) { } 

    ngOnInit(){
      this.category = {
        id:null,  
        category:'',
        description:'',
        message:'',
        data: this.category,
      }
    }
    save(val){ 
      this.categoryService.saveCategory(val)
        .subscribe(
        res => { 
            this.router.navigate(['/category']);
            this.toastr.success(res.message, 'Success');
        }, 
        error => {
            console.log(error);
        }
      );
    }
}
