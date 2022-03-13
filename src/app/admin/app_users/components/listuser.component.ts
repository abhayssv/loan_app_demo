import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-user',
  templateUrl: '../templates/listuser.component.html'
})

export class ListUserComponent implements OnInit {

  public users: Array<User>;
  public indexOfClickedRow:number;
  /* pagination */
  p: number = 1;
  limit: number = 10;
  total: number;
  length: any;
  isLoading: boolean;
  isSearching: boolean;
  searchOptions: object;
  public searchcustomer = {
    "from_date" : "",
    "to_date" : "",  
    "mobile_no" : "",
    "email" : "",
    "name" : "",
    "user_type": "",
    "id_number": "" 
  };

  userLevels = [
    { id: 0, level: "Silver" },
    { id: 1, level: "Gold" },
    { id: 2, level: "Platinum" },
    { id: 3, level: "Diamond" },
  ];
  userTypes = [
    { id: 0, user_type: "Student" },
    { id: 1, user_type: "Employment" },
    { id: 2, user_type: "Business" }, 
  ]  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private userService: UserService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Customer"); 
    }

  ngOnInit(){ 
    this.getCustomersDetail(this.p); 
  }

  getPage(pageNo: number) {
    this.p = pageNo;
    if(this.isSearching) {
      this.doSearch();
    } else {
      this.getCustomersDetail(this.p);
    }
  }

  search(value){ 
    this.searchOptions = value;
    this.p = 1; 
    this.total = 0;
    this.users = new Array<User>();
    this.doSearch()
  }

  getCustomersDetail(p: number) {
    let offset = (p - 1) * this.limit;
     this.isLoading = true;
    this.userService.getCustomers(offset, this.limit).subscribe(
      result => { 
        this.users = result.data || [];
        this.length = this.users.length || 0;
        this.total = Number(result.total) || 0; 
        this.isLoading = false;
      }
    )
  }

  changeStatus(user, key){
    let status = user[key] ? true :false;
    this.userService.changeStatus(status, user.user_id, key)
    .subscribe(response=>{ 
    });
  }

  changeLevel(user, key){
    let level = user[key]; 
    this.userService.changeLevel(level, user.user_id, key)
    .subscribe(response=>{
      this.toastr.success(response.message, 'Success');
    });
  }

  changeUserType(user, key){
    let user_type = user[key]; 
    console.log(user.user_id);
    
    this.userService.changeUserType(user_type, user.user_id, key)
    .subscribe(response=>{
      this.toastr.success(response.message, 'Success');
    });
  }
 
  delete1(user_id):void{
    var allUsers = <any>[];
    if(confirm("Do you really want to delete this user")){
      this.userService.deleteUser(user_id)
      .subscribe(response => {
        if(!response['error']){
          allUsers = this.users;
            this.users=allUsers.filter(h=> h.user_id !== user_id);
            // this.router.navigate(['/app_users']);
        }
      });
    }
  }

  reset(){ 
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }  

  doSearch(){  
    this.isLoading = true;
    this.isSearching = true;
    let offset = (this.p - 1) * this.limit; 
    this.userService.searchCustomers(this.searchOptions, offset, this.limit)
      .subscribe(
      res => { 
          this.isLoading = false;
          if(res === undefined){
            this.toastr.error('Record not found.', 'Error');
          }
          if(res){ 
            this.users = [].concat(res.data);
            this.length = this.users.length || 0;
            this.total = Number(res.total || 0 ); 
          }
      }, 
      error => {
          console.log(error);
      }
    ); 
  }

}

