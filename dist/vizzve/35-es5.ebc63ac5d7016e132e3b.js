(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{"5pyf":function(e,t,r){"use strict";r.r(t);var n=r("mrSG"),i=r("CcnG"),s=r("Ip0R"),a=r("gIcY"),c=r("ZYCi"),o=r("t/Na"),l=r("F/XL"),p=r("xMyE"),h=r("9Z1F"),u=r("AytR"),m=r("3AtW"),d=function(){function e(e,t){this.http=e,this.alertService=t,this.requestUrl=u.a.requestUrl+"/api/user",this.httpOptions={headers:new o.d({"content-Type":"application/json;charset=UTF-8"})}}return e.prototype.getEmailSettings=function(){var e=this;return this.http.get(this.requestUrl+"/get_email_types").pipe(Object(p.a)((function(t){e.handleResponse(t)})),Object(h.a)(this.handleError("EmailSetting")))},e.prototype.setEmailType=function(e){var t=this;return this.http.post(this.requestUrl+"/set_email_type",e).pipe(Object(p.a)((function(e){t.handleResponse(e)})),Object(h.a)(this.handleError("EmailSetting")))},e.prototype.handleResponse=function(e){return e.error?this.alertService.warn("Failed: "+e.message):this.alertService.success("Success:"+e.message),e},e.prototype.handleError=function(e,t){var r=this;return void 0===e&&(e="operation"),function(n){return r.alertService.error(e+" failed: "+n.message),Object(l.a)(t)}},e.ctorParameters=function(){return[{type:o.b},{type:m.a}]},e=n.b([Object(i.C)()],e)}(),f=r("SZbH"),g=function(){function e(e,t,r){this.emailSettingService=e,this.route=t,this.toastr=r,this.emailsettings=[]}return e.prototype.ngOnInit=function(){this.emailsettings=this.route.snapshot.data.emailsettings.data},e.prototype.changeEmailSetting=function(e){var t=this;this.emailSettingService.setEmailType(e).subscribe((function(e){e?t.toastr.success(e.message,"Success"):t.toastr.error(e.message,"Failed")}))},e.ctorParameters=function(){return[{type:d},{type:c.a},{type:f.b}]},e=n.b([Object(i.n)({selector:"email-setting",template:r("aYw0"),styles:[r("vykr")]})],e)}(),v=function(){function e(e){this.emailSettingService=e}return e.prototype.resolve=function(){return this.emailSettingService.getEmailSettings()},e.ctorParameters=function(){return[{type:d}]},e=n.b([Object(i.C)()],e)}(),b=[{path:"",component:g,resolve:{emailsettings:v}}],y=function(){function e(){}return e=n.b([Object(i.K)({imports:[c.g.forChild(b)],exports:[c.g]})],e)}();r.d(t,"EmailSettingModule",(function(){return S}));var S=function(){function e(){}return e=n.b([Object(i.K)({imports:[s.b,a.a,y],providers:[d,v],declarations:[g]})],e)}()},aYw0:function(e,t){e.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>App Email Settings</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li class="active">App Email Settings</li>\r\n        </ol> \r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n<section class="box-typical box-typical-padding min-ht">\r\n<div class="row">\r\n  <div class="col-md-6">\r\n  <div class="card">\r\n    <div class="card-body">\r\n        <div class="form-check" *ngFor="let each of emailsettings ; let i = index;">\r\n          <input class="form-check-input pointer" type="radio" name="email" [id]="each.email_type" [checked]="!!each.active" (change)="changeEmailSetting(each)">\r\n          <label class="form-check-label fs-3 pl-3 pointer" [for]="each.email_type">\r\n           {{each.email_name}}\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</section>\r\n'},vykr:function(e,t){e.exports=".min-ht {\r\n  height: 350px;\r\n}\r\n\r\n.form-check {\r\n  height: 50px;\r\n}\r\n\r\n.fs-3 {\r\n  font-size: 1.3rem;\r\n}\r\n\r\n.form-check-input {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n.pointer {\r\n  cursor: pointer;\r\n}"}}]);