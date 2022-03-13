(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"8TG3":function(i,t){i.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>App User Limit</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/app_user_limit\']">App User Limits</a></li>\r\n          <li class="active">App User Limit</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\x3c!-- Main content --\x3e\r\n<section class="box-typical box-typical-padding"> \r\n  <div class="row m-y-1">\r\n    <div class="col-lg-3">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="email">User Type </label>\r\n        <span *ngIf="limit.user_type === 0" class="form-control maxlength-simple">Student</span>\r\n        <span *ngIf="limit.user_type === 1" class="form-control maxlength-simple">Employee</span>\r\n        <span *ngIf="limit.user_type === 2" class="form-control maxlength-simple">Self Employee</span>\r\n      </fieldset>\r\n    </div>\r\n    <div class="col-lg-3">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="email">Level </label>\r\n        <span *ngIf="limit.level === 0" class="form-control maxlength-simple">Silver</span>\r\n        <span *ngIf="limit.level === 1" class="form-control maxlength-simple">Gold</span>\r\n        <span *ngIf="limit.level === 2" class="form-control maxlength-simple">Diamond</span>\r\n        <span *ngIf="limit.level === 3" class="form-control maxlength-simple">Platinum</span>\r\n      </fieldset>\r\n    </div> \r\n    <div class="col-lg-3">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="firstname">Initial Limit </label>\r\n        <span class="form-control maxlength-simple">{{ limit.initial_limit }}</span>\r\n      </fieldset>\r\n    </div>\r\n    <div class="col-lg-3">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="firstname">Final Limit </label>\r\n        <span class="form-control maxlength-simple">{{ limit.final_limit }}</span>\r\n      </fieldset>\r\n    </div> \r\n  </div>    \r\n</section>\r\n\x3c!-- /.content --\x3e'},Qz5q:function(i,t){i.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Edit Percentage Calculation</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home </a></li>\r\n          <li><a [routerLink]="[\'/app_user_limit\']">Percentage Calculation</a></li>\r\n          <li class="active">Edit Percentage Calculation</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\x3c!-- Main content --\x3e\r\n<section class="box-typical box-typical-padding">\r\n  <form name="form" (ngSubmit)="f.form.valid && save()" #f="ngForm" enctype="multipart/form-data" novalidate>\r\n    <input type="hidden" name="id" [(ngModel)]="limits.id" #id="ngModel">\r\n    <div class="row m-t-1">\r\n      <div class="col-sm-12">\r\n        <div class="row">\r\n          <div class="col-lg-3">\r\n            <fieldset class="form-group">\r\n              <label class="semibold form-label" for="email">User Type </label>\r\n              <span *ngIf="limits.user_type === 0" class="form-control maxlength-simple">Student</span>\r\n              <span *ngIf="limits.user_type === 1" class="form-control maxlength-simple">Employee</span>\r\n              <span *ngIf="limits.user_type === 2" class="form-control maxlength-simple">Self Employee</span>\r\n            </fieldset>\r\n          </div>\r\n          <div class="col-lg-3">\r\n            <fieldset class="form-group">\r\n              <label class="semibold form-label" for="email">Level </label>\r\n              <span *ngIf="limits.level === 0" class="form-control maxlength-simple">Silver</span>\r\n              <span *ngIf="limits.level === 1" class="form-control maxlength-simple">Gold</span>\r\n              <span *ngIf="limits.level === 2" class="form-control maxlength-simple">Diamond</span>\r\n              <span *ngIf="limits.level === 3" class="form-control maxlength-simple">Platinum</span>\r\n            </fieldset>\r\n          </div>\r\n          <div class="col-md-3">\r\n            <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !initial_limit.valid}">\r\n              <label for="initial_limit" class="required semibold form-label">Initial Limit</label> \r\n              \x3c!-- <input type="number" class="form-control" name="initial_limit" [(ngModel)]="limits.initial_limit" #initial_limit="ngModel"\r\n                required> --\x3e\r\n              <select class="form-control" name="initial_limit" [(ngModel)]="limits.initial_limit" #initial_limit="ngModel" required>\r\n                <option [ngValue]="null" disabled>Select Initial Limit</option>\r\n                <option *ngFor="let ini_limits of initial_limits" [ngValue]="ini_limits.limit" [selected]="ini_limits.limit === limits.initial_limit">{{ini_limits.limit}}</option>\r\n              </select>\r\n              <div *ngIf="f.submitted && !initial_limit.valid" class="help-block">Initial Limit field is required</div>\r\n            </div>\r\n          </div>  \r\n          <div class="col-md-3">\r\n            <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !final_limit.valid}">\r\n              <label for="final_limit" class="required semibold form-label">Final Limit</label>\r\n              \x3c!-- <input type="number" class="form-control" name="final_limit" [(ngModel)]="limits.final_limit" #final_limit="ngModel"\r\n                required> --\x3e\r\n              <select class="form-control" name="final_limit" [(ngModel)]="limits.final_limit" #final_limit="ngModel" required>\r\n                <option [ngValue]="null" disabled >Select Final Limit</option>\r\n                <option *ngFor="let f_limits of final_limits" [ngValue]="f_limits.limit" [selected]="f_limits.limit == limits.final_limit">{{f_limits.limit}}</option>\r\n              </select>\r\n              <div *ngIf="f.submitted && !final_limit.valid" class="help-block">Final Limit field is required</div>\r\n            </div>\r\n          </div>  \r\n        </div>   \r\n        <div class="col-md-12 align-middle">\r\n          <div class="form-group">\r\n            <button class="btn btn-primary" style="margin-right: 10px;">Save</button>\r\n            <a class="btn btn-primary" [routerLink]="[\'/app_user_limit\']">Cancel</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</section>'},VtCq:function(i,t){i.exports='<header class="section-header">\r\n    <div class="tbl">\r\n        <div class="tbl-row">\r\n            <div class="tbl-cell">\r\n                <h3>Add User Limit Calculation</h3>\r\n                <ol class="breadcrumb breadcrumb-simple">\r\n                    <li><a [routerLink]="[\'/\']">Home</a></li>\r\n                    <li><a [routerLink]="[\'/app_user_limit\']">User Limit Calculation</a></li>\r\n                    <li class="active">Add User Limit Calculation</li>\r\n                </ol>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</header>\r\n\x3c!-- Main content --\x3e\r\n<section class="box-typical box-typical-padding">\r\n    <form name="form" (ngSubmit)="f.form.valid && save(f.value)" #f="ngForm" novalidate>\r\n        <div class="row m-t-1">\r\n            <div class="col-sm-12">\r\n                <div class="row">\r\n                    <div class="col-md-3">\r\n                        <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !user_type.valid}">\r\n                            <label for="user_type" class="required semibold form-label">User Type</label> \r\n                            <select class="form-control" name="user_type" [(ngModel)]="limit.user_type" #user_type="ngModel" required>\r\n                                <option [ngValue]="null" disabled>Select User Type</option>\r\n                                <option *ngFor="let user_type of user_types" [ngValue]="user_type.id">{{user_type.name}}</option>\r\n                              </select>\r\n                            <div *ngIf="f.submitted && !user_type.valid" class="help-block">User Type field is required</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class="col-md-3">\r\n                        <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !level.valid}">\r\n                            <label for="level" class="required semibold form-label">Lavel</label> \r\n                            <select class="form-control" name="level" [(ngModel)]="limit.level" #level="ngModel" required>\r\n                                <option [ngValue]="null" disabled>Select Level</option>\r\n                                <option *ngFor="let level of levels" [ngValue]="level.id">{{level.name}}</option>\r\n                            </select>\r\n                            <div *ngIf="f.submitted && !level.valid" class="help-block">Lavel field is required</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class="col-md-3">\r\n                        <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !initial_limit.valid}">\r\n                            <label for="initial_limit" class="required semibold form-label">Initial Limit</label>\r\n                            \x3c!-- <input type="number" class="form-control" name="initial_limit" [(ngModel)]="limit.initial_limit" #initial_limit="ngModel" required> --\x3e\r\n                            <select class="form-control" name="initial_limit" [(ngModel)]="limit.initial_limit" #initial_limit="ngModel" required>\r\n                                <option [ngValue]="null" disabled>Select Initial Limit</option>\r\n                                <option *ngFor="let limits of initial_limits" [ngValue]="limits.limit">{{limits.limit}}</option>\r\n                            </select>\r\n                            <div *ngIf="f.submitted && !initial_limit.valid" class="help-block">Initial Limit field is required</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class="col-md-3">\r\n                        <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !final_limit.valid}">\r\n                            <label for="final_limit" class="required semibold form-label">Final Limit</label>\r\n                            \x3c!-- <input type="number" class="form-control" name="final_limit" [(ngModel)]="limit.final_limit" #final_limit="ngModel" required> --\x3e\r\n                            <select class="form-control" name="final_limit" [(ngModel)]="limit.final_limit" #final_limit="ngModel" required>\r\n                                <option [ngValue]="null" disabled>Select Final Limit</option>\r\n                                <option *ngFor="let f_limits of final_limits" [ngValue]="f_limits.limit">{{f_limits.limit}}</option>\r\n                            </select>\r\n                            <div *ngIf="f.submitted && !final_limit.valid" class="help-block">Final Limit field is required</div>\r\n                        </div>\r\n                    </div>\r\n                </div> \r\n            </div> \r\n            <div class="col-md-12 align-middle">\r\n                <div class="form-group">\r\n                    <button class="btn btn-primary" style="margin-right: 10px;">Save</button>\r\n                    <a class="btn btn-primary" [routerLink]="[\'/app_user_limit\']">Cancel</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</section>'},dGzV:function(i,t){i.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>App User Limit</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li class="active">App User Limit</li>\r\n        </ol>\r\n        \x3c!-- <div class="add-button pull-right">\r\n          <a [routerLink]="[\'/app_user_limit/add/\']" class="btn btn-inline btn-primary btn-sm" title="Add">Add App User Limit</a>\r\n        </div> --\x3e\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\x3c!-- Main Content --\x3e\r\n<section class="box-typical box-typical-padding">\r\n  <table id="lislimits" class="display table table-bordered" cellspacing="0" width="100%">\r\n    <thead>\r\n      <tr>\r\n        <th>ID</th>\r\n        <th>User Type</th>\r\n        <th>Level</th>\r\n        <th>Initial Limit</th>\r\n        <th>Final Limit</th>\r\n        <th>Action</th> \r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngFor="let limit of limits" [attr.id]="limit.id">\r\n         \r\n        <td>\r\n          {{ limit.id }}\r\n        </td>\r\n        <td *ngIf = "limit.user_type === 0">\r\n          Student\r\n        </td>\r\n        <td *ngIf = "limit.user_type === 1">\r\n          Employee\r\n        </td>\r\n        <td *ngIf = "limit.user_type === 2">\r\n          Self Employee\r\n        </td>\r\n        <td *ngIf = "limit.level === 0">\r\n          Silver\r\n        </td>\r\n        <td *ngIf = "limit.level === 1">\r\n          Gold\r\n        </td>\r\n        <td *ngIf = "limit.level === 2">\r\n          Platinum\r\n        </td>\r\n        <td *ngIf = "limit.level === 3">\r\n          Diamond\r\n        </td>\r\n        <td>\r\n          {{ limit.initial_limit }}\r\n        </td>\r\n        <td>\r\n          {{ limit.final_limit }}\r\n        </td>   \r\n        <td class="text-center">\r\n          \x3c!-- <a [routerLink]="[\'/app_user_limit/view/\' + limit.id]" class="btn btn-inline btn-primary btn-sm" title="View User Limit"><i class="fa fa-search"></i></a>  --\x3e\r\n          \r\n          <a [routerLink]="[\'/app_user_limit/edit/\' + limit.id]" class="btn btn-inline btn-primary btn-sm" title="Edit User Limit"><i class="fa fa-pencil"></i></a>\r\n           \r\n          \x3c!-- <span class="btn btn-inline btn-danger btn-sm" title="Delete User Limit" (click)="delete1(limit.id)"><i class="fa fa-trash"></i></span> --\x3e\r\n            \r\n        </td> \r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</section>'},gY6d:function(i,t,l){"use strict";l.r(t);var e=l("mrSG"),n=l("CcnG"),r=l("Ip0R"),m=l("gIcY"),s=l("ZYCi"),a=l("t/Na"),o=l("F/XL"),d=l("xMyE"),c=l("9Z1F"),p=l("AytR"),u=l("3AtW"),f=function(){function i(i,t){this.http=i,this.alertService=t,this.requestUrl=p.a.requestUrl+"/api/user_limit",this.httpOptions={headers:new a.d({"content-Type":"application/json;charset=UTF-8"})}}return i.prototype.getLimits=function(){var i=this;return this.http.get(this.requestUrl+"/all").pipe(Object(d.a)((function(t){i.handleResponse(t)})),Object(c.a)(this.handleError("Limit")))},i.prototype.getLimit=function(i){var t=this;return this.http.get(this.requestUrl+"/"+i,this.httpOptions).pipe(Object(d.a)((function(i){t.handleResponse(i)})),Object(c.a)(this.handleError("Limit")))},i.prototype.getLimitView=function(i){var t=this;return this.http.get(this.requestUrl+"/"+i,this.httpOptions).pipe(Object(d.a)((function(i){t.handleResponse(i)})),Object(c.a)(this.handleError("Limit")))},i.prototype.saveLimit=function(i){var t=this;return this.http.post(this.requestUrl+"/save_user_limit",i,this.httpOptions).pipe(Object(d.a)((function(i){t.handleResponse(i)})),Object(c.a)(this.handleError("Limit")))},i.prototype.deleteLimit=function(i){var t=this;return this.http.post(this.requestUrl+"/delete",{id:i},this.httpOptions).pipe(Object(d.a)((function(i){t.handleResponse(i)})),Object(c.a)(this.handleError("Limit")))},i.prototype.handleResponse=function(i){return i.error?this.alertService.warn("Failed: "+i.message):this.alertService.success("Success:"+i.message),i},i.prototype.handleError=function(i,t){var l=this;return void 0===i&&(i="operation"),function(e){return l.alertService.error(i+" failed: "+e.message),Object(o.a)(t)}},i.ctorParameters=function(){return[{type:a.b},{type:u.a}]},i=e.b([Object(n.C)()],i)}(),v=l("SZbH"),b=function(){function i(i,t,l){this.router=i,this.limitService=t,this.toastr=l,this.user_types=[{id:0,name:"Student"},{id:1,name:"Employee"},{id:2,name:"Self Employee"}],this.levels=[{id:0,name:"Silver"},{id:1,name:"Gold"},{id:2,name:"Diamond"},{id:3,name:"Platinum"}],this.initial_limits=[{id:1,limit:"500"},{id:2,limit:"1000"},{id:3,limit:"1500"},{id:4,limit:"2000"},{id:5,limit:"2500"},{id:6,limit:"3000"},{id:7,limit:"3500"},{id:8,limit:"4000"}],this.final_limits=[{limit:500},{limit:1e3},{limit:1500},{limit:2e3},{limit:2500},{limit:3e3},{limit:3500},{limit:4e3},{limit:4500},{limit:5e3},{limit:5500},{limit:6e3},{limit:6500},{limit:7e3},{limit:7500},{limit:8e3},{limit:8500},{limit:9e3},{limit:9500},{limit:1e4},{limit:10500},{limit:11e3},{limit:11500},{limit:12e3},{limit:12500},{limit:13e3},{limit:14e3},{limit:14500},{limit:15e3},{limit:15500},{limit:16e3},{limit:16500},{limit:17e3},{limit:17500},{limit:18e3},{limit:18500},{limit:19e3},{limit:19500},{limit:2e4},{limit:20500},{limit:21e3},{limit:21500},{limit:22e3},{limit:22500},{limit:23e3},{limit:24e3},{limit:24500},{limit:25e3},{limit:25500},{limit:26e3},{limit:26500},{limit:27e3},{limit:27500},{limit:28e3},{limit:28500},{limit:29e3},{limit:29500},{limit:3e4}]}return i.prototype.ngOnInit=function(){this.limit={id:null,user_type:null,level:null,initial_limit:null,final_limit:null,message:"",data:this.limit}},i.prototype.save=function(i){var t=this;this.limitService.saveLimit(i).subscribe((function(i){t.router.navigate(["/app_user_limit"]),t.toastr.success(i.message,"Success")}),(function(i){console.log(i)}))},i.ctorParameters=function(){return[{type:s.f},{type:f},{type:v.b}]},i=e.b([Object(n.n)({selector:"add-limit",template:l("VtCq")})],i)}(),h=l("ZYjt"),g=function(){function i(i,t,l,e,n){this.route=i,this.router=t,this.limitService=l,this.toastr=e,this.titleService=n,this.titleService.setTitle("List User Limit")}return i.prototype.ngOnInit=function(){var i=this.route.snapshot.data.limits;i&&(this.limits=i.data),$((function(){$("#listlimits").DataTable({responsive:!0,order:[]})}))},i.prototype.delete1=function(i){var t=this,l=[];confirm("Do you really want to delete this limit")&&this.limitService.deleteLimit(i).subscribe((function(e){t.toastr.success(e.message,"Success"),e.error||(l=t.limits,t.limits=l.filter((function(t){return t.id!==i})))}))},i.ctorParameters=function(){return[{type:s.a},{type:s.f},{type:f},{type:v.b},{type:h.c}]},i=e.b([Object(n.n)({selector:"list-limit",template:l("dGzV")})],i)}(),_=function(){function i(i,t,l,e,n){this.router=i,this.route=t,this.limitService=l,this.toastr=e,this.titleService=n,this.user_types=[{id:1,name:"Student"},{id:1,name:"Employee"},{id:2,name:"Self Employee"}],this.levels=[{id:0,name:"Silver"},{id:1,name:"Gold"},{id:2,name:"Diamond"},{id:3,name:"Platinum"}],this.initial_limits=[{id:1,limit:500},{id:2,limit:1e3},{id:3,limit:1500},{id:4,limit:2e3},{id:5,limit:2500},{id:6,limit:3e3},{id:7,limit:3500},{id:8,limit:4e3},{id:9,limit:4500},{id:10,limit:5e3},{id:11,limit:5500},{id:12,limit:6e3},{id:13,limit:6500},{id:14,limit:7e3},{id:15,limit:7500},{id:16,limit:8e3},{id:17,limit:8500},{id:18,limit:9e3},{id:19,limit:9500},{id:20,limit:1e4}],this.final_limits=[{limit:500},{limit:1e3},{limit:1500},{limit:2e3},{limit:2500},{limit:3e3},{limit:3500},{limit:4e3},{limit:4500},{limit:5e3},{limit:5500},{limit:6e3},{limit:6500},{limit:7e3},{limit:7500},{limit:8e3},{limit:8500},{limit:9e3},{limit:9500},{limit:1e4},{limit:10500},{limit:11e3},{limit:11500},{limit:12e3},{limit:12500},{limit:13e3},{limit:13500},{limit:14e3},{limit:14500},{limit:15e3},{limit:15500},{limit:16e3},{limit:16500},{limit:17e3},{limit:17500},{limit:18e3},{limit:18500},{limit:19e3},{limit:19500},{limit:2e4},{limit:20500},{limit:21e3},{limit:21500},{limit:22e3},{limit:22500},{limit:23e3},{limit:23500},{limit:24e3},{limit:24500},{limit:25e3},{limit:25500},{limit:26e3},{limit:26500},{limit:27e3},{limit:27500},{limit:28e3},{limit:28500},{limit:29e3},{limit:29500},{limit:3e4},{limit:30500},{limit:31e3},{limit:31500},{limit:32e3},{limit:32500},{limit:33e3},{limit:33500},{limit:34e3},{limit:34500},{limit:35e3},{limit:35500},{limit:36e3},{limit:36500},{limit:37e3},{limit:37500},{limit:38e3},{limit:38500},{limit:39e3},{limit:39500},{limit:4e4},{limit:40500},{limit:41e3},{limit:41500},{limit:42e3},{limit:42500},{limit:43e3},{limit:43500},{limit:44e3},{limit:44500},{limit:45e3},{limit:45500},{limit:46e3},{limit:46500},{limit:47e3},{limit:47500},{limit:48e3},{limit:48500},{limit:49e3},{limit:49500},{limit:5e4},{limit:50500},{limit:51e3},{limit:51500},{limit:52e3},{limit:52500},{limit:53e3},{limit:53500},{limit:54e3},{limit:54500},{limit:55e3},{limit:55500},{limit:56e3},{limit:56500},{limit:57e3},{limit:57500},{limit:58e3},{limit:58500},{limit:59e3},{limit:59500},{limit:6e4},{limit:60500},{limit:61e3},{limit:61500},{limit:62e3},{limit:62500},{limit:63e3},{limit:63500},{limit:64e3},{limit:64500},{limit:65e3},{limit:65500},{limit:66e3},{limit:66500},{limit:67e3},{limit:67500},{limit:68e3},{limit:68500},{limit:69e3},{limit:69500},{limit:7e4},{limit:70500},{limit:71e3},{limit:71500},{limit:72e3},{limit:72500},{limit:73e3},{limit:73500},{limit:74e3},{limit:74500},{limit:75e3},{limit:75500},{limit:76e3},{limit:76500},{limit:77e3},{limit:77500},{limit:78e3},{limit:78500},{limit:79e3},{limit:79500},{limit:8e4},{limit:80500},{limit:81e3},{limit:81500},{limit:82e3},{limit:82500},{limit:83e3},{limit:83500},{limit:84e3},{limit:84500},{limit:85e3},{limit:85500},{limit:86e3},{limit:86500},{limit:87e3},{limit:87500},{limit:88e3},{limit:88500},{limit:89e3},{limit:89500},{limit:9e4},{limit:90500},{limit:91e3},{limit:91500},{limit:92e3},{limit:92500},{limit:93e3},{limit:93500},{limit:94e3},{limit:94500},{limit:95e3},{limit:95500},{limit:96e3},{limit:96500},{limit:97e3},{limit:97500},{limit:98e3},{limit:98500},{limit:99e3},{limit:99500},{limit:1e5}],this.titleService.setTitle("Edit User Limit")}return i.prototype.ngOnInit=function(){var i=this.route.snapshot.data.limit;i&&(this.limits=i.data)},i.prototype.onChange=function(i){},i.prototype.save=function(){var i=this;this.limitService.saveLimit(this.limits).subscribe((function(t){i.router.navigate(["/app_user_limit"]),i.toastr.success(t.message,"Success")}),(function(i){console.log(i)}))},i.ctorParameters=function(){return[{type:s.f},{type:s.a},{type:f},{type:v.b},{type:h.c}]},i=e.b([Object(n.n)({selector:"edit-limit",template:l("Qz5q")})],i)}(),y=function(){function i(i){this.route=i}return i.prototype.ngOnInit=function(){this.limit=this.route.snapshot.data.limit.data},i.ctorParameters=function(){return[{type:s.a}]},i=e.b([Object(n.n)({selector:"view-limit",template:l("8TG3")})],i)}(),L=function(){function i(i){this.limitService=i}return i.prototype.resolve=function(){return this.limitService.getLimits()},i.ctorParameters=function(){return[{type:f}]},i=e.b([Object(n.C)()],i)}(),x=function(){function i(i){this.limitService=i}return i.prototype.resolve=function(i){return this.limitService.getLimit(i.paramMap.get("id"))},i.ctorParameters=function(){return[{type:f}]},i=e.b([Object(n.C)()],i)}(),S=function(){function i(i){this.limitService=i}return i.prototype.resolve=function(i){return this.limitService.getLimitView(i.paramMap.get("id"))},i.ctorParameters=function(){return[{type:f}]},i=e.b([Object(n.C)()],i)}(),I=[{path:"",component:g,resolve:{limits:L}},{path:"edit/:id",component:_,resolve:{limit:x}},{path:"add",component:b},{path:"view/:id",component:y,resolve:{limit:S}}],q=function(){function i(){}return i=e.b([Object(n.K)({imports:[s.g.forChild(I)],exports:[s.g]})],i)}(),M=l("Q6Ar");l.d(t,"LimitModule",(function(){return O}));var O=function(){function i(){}return i=e.b([Object(n.K)({imports:[r.b,m.a,q,M.a],providers:[f,L,x,S],declarations:[g,_,b,y]})],i)}()}}]);