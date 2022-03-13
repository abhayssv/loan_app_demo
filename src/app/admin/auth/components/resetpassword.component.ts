import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { adminUser } from '../../../models/adminUser';
import { AdminAuthService } from '../service/adminauth.service';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Component({
    selector: 'forgot_password',
    templateUrl: '../templates/reset_password.component.html',
})
export class ResetPasswordComponent implements OnInit {
    model: any = {};
    loading = false;
    public adminUser:adminUser;
    constructor(
        private router: Router,
        private authenticationService: AdminAuthService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute
        ) {   
    }
    ngOnInit() {  
    } 

    resetPassword(val){ 
        this.loading = true;
        this.activatedRoute.queryParams.subscribe(params => {
            var resetLink = params['resetLink'];
            var email = params['email'];
            var value = {
                "password": val.password,
                "cpassword": val.cpassword,
                "token": resetLink,
                "email": email
            } 
            this.authenticationService.resetPassword(value)
                .subscribe(
                response => { 
                    var res = JSON.parse(JSON.stringify(response));
                    if(res.error == false)
                    {
                        this.toastr.success(res.message, 'Success');
                        this.router.navigate(['/login']);
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
        }); 
    }
}
