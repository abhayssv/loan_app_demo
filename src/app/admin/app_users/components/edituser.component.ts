import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './../service/user.service';
import { User } from '../../../models/user';

@Component ({
  selector: 'edit-user',
  templateUrl: '../templates/edituser.component.html'
})

export class EditUserComponent implements OnInit{

  public user: User;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private userService : UserService
  ){ }

  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['user'];
    if(response){
      self.user= response.data;
    }
  }
  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
  }
  save(){
    this.userService.saveUser(this.user)
    .subscribe(
      res => {
        this.router.navigate(['/app_users'])
       },
      error => {
        console.log(error);
      }
    );
  }
}
