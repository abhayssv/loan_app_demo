import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PushNotificationService } from '../service/pushnotification.service';
import { ToastrService } from 'ngx-toastr';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'pushnotification',
  templateUrl: '../templates/pushnotification.component.html',
  styleUrls: ['../css/pushnotification.component.css']
})

export class PushNotificationComponent implements OnInit {
  
  notification:any;
  constructor(private pushNotificationService: PushNotificationService, 
              private route: ActivatedRoute,
              private toastr: ToastrService,) {

   this.notification = {title:'', body:''}
  }

  ngOnInit() {
  }

  sendNotification(f:NgForm) {
    if (f.valid) {
      this.pushNotificationService.sendNotification(this.notification).subscribe(res=>{ 
        if(!res.error) { 
          this.toastr.success(res.message, 'Success'); 
        } else {
          this.toastr.error(res.message, 'Failed'); 
        }
      });
   }
  }
}

