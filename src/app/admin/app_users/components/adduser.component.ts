import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../../../models/user';


@Component ({
  selector: 'add-user',
  templateUrl: '../templates/adduser.component.html'
})

export class AddUserComponent implements OnInit{

    public user:User;

    constructor(
      private router: Router,
      private userService: UserService
    ) { }

    ngOnInit(){
      // this.user = {
      //   user_id:null,
      //   email: '',
      //   mobile_no: '',
      //   status:null,
      //   data: this.user,
      // }
    }
    save(){ 
      this.userService.saveUser(this.user)
        .subscribe(
        res => {
            this.router.navigate(['/app_users']);
        },
        error => {
            console.log(error);
        }
      );
    }
}
