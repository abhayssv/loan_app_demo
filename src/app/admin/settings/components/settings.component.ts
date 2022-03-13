import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../service/settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'settings',
  templateUrl: '../templates/settings.component.html',
  styleUrls: ['../css/settings.component.css']
})

export class SettingsComponent implements OnInit {
  
  public settings: object = {
    aadar_verification: false,
     pan_verification: false
  };''

  constructor(private settingsService: SettingsService, 
              private route: ActivatedRoute,
              private toastr: ToastrService) {
    
  }

  ngOnInit() {
     this.settings = this.route.snapshot.data['settings'].data;
  }

  changeAadarVerificationBtn() {
    this.settingsService.changeAadarVerificationBtn(this.settings).subscribe(res=>{ 
      if(res) { 
        this.toastr.success(res.message, 'Success'); 
      } else {
        this.toastr.error(res.message, 'Failed'); 
      }
    });
  }

  changePanVerificationBtn() {
    this.settingsService.changePanVerificationBtn(this.settings).subscribe(res=>{ 
      if(res) { 
        this.toastr.success(res.message, 'Success'); 
      } else {
        this.toastr.error(res.message, 'Failed'); 
      }
    });
  }
}

