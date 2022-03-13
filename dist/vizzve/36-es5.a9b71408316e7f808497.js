(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{R3yY:function(r,e){r.exports='<header class="section-header">\r\n    <div class="tbl">\r\n      <div class="tbl-row">\r\n        <div class="column1">\r\n            <div class="tbl-cell">\r\n                <h3>Edit Profile</h3>\r\n                <ol class="breadcrumb breadcrumb-simple">\r\n                    <li><a [routerLink]="[\'/\']">Home</a></li>\r\n                    <li><a [routerLink]="[\'/profile\']">Profile</a></li>\r\n                    <li class="active">Edit Profile</li>\r\n                </ol>\r\n            </div>\r\n        </div>\r\n        <div class="column2">\r\n          <div *ngIf="user.profileimage" class="tbl-cell"> \r\n            <img [src]="user.profileimage" alt="Avatar" class="prof_imgs">\r\n            <h6>Profile Image</h6>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </header>\r\n  \x3c!-- Main content --\x3e\r\n  \r\n  <section class="box-typical box-typical-padding">\r\n    <form name="form" (ngSubmit)="f.form.valid && save()" #f="ngForm" enctype="multipart/form-data" novalidate>\r\n      <input type="hidden" name="id" [(ngModel)]="user.id" #id="ngModel">\r\n      <div class="row">\r\n        <div class="col-sm-12">\r\n          <div class="row">\r\n            <div class="col-md-6">\r\n              <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !firstname.valid}">\r\n                <label for="firstname" class="required semibold form-label">FirstName</label>\r\n                <input type="text" class="form-control" name="firstname" [(ngModel)]="user.firstname" #firstname="ngModel"\r\n                  required>\r\n                <div *ngIf="f.submitted && !firstname.valid" class="help-block">FirstName is required</div>\r\n              </div>\r\n            </div> \r\n            <div class="col-sm-6">\r\n              <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !lastname.valid}">\r\n                <label for="lastname" class="required semibold form-label">LastName</label>\r\n                <input type="text" class="form-control" name="lastname" [(ngModel)]="user.lastname" #lastname="ngModel"\r\n                  required>\r\n                <div *ngIf="f.submitted && !lastname.valid" class="help-block">LastName is required</div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class="row">\r\n            <div class="col-lg-6">\r\n                <fieldset class="form-group">\r\n                    <label class="semibold form-label" for="email">Email </label>\r\n                    <span class="form-control maxlength-simple">{{ user.email || "&nbsp;" }}</span>\r\n                </fieldset>\r\n            </div> \r\n            <div class="col-sm-6">\r\n              <div class="form-group" >\r\n                <label for="profile_image" class="required semibold form-label">Profile Image</label>\r\n                <input type="file" class="form-control" name="profile_image" #profile_image (change)="selectImage($event)"> \r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class="row">\r\n            <div class="col-lg-6">\r\n                <fieldset class="form-group">\r\n                  <label class="semibold form-label" for="mobile_no">Mobile Number </label>\r\n                  <span class="form-control maxlength-simple">{{ user.mobile_no || "&nbsp;" }}</span>\r\n                </fieldset>\r\n            </div> \r\n          </div>\r\n            <div class="checkbox-toggle row">\r\n                <div class="col-md-6 ">\r\n                    <label class="form-label uppercase change-password-link">\r\n                    <input type="checkbox" checked="" name="changePassword" [(ngModel)]="user.changePassword"\r\n                    #changePassword="ngModel" value="false"> Change Password</label>\r\n                </div>\r\n            </div>\r\n            <div class="row">\r\n                <div class="col-md-6">\r\n                    <div class="form-group" *ngIf="user.changePassword">\r\n                        <label class="required form-label semibold">New Password</label>\r\n                        <input type="password" class="form-control" name="password" placeholder="Password" [(ngModel)]="user.password" #password="ngModel" required reverse="true" />\r\n                        <div style="color: #fa424a;" *ngIf="f.submitted && !password.valid" class="help-block">Password is required.\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="row">\r\n                <div class="col-md-6">\r\n                    <div class="form-group" *ngIf="user.changePassword">\r\n                        <label class="required form-label semibold">Repeat Password</label>\r\n                        <input type="password" class="form-control" name="repeatPassword" placeholder="Repeat password" [(ngModel)]="user.repeatPassword" #repeatPassword="ngModel" required validateEqual="password"/>\r\n                        <div style="color: #fa424a;" *ngIf="f.submitted && !repeatPassword.valid" class="help-block">Password mismatch\r\n                        </div> \r\n                    </div>\r\n                </div>\r\n            </div>\r\n          <div class="col-md-12 align-middle">\r\n            <div class="form-group">\r\n              <button class="btn btn-primary" style="margin-right: 10px;">Save</button>\r\n              <a class="btn btn-primary" [routerLink]="[\'/users\']">Cancel</a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </section>'},RsRc:function(r,e){r.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Profile</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li class="active">Profile</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\x3c!-- Main content --\x3e\r\n<section class="box-typical box-typical-padding">\r\n  <div class="user-card-row">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell tbl-cell-photo tbl-cell-photo-64">\r\n        <a class="pro-image" target="_blank">\r\n          <img [attr.src]="profile.profileimagethumb" role="button" class="product-img-border"/>\r\n        </a>\r\n      </div>\r\n      <div class="tbl-cell">\r\n        <p class="user-card-row-name font-16">{{ profile.firstname }} {{ profile.lastname }}</p>\r\n        <p class="user-card-row-mail font-14">{{ profile.email }}</p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class="row m-y-3">\r\n    <div class="col-lg-6">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="firstname">First Name </label>\r\n        <span class="form-control maxlength-simple">{{ profile.firstname || "&nbsp;" }}</span>\r\n      </fieldset>\r\n    </div>\r\n    <div class="col-lg-6">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="lastname">Last Name </label>\r\n        <span class="form-control maxlength-simple">{{ profile.lastname || "&nbsp;" }}</span>\r\n      </fieldset>\r\n    </div>\r\n    <div class="col-lg-6">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="email">Email </label>\r\n        <span class="form-control maxlength-simple">{{ profile.email || "&nbsp;" }}</span>\r\n      </fieldset>\r\n    </div>\r\n    <div class="col-lg-6">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="mobile_no">Mobile Number </label>\r\n        <span class="form-control maxlength-simple">{{ profile.mobile_no || "&nbsp;" }}</span>\r\n      </fieldset>\r\n    </div>\r\n    <div class="col-lg-12 form-group m-y-1">\r\n      <a [routerLink]="[\'/profile/edit\']" class="btn btn-primary">Edit</a>\r\n    </div>\r\n  </div>\r\n</section>\r\n\x3c!-- /.content --\x3e'},UuuG:function(r,e,s){"use strict";s.r(e);var l=s("mrSG"),n=s("CcnG"),a=s("Ip0R"),i=s("gIcY"),o=s("ZYCi"),t=function(){function r(r){this.route=r}return r.prototype.ngOnInit=function(){this.profile=this.route.snapshot.data.profile.data},r.ctorParameters=function(){return[{type:o.a}]},r=l.b([Object(n.n)({selector:"view-profile",template:s("RsRc")})],r)}(),d=s("EtBE"),c=s("SZbH"),m=function(){function r(r,e,s,l){this.router=r,this.route=e,this.userService=s,this.toastr=l}return r.prototype.ngOnInit=function(){this.user=this.route.snapshot.data.profile.data},r.prototype.selectImage=function(r){if(r.target.files.length>0){var e=r.target.files[0];this.profile_image=e}},r.prototype.save=function(){var r=this,e=this.user,s=new FormData;s.append("firstname",e.firstname),s.append("lastname",e.lastname),s.append("email",e.email),s.append("newpassword",e.password),s.append("confirmpassword",e.repeatPassword),s.append("mobile_no",e.mobile_no),s.append("profile_image",this.profile_image),this.userService.saveProfile(s).subscribe((function(e){e&&(r.toastr.success(e.message,"Success"),r.router.navigate(["/profile"]))}),(function(r){console.log(r)}))},r.ctorParameters=function(){return[{type:o.f},{type:o.a},{type:d.a},{type:c.b}]},r=l.b([Object(n.n)({selector:"edit-profile",template:s("R3yY")})],r)}(),p=s("d4GM"),f=[{path:"",component:t,resolve:{profile:p.a}},{path:"edit",component:m,resolve:{profile:p.a}}],b=function(){function r(){}return r=l.b([Object(n.K)({imports:[o.g.forChild(f)],exports:[o.g]})],r)}();s.d(e,"ProfileModule",(function(){return u}));var u=function(){function r(){}return r=l.b([Object(n.K)({imports:[a.b,i.a,b],providers:[d.a,p.a],declarations:[t,m]})],r)}()}}]);