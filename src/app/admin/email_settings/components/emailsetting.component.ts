import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailSettingService } from '../service/emailsetting.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'email-setting',
  templateUrl: '../templates/emailsetting.component.html',
  styleUrls: ['../css/emailsetting.component.css']
})

export class EmailSettingComponent implements OnInit {
  
  public emailsettings: Array<any> = [];

  constructor(private emailSettingService: EmailSettingService, 
              private route: ActivatedRoute,
              private toastr: ToastrService,) {
    
  }

  ngOnInit() {
     this.emailsettings = this.route.snapshot.data['emailsettings'].data;
  }

  changeEmailSetting(each) {
    this.emailSettingService.setEmailType(each).subscribe(res=>{ 
      if(res) { 
        this.toastr.success(res.message, 'Success'); 
      } else {
        this.toastr.error(res.message, 'Failed'); 
      }
    });
  }
}

