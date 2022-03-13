(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"Dg/5":function(i,r){i.exports='<header class="section-header">\r\n    <div class="tbl">\r\n        <div class="tbl-row">\r\n            <div class="tbl-cell">\r\n                <h3>Add Permission</h3>\r\n                <ol class="breadcrumb breadcrumb-simple">\r\n                    <li><a [routerLink]="[\'/\']">Home</a></li>\r\n                    <li><a [routerLink]="[\'/permissions\']">Permissions</a></li>\r\n                    <li class="active">Add Permission</li>\r\n                </ol>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</header>\r\n\x3c!-- Main content --\x3e\r\n<section class="box-typical box-typical-padding">\r\n    <form name="form" (ngSubmit)="f.form.valid && save()" #f="ngForm" novalidate>\r\n        <div class="row m-t-1">\r\n            <div class="col-sm-12">\r\n                <div class="row">\r\n                    <div class="col-md-12">\r\n                        <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !per_name.valid}">\r\n                            <label for="per_name" class="required semibold form-label">Permission Name</label>\r\n                            <input type="text" class="form-control" name="per_name" [(ngModel)]="permission.per_name" #per_name="ngModel" required>\r\n                            <div *ngIf="f.submitted && !per_name.valid" class="help-block">Permission name field is required</div>\r\n                        </div>\r\n                    </div>\r\n                </div> \r\n            </div> \r\n            <div class="col-md-12 align-middle">\r\n                <div class="form-group">\r\n                    <button class="btn btn-primary" style="margin-right: 10px;">Save</button>\r\n                    <a class="btn btn-primary" [routerLink]="[\'/permissions\']">Cancel</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</section>'},ERMc:function(i,r){i.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Permission Details</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/permissions\']">Permissions</a></li>\r\n          <li class="active">Permission Details</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\x3c!-- Main content --\x3e\r\n<section class="box-typical box-typical-padding"> \r\n  <div class="row m-y-1">\r\n    <div class="col-lg-12">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="email">Permission Name </label>\r\n        <span class="form-control maxlength-simple">{{ permission.per_name }}</span>\r\n      </fieldset>\r\n    </div> \r\n  </div> \r\n</section>\r\n\x3c!-- /.content --\x3e'},HfSI:function(i,r,e){"use strict";e.r(r);var n=e("mrSG"),s=e("CcnG"),t=e("Ip0R"),o=e("gIcY"),a=e("ZYCi"),l=e("9lVT"),c=e("SZbH"),m=e("ZYjt"),d=function(){function i(i,r,e,n){this.router=i,this.permissionService=r,this.toastr=e,this.titleService=n,this.titleService.setTitle("Add Permission")}return i.prototype.ngOnInit=function(){this.permission={id:null,name:"",message:"",permission:"",data:this.permission,user:""}},i.prototype.save=function(){var i=this;this.permissionService.savePermission(this.permission).subscribe((function(r){i.router.navigate(["/permissions"]),i.toastr.success(r.message,"Success")}),(function(i){console.log(i)}))},i.ctorParameters=function(){return[{type:a.f},{type:l.a},{type:c.b},{type:m.c}]},i=n.b([Object(s.n)({selector:"add-permission",template:e("Dg/5")})],i)}(),p=function(){function i(i,r,e,n,s){this.route=i,this.router=r,this.permissionService=e,this.toastr=n,this.titleService=s,this.titleService.setTitle("List Permission")}return i.prototype.ngOnInit=function(){var i=this.route.snapshot.data.permissions;i&&(this.permissions=i.data),$((function(){$("#lispermissions").DataTable({responsive:!0,order:[]})}))},i.prototype.delete1=function(i){var r=this,e=[];confirm("Do you really want to delete this permission")&&this.permissionService.deletePermission(i).subscribe((function(n){r.toastr.success(n.message,"Success"),n.error||(e=r.permissions,r.permissions=e.filter((function(r){return r.id!==i})))}))},i.ctorParameters=function(){return[{type:a.a},{type:a.f},{type:l.a},{type:c.b},{type:m.c}]},i=n.b([Object(s.n)({selector:"list-permission",template:e("O0IA")})],i)}(),u=function(){function i(i,r,e,n,s){this.router=i,this.route=r,this.permissionService=e,this.toastr=n,this.titleService=s,this.titleService.setTitle("Edit Permission")}return i.prototype.ngOnInit=function(){var i=this.route.snapshot.data.permission;i&&(this.permission=i.data)},i.prototype.save=function(){var i=this;this.permissionService.savePermission(this.permission).subscribe((function(r){i.router.navigate(["/permissions"]),i.toastr.success(r.message,"Success")}),(function(i){console.log(i)}))},i.ctorParameters=function(){return[{type:a.f},{type:a.a},{type:l.a},{type:c.b},{type:m.c}]},i=n.b([Object(s.n)({selector:"edit-permission",template:e("oLLm")})],i)}(),b=function(){function i(i,r){this.route=i,this.titleService=r,this.titleService.setTitle("View Permission")}return i.prototype.ngOnInit=function(){this.permission=this.route.snapshot.data.permission.data},i.ctorParameters=function(){return[{type:a.a},{type:m.c}]},i=n.b([Object(s.n)({selector:"view-permission",template:e("ERMc")})],i)}(),v=function(){function i(i){this.permissionService=i}return i.prototype.resolve=function(){return this.permissionService.getPermissions()},i.ctorParameters=function(){return[{type:l.a}]},i=n.b([Object(s.C)()],i)}(),f=function(){function i(i){this.permissionService=i}return i.prototype.resolve=function(i){return this.permissionService.getPermission(i.paramMap.get("id"))},i.ctorParameters=function(){return[{type:l.a}]},i=n.b([Object(s.C)()],i)}(),h=function(){function i(i){this.permissionService=i}return i.prototype.resolve=function(i){return this.permissionService.getPermissionView(i.paramMap.get("id"))},i.ctorParameters=function(){return[{type:l.a}]},i=n.b([Object(s.C)()],i)}(),g=[{path:"",component:p,resolve:{permissions:v}},{path:"edit/:id",component:u,resolve:{permission:f}},{path:"add",component:d},{path:"view/:id",component:b,resolve:{permission:h}}],y=function(){function i(){}return i=n.b([Object(s.K)({imports:[a.g.forChild(g)],exports:[a.g]})],i)}(),P=e("Q6Ar");e.d(r,"PermissionModule",(function(){return x}));var x=function(){function i(){}return i=n.b([Object(s.K)({imports:[t.b,o.a,y,P.a],providers:[l.a,v,f,h],declarations:[p,u,d,b]})],i)}()},O0IA:function(i,r){i.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Permissions</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li class="active">Permissions</li>\r\n        </ol>\r\n        <div class="add-button pull-right">\r\n          <a [routerLink]="[\'/permissions/add/\']" class="btn btn-inline btn-primary btn-sm" title="Add">Add Permission</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\x3c!-- Main Content --\x3e\r\n<section class="box-typical box-typical-padding">\r\n  <table id="lispermissions" class="display table table-bordered" cellspacing="0" width="100%">\r\n    <thead>\r\n      <tr>\r\n        <th>ID</th>\r\n        <th>Permission</th>\r\n        <th style="text-align: center;">Action</th> \r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngFor="let permission of permissions" [attr.id]="permission.id">\r\n         \r\n        <td>\r\n          {{ permission.id }}\r\n        </td>\r\n        <td>\r\n          {{ permission.per_name }}\r\n        </td>  \r\n        <td class="text-center">\r\n          <a [routerLink]="[\'/permissions/view/\' + permission.id]" class="btn btn-inline btn-primary btn-sm" title="View Permission"><i class="fa fa-search"></i></a> \r\n          \r\n          <a [routerLink]="[\'/permissions/edit/\' + permission.id]" class="btn btn-inline btn-primary btn-sm" title="Edit Permission"><i class="fa fa-pencil"></i></a>\r\n           \r\n          <span class="btn btn-inline btn-danger btn-sm" title="Delete User" (click)="delete1(permission.id)"><i class="fa fa-trash"></i></span>\r\n            \r\n        </td>\r\n        \x3c!-- <td style="width:50%">\r\n          {{ permission.description }}\r\n        </td>   --\x3e\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</section>'},oLLm:function(i,r){i.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Edit Permission</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li><a [routerLink]="[\'//permissions\']">Permissions</a></li>\r\n          <li class="active">Edit Permission</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\x3c!-- Main content --\x3e \r\n<section class="box-typical box-typical-padding">\r\n  <form name="form" (ngSubmit)="f.form.valid && save()" #f="ngForm" enctype="multipart/form-data" novalidate>\r\n    <input type="hidden" name="id" [(ngModel)]="permission.id" #id="ngModel">\r\n    <div class="row m-t-1">\r\n      <div class="col-sm-12">\r\n        <div class="row">\r\n          <div class="col-md-12">\r\n            <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !per_name.valid}">\r\n              <label for="per_name" class="required semibold form-label">Permission Name</label>\r\n              <input type="text" class="form-control" name="per_name" [(ngModel)]="permission.per_name" #per_name="ngModel"\r\n                required>\r\n              <div *ngIf="f.submitted && !per_name.valid" class="help-block">Permission Name field is required</div>\r\n            </div>\r\n          </div>  \r\n        </div>  \r\n        <div class="col-md-12 align-middle">\r\n          <div class="form-group">\r\n            <button class="btn btn-primary" style="margin-right: 10px;">Save</button>\r\n            <a class="btn btn-primary" [routerLink]="[\'/permissions\']">Cancel</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</section>'}}]);