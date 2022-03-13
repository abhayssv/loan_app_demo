import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AdminUsersService } from '../service/adminusers.service';
import { adminUser } from '../../../models/adminUser';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'edit-user',
  templateUrl: '../templates/edituser.component.html'
})

export class EditUserComponent implements OnInit{

  public user: adminUser;
  profile_image: any;
  userSubCategory: adminUser;
  userCategory: adminUser; 
  has_role: any;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private userService : AdminUsersService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("Edit Users"); 
    }

  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['user']; 
    
    if(response){
      self.user= response.data[0]; 
      this.has_role = parseInt(self.user.has_role); 
    }
    this.userService.getUserCategory().subscribe(res=>{ 
      if(res){ this.userCategory = res.data; }    
    })
    this.userService.getUserSubCategory(this.user.user_type).subscribe(res=>{ 
      if(res){ this.userSubCategory = res.data; }  
    })
  } 

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profile_image = file; 
    }
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
  
  save(){ 
    var value = this.user;
    var formData = new FormData();
      formData.append("id", value.id);
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
        this.toastr.success(res['message'], 'Success');
        this.router.navigate(['/users'])
       },
      error => {
        console.log(error);
      }
    );
  }
}
