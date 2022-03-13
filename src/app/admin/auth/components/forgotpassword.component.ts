import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { adminUser } from '../../../models/adminUser';
import { AdminAuthService } from '../service/adminauth.service';
@Component({
    selector: 'forgot_password',
    templateUrl: '../templates/forgot_password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
    model: any = {};
    loading = false;
    public adminUser:adminUser;
    constructor(
        private router: Router,
        private authenticationService: AdminAuthService,
        private toastr: ToastrService
        ) {
    }
    ngOnInit() {
         
    }
    sendRequest(val){  
    this.loading = true;
    this.authenticationService.sendReqEmail(val)
        .subscribe(
        response => { 
            var res = JSON.parse(JSON.stringify(response));
            if(res.error == false)
            {
                this.toastr.success(res.message, 'Success');
                this.router.navigate(['/forgot_password']);
                this.loading = false;
            }
            else {
                this.toastr.error(res.message, 'Error');
                this.loading = false;
            } 
        },
        error => {
            console.log(error);
        }
    );
    }
}