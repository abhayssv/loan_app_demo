import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProfileService } from '../service/profile.service';
import { adminUser } from '../../../models/adminUser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-profile',
  templateUrl: '../templates/editprofile.component.html'
})

export class EditProfileComponent implements OnInit{

  public user: adminUser;
  profile_image: any;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private userService : ProfileService,
    private toastr: ToastrService
  ){ }

  ngOnInit(){ 
    this.user = this.route.snapshot.data['profile'].data;  
  }
  // onChange(event: EventTarget) {
  //   let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
  //   let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
  //   let files: FileList = target.files;
  // }
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profile_image = file; 
    }
  }
  save(){ 
    var value = this.user; 
    var formData = new FormData(); 
      formData.append("firstname", value.firstname);
      formData.append("lastname", value.lastname);
      formData.append("email", value.email);
      formData.append("newpassword", value.password);
      formData.append("confirmpassword", value.repeatPassword);
      formData.append("mobile_no", value.mobile_no);
      formData.append("profile_image", this.profile_image);  
    this.userService.saveProfile(formData)
    .subscribe(
      res => { 
          if(res){
            this.toastr.success(res['message'], 'Success');
            this.router.navigate(['/profile'])
          }
       },
      error => {
        console.log(error);
      }
    );
  }
}
