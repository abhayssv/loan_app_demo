(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{"5pyf":function(e,t,r){"use strict";r.r(t);var s=r("mrSG"),i=r("8Y7J"),a=r("SVse"),n=r("s7LF"),c=r("iInd"),l=r("IheW"),o=r("LRne"),h=r("vkgz"),p=r("JIr8"),m=r("AytR"),d=r("3AtW");let g=class{constructor(e,t){this.http=e,this.alertService=t,this.requestUrl=m.a.requestUrl+"/api/user",this.httpOptions={headers:new l.d({"content-Type":"application/json;charset=UTF-8"})}}getEmailSettings(){return this.http.get(this.requestUrl+"/get_email_types").pipe(Object(h.a)(e=>{this.handleResponse(e)}),Object(p.a)(this.handleError("EmailSetting")))}setEmailType(e){return this.http.post(this.requestUrl+"/set_email_type",e).pipe(Object(h.a)(e=>{this.handleResponse(e)}),Object(p.a)(this.handleError("EmailSetting")))}handleResponse(e){return e.error?this.alertService.warn("Failed: "+e.message):this.alertService.success("Success:"+e.message),e}handleError(e="operation",t){return r=>(this.alertService.error(`${e} failed: ${r.message}`),Object(o.a)(t))}};g.ctorParameters=()=>[{type:l.b},{type:d.a}],g=s.a([Object(i.C)()],g);var u=r("EApP");let v=class{constructor(e,t,r){this.emailSettingService=e,this.route=t,this.toastr=r,this.emailsettings=[]}ngOnInit(){this.emailsettings=this.route.snapshot.data.emailsettings.data}changeEmailSetting(e){this.emailSettingService.setEmailType(e).subscribe(e=>{e?this.toastr.success(e.message,"Success"):this.toastr.error(e.message,"Failed")})}};v.ctorParameters=()=>[{type:g},{type:c.a},{type:u.b}],v=s.a([Object(i.n)({selector:"email-setting",template:r("aYw0"),styles:[r("vykr")]})],v);let b=class{constructor(e){this.emailSettingService=e}resolve(){return this.emailSettingService.getEmailSettings()}};b.ctorParameters=()=>[{type:g}],b=s.a([Object(i.C)()],b);const S=[{path:"",component:v,resolve:{emailsettings:b}}];let y=class{};y=s.a([Object(i.K)({imports:[c.g.forChild(S)],exports:[c.g]})],y),r.d(t,"EmailSettingModule",(function(){return f}));let f=class{};f=s.a([Object(i.K)({imports:[a.b,n.a,y],providers:[g,b],declarations:[v]})],f)},aYw0:function(e,t){e.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>App Email Settings</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li class="active">App Email Settings</li>\r\n        </ol> \r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n<section class="box-typical box-typical-padding min-ht">\r\n<div class="row">\r\n  <div class="col-md-6">\r\n  <div class="card">\r\n    <div class="card-body">\r\n        <div class="form-check" *ngFor="let each of emailsettings ; let i = index;">\r\n          <input class="form-check-input pointer" type="radio" name="email" [id]="each.email_type" [checked]="!!each.active" (change)="changeEmailSetting(each)">\r\n          <label class="form-check-label fs-3 pl-3 pointer" [for]="each.email_type">\r\n           {{each.email_name}}\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</section>\r\n'},vykr:function(e,t){e.exports=".min-ht {\r\n  height: 350px;\r\n}\r\n\r\n.form-check {\r\n  height: 50px;\r\n}\r\n\r\n.fs-3 {\r\n  font-size: 1.3rem;\r\n}\r\n\r\n.form-check-input {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n.pointer {\r\n  cursor: pointer;\r\n}"}}]);