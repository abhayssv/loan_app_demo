import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUsersService } from '../service/adminusers.service';
import { adminUser } from '../../../models/adminUser';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'add-user',
  templateUrl: '../templates/adduser.component.html'
})

export class AddUserComponent implements OnInit{

    public user:adminUser;
    images: any;
    profile_image: any;
    userCategory: any;
    userSubCategory: any;
    constructor(
      private router: Router,
      private userService: AdminUsersService,
      private toastr: ToastrService,
      private titleService:Title
      ){ 
        this.titleService.setTitle("Add Users"); 
      }

    ngOnInit(){
      this.user = {
        id:null,
        firstname:'',
        lastname:'',
        email: '',
        mobile_no: '',
        password:'',
        repeatPassword:'',
        reset_password_token:'',
        profile_image:'',
        user_type:null,
        has_role:null,
        active:null,
        message:'',
        data: this.user,
        length:''
      } 
      this.userService.getUserCategory().subscribe(res=>{ 
        if(res){ this.userCategory = res.data; }  
      })
      // this.userService.getUserSubCategory().subscribe(res=>{ 
      //   if(res){ this.userSubCategory = res.data; }
      //   console.log(this.userSubCategory);
          
      // })
    }

    onChangeCategory(cat_id) { 
      if (cat_id) {
        this.userService.getUserSubCategory(cat_id).subscribe(
          res => {
            this.userSubCategory = res.data;  
          }
        );
      } else {
        this.userSubCategory = null; 
      }
    }

    selectImage(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.profile_image = file; 
      }
    }

    save(value){    
      var formData = new FormData();
      formData.append("firstname", value.firstname);
      formData.append("lastname", value.lastname);
      formData.append("email", value.email);
      formData.append("password", value.password);
      formData.append("mobile_no", value.mobile_no);
      formData.append("profile_image", this.profile_image);
      formData.append("user_type", value.user_type);
      formData.append("has_role", value.has_role);
      formData.append("active", (value.active === true ? '1' : '0'));  
      
      this.userService.saveUser(formData)
        .subscribe(
        res => { 
            this.router.navigate(['/users']);
            this.toastr.success(res['message'], 'Success');
        },
        error => {
            console.log(error);
        }
      );
    }
}
