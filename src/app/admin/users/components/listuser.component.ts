import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUsersService } from '../service/adminusers.service';
import { adminUser } from '../../../models/adminUser';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";
import { empty } from 'rxjs';

declare var $: any

@Component({
  selector: 'list-user',
  templateUrl: '../templates/listuser.component.html'
})

export class ListUserComponent implements OnInit {

  public users: adminUser;
  public indexOfClickedRow:number;
  // setintrval: NodeJS.Timer;
  public searchUsers = {
    "name" : "",
    "mobile_no" : "",
    "email" : "",
    "user_type" : "",
    "user_role" : "", 
    "active_user": "",
  };  
  userCategory: adminUser;
  userSubCategory: adminUser;
  userStatus = [
    { id: 0, name: "In-Active" },
    { id: 1, name: "Active" }, 
  ];
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private userService: AdminUsersService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Users"); 
    }

  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['users'];
    if(response){
      self.users = response.data;             
    }
    this.userService.getUserCategory().subscribe(res=>{ 
      if(res){
       this.userCategory = res.data; 
     }  
    })
    this.userService.getUserRole().subscribe(
      res => {
        this.userSubCategory = res.data;  
      }
    );
    $(function (){
      $('#lisusers').DataTable({
        responsive:true,
        "order": []
      });
    });
  }

  changeStatus(user, key){
    let status = user[key] ? true :false;
    this.userService.changeStatus(status, user.id, key)
    .subscribe(response=>{
      this.toastr.success(response.message, 'Success');
    });
  }
  
  changeContactList(user, key){
    let status = user[key] ? true :false;
    console.log("UserID", user.id);
    console.log("KEY", key);
    console.log("Status",status);
    
    
    this.userService.changeContactListPermission(status, user.id, key)
    .subscribe(response=>{
      this.toastr.success(response.message, 'Success');
    });
  }

  deleteUser(user_id):void{
    var allUsers = <any>[];
    if(confirm("Do you really want to delete this user")){
      this.userService.deleteUser(user_id)
      .subscribe(response => { 
        if(!response['error']){
          allUsers = this.users; 
          this.users=allUsers.filter(h=> h.id !== user_id); 
          this.router.navigate(['/users']);
          this.toastr.success(response['message'], 'Success');  
        }
      });
    }
  } 
  search(value){  
    this.userService.searchLoan(value)
      .subscribe(
      res => {  
          if(res === undefined || res.data.length < 1 ){
            this.toastr.error('Record not found.', 'Error');
          } 
          if(res.data){ this.users = res.data; }
      }, 
      error => {
          console.log(error);
      }
    );
  } 

  reset(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);   
  } 
}

