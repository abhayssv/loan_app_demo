import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminAuthService } from '../service/adminauth.service';
@Component({
    selector: 'login',
    templateUrl: '../templates/login.component.html',
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    constructor(
        private router: Router,
        private authenticationService: AdminAuthService,
        private toastr: ToastrService
        ) {
        this.model.useremail = localStorage.getItem('adminRememberEmail');
        this.model.rememberme = localStorage.getItem('adminRememberMe');
    }
    ngOnInit() {
        if (localStorage.getItem('adminUserSession')) {
            this.router.navigate(['']);
        }
    }
    login() {
        this.loading = true;   
        this.authenticationService.login(this.model.useremail, this.model.password, this.model.rememberme)
            .subscribe(response => {
                var res = JSON.parse(JSON.stringify(response));
                if(res.newToken && res.error == false)
                {
                    this.toastr.success("You are being redirected", 'Success');
                    this.router.navigate(['']);
                }
                else {
                    this.toastr.error(res.message, 'Error');
                    this.loading = false;
                }
            });
    }
}
