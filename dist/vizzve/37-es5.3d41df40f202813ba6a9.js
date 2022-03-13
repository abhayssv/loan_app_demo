(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{"dX/M":function(t,i,e){"use strict";e.r(i);var r=e("mrSG"),n=e("CcnG"),o=e("Ip0R"),s=e("gIcY"),a=e("ZYCi"),c=e("t/Na"),l=e("F/XL"),d=e("xMyE"),u=e("9Z1F"),p=e("AytR"),f=e("3AtW"),b=function(){function t(t,i){this.http=t,this.alertService=i,this.requestUrl=p.a.requestUrl+"/api/user/fcm",this.httpOptions={headers:new c.d({"content-Type":"application/json;charset=UTF-8"})}}return t.prototype.sendNotification=function(t){var i=this;return this.http.post(this.requestUrl+"/send_notification",t).pipe(Object(d.a)((function(t){i.handleResponse(t)})),Object(u.a)(this.handleError("EmailSetting")))},t.prototype.handleResponse=function(t){return t.error?this.alertService.warn("Failed: "+t.message):this.alertService.success("Success:"+t.message),t},t.prototype.handleError=function(t,i){var e=this;return void 0===t&&(t="operation"),function(r){return e.alertService.error(t+" failed: "+r.message),Object(l.a)(i)}},t.ctorParameters=function(){return[{type:c.b},{type:f.a}]},t=r.b([Object(n.C)()],t)}(),h=e("SZbH"),m=function(){function t(t,i,e){this.pushNotificationService=t,this.route=i,this.toastr=e,this.notification={title:"",body:""}}return t.prototype.ngOnInit=function(){},t.prototype.sendNotification=function(t){var i=this;t.valid&&this.pushNotificationService.sendNotification(this.notification).subscribe((function(t){t.error?i.toastr.error(t.message,"Failed"):i.toastr.success(t.message,"Success")}))},t.ctorParameters=function(){return[{type:b},{type:a.a},{type:h.b}]},t=r.b([Object(n.n)({selector:"pushnotification",template:e("yoAQ"),styles:[e("zXQF")]})],t)}(),v=[{path:"",component:m}],g=function(){function t(){}return t=r.b([Object(n.K)({imports:[a.g.forChild(v)],exports:[a.g]})],t)}();e.d(i,"PushNotificationModule",(function(){return y}));var y=function(){function t(){}return t=r.b([Object(n.K)({imports:[o.b,s.a,g],providers:[b],declarations:[m]})],t)}()},yoAQ:function(t,i){t.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Send Notification</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li class="active">Send Notification</li>\r\n        </ol> \r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n<section class="box-typical box-typical-padding min-ht">\r\n<div class="card">  \r\n  <div class="card-body">\r\n  <form #f="ngForm">\r\n  <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !title.valid}">\r\n      <label for="title" class="required semibold form-label">Title</label>\r\n      <input type="text" class="form-control" name="title" [(ngModel)]="notification.title" #title="ngModel" required maxlength="40">\r\n      <div *ngIf="f.submitted && !title.valid" class="help-block" >Title is required</div>\r\n  </div>\r\n  <div>\r\n    <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !description.valid}">\r\n        <label for="description" class="required semibold form-label">Description</label>\r\n        <textarea type="text" class="form-control" row="3" name="description" [(ngModel)]="notification.body" #description="ngModel" required maxlength="60"></textarea>\r\n        <div *ngIf="f.submitted && !description.valid" class="help-block">Description is required</div>\r\n    </div>\r\n  </div>\r\n  <div class="mb-3 d-grid gap-2 d-md-flex justify-content-md-end">\r\n     <button class="btn btn-primary" (click)= "sendNotification(f)">Submit</button>\r\n  </div>\r\n</form>\r\n</div>\r\n</div>\r\n</section>\r\n'},zXQF:function(t,i){t.exports=".min-ht {\r\n  height: 350px;\r\n}\r\n.card{\r\n  width: 1000px;\r\n}"}}]);