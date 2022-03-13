(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{"0MDI":function(e,t){e.exports='<header class="section-header">\r\n    <div class="tbl">\r\n        <div class="tbl-row">\r\n            <div class="tbl-cell">\r\n                <h3>{{editView?\'Edit\':\'Add\'}} Extension Deal</h3>\r\n                <ol class="breadcrumb breadcrumb-simple">\r\n                    <li><a [routerLink]="[\'/\']">Home</a></li>\r\n                    <li><a [routerLink]="[\'/extension_deal\']">Extension Deal</a></li>\r\n                    <li class="active">{{editView?\'Edit\':\'Add\'}} Extension Deal</li>\r\n                </ol>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</header>\r\n\r\n<section class="box-typical box-typical-padding">\r\n    <form name="form" (ngSubmit)="f.form.valid && save(f.value)" #f="ngForm" novalidate>\r\n        <div class="row m-t-1">\r\n            <div class="col-sm-12">\r\n\r\n            <div class="row">\r\n                    <div class="col-md-6">\r\n                         <div class="form-group">\r\n                            <label for="level">User Type</label>\r\n                            <select class="form-control" name="user_type" [(ngModel)]="extension.user_type" #user_type="ngModel" required [disabled]="extension.id">\r\n                              <option [value]="null">Select User Type</option>\r\n                              <option *ngFor="let each of userTypes" [value]="each.value">\r\n                                 {{each.label}}\r\n                              </option>\r\n                            </select>\r\n                            <div *ngIf="f.submitted && !user_type.valid" class="help-block text-danger">User Type field is required</div>\r\n                          </div>\r\n                          <div class="form-group">\r\n                            <label for="level">Level</label>\r\n                            <select class="form-control" name="level" [(ngModel)]="extension.level" #level="ngModel" required  [disabled]="extension.id">\r\n                              <option [value]="null">Select Level</option>\r\n                              <option *ngFor="let each of levels" [value]="each.value">\r\n                                {{each.label}}\r\n                              </option>\r\n                            </select>\r\n                            <div *ngIf="f.submitted && !level.valid" class="help-block text-danger">Level is required</div>\r\n                          </div>\r\n                        <div class="form-group">\r\n                            <label for="tenure" class="required semibold form-label">Tenure</label>\r\n                            <input type="number" class="form-control" name="tenure" [(ngModel)]="extension.tenure" #tenure="ngModel" required>\r\n                            <div *ngIf="f.submitted && !tenure.valid" class="help-block text-danger">Tenure field is required</div>\r\n                        </div>\r\n                        <div class="form-group" >\r\n                            <label for="amount" class="required semibold form-label">Amount</label>\r\n                            <input type="number" class="form-control" name="amount" [(ngModel)]="extension.amount" #amount="ngModel" required>\r\n                            <div *ngIf="f.submitted && !amount.valid" class="help-block text-danger">Amount field is required</div>\r\n                         </div>\r\n               \r\n                         <div class="form-group">\r\n                            <div class="checkbox-toggle">\r\n                                <label for="active" class="semibold form-label">Active</label>\r\n                                <input type="checkbox" id="check-toggle-active" name="active" [(ngModel)]="extension.status">\r\n                                <label for="check-toggle-active"></label>\r\n                            </div>\r\n                        </div>\r\n                        <div class="form-group" >\r\n                          <button class="btn btn-primary" style="margin-right: 10px;">Save</button>\r\n                          <a class="btn btn-primary" [routerLink]="[\'/extension_deal\']">Cancel</a>\r\n                       </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</section>'},"4qsN":function(e,t,n){"use strict";n.r(t);var s=n("mrSG"),r=n("8Y7J"),a=n("SVse"),l=n("s7LF"),i=n("IheW"),o=n("LRne"),d=n("vkgz"),c=n("JIr8"),u=n("AytR"),h=n("3AtW");let p=class{constructor(e,t){this.http=e,this.alertService=t,this.requestUrl=u.a.requestUrl+"/api/system_report",this.httpOptions={headers:new i.d({"content-Type":"application/json;charset=UTF-8"})}}saveExtensionDeal(e){return this.http.post(this.requestUrl+"/add_extension_deal",e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ExtensionDeal")))}allExtensionDeal(){return this.http.get(this.requestUrl+"/all_extension_deal",this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ExtensionDeal")))}deleteExtensionDeal(e){return this.http.delete(this.requestUrl+"/delete_extension_deal?id="+e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ExtensionDeal")))}updateExtensionDealStatus(e){return this.http.put(this.requestUrl+"/update_status_extension_deal",e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ExtensionDeal")))}handleResponse(e){return e.error?this.alertService.warn("Failed: "+e.message):this.alertService.success("Success:"+e.message),e}handleError(e="operation",t){return n=>(this.alertService.error(`${e} failed: ${n.message}`),Object(o.a)(t))}};p.ctorParameters=()=>[{type:i.b},{type:h.a}],p=s.a([Object(r.C)()],p);var b=n("EApP");let v=class{constructor(e,t){this.extensiondealService=e,this.toastr=t,this.extension_deals=[],this.userTypes={0:"Student",1:"Employee",2:"Business"},this.levels={0:"Silver",1:"Platinum",2:"Gold",3:"Diamond"}}ngOnInit(){this.getAllExtensionDeals()}getAllExtensionDeals(){this.extensiondealService.allExtensionDeal().subscribe(e=>{e.error||(this.extension_deals=e.data)})}deleteExtensionDeal(e){this.extensiondealService.deleteExtensionDeal(e).subscribe(t=>{if(t.error)this.toastr.error(t.message,"Failed");else{const n=this.extension_deals.findIndex(t=>t.id===e);this.extension_deals.splice(n,1),this.toastr.success(t.message,"Success")}})}changeStatus(e,t){this.extensiondealService.updateExtensionDealStatus({id:e,status:t}).subscribe(n=>{n.error?(this.toastr.error(n.message,"Failed"),this.extension_deals.find(t=>t.id===e).status=!t):this.toastr.success(n.message,"Success")})}};v.ctorParameters=()=>[{type:p},{type:b.b}],v=s.a([Object(r.n)({selector:"extension-deal",template:n("a6Yq"),styles:[n("zfNZ")]})],v);let m=class{constructor(e){this.extensionDealService=e}resolve(){}};m.ctorParameters=()=>[{type:p}],m=s.a([Object(r.C)()],m);var x=n("iInd");let g=class{constructor(e,t,n,s){this.router=e,this.route=t,this.extensiondealService=n,this.toastr=s,this.extension={user_type:null,level:null,tenure:"",amount:"",status:!1},this.userTypes=[{value:0,label:"Student"},{value:1,label:"Employee"},{value:2,label:"Business"}],this.levels=[{value:0,label:"Silver"},{value:1,label:"Platinum"},{value:2,label:"Gold"},{value:3,label:"Diamond"}],this.editView=!1,this.router.getCurrentNavigation().extras.state&&(this.extension=this.router.getCurrentNavigation().extras.state,this.editView=!0)}ngOnInit(){}save(){this.extensiondealService.saveExtensionDeal(this.extension).subscribe(e=>{e?(this.router.navigate(["/extension_deal"]),this.toastr.success(e.message,"Success")):this.toastr.error(e.message,"Failed")})}};g.ctorParameters=()=>[{type:x.f},{type:x.a},{type:p},{type:b.b}],g=s.a([Object(r.n)({selector:"add-extension-deal",template:n("0MDI")})],g);const f=[{path:"",component:v,resolve:{extension:m}},{path:"add",component:g},{path:"edit",component:g}];let y=class{};y=s.a([Object(r.K)({imports:[x.g.forChild(f)],exports:[x.g]})],y),n.d(t,"ExtensionDealModule",(function(){return E}));let E=class{};E=s.a([Object(r.K)({imports:[a.b,l.a,y],providers:[p,m],declarations:[v,g]})],E)},a6Yq:function(e,t){e.exports='<header class="section-header">\r\n    <div class="tbl">\r\n        <div class="tbl-row">\r\n            <div class="tbl-cell">\r\n                <h3> Extension Deal</h3>\r\n                <ol class="breadcrumb breadcrumb-simple">\r\n                    <li><a [routerLink]="[\'/\']">Home</a></li>\r\n                    <li><a [routerLink]="[\'/extension_deal\']">Extension Deal</a></li>\r\n                    <li class="active">Extension Deal</li>\r\n                </ol>\r\n               <div class="add-button pull-right">\r\n                  <a [routerLink]="[\'/extension_deal/add/\']" class="btn btn-inline btn-primary btn-sm" title="Add">Add Extension Deal</a>\r\n               </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</header>\r\n<section class="box-typical box-typical-padding">\r\n  <table id="lisbusinessinterests" class="display table table-bordered" cellspacing="0" width="100%">\r\n    <thead>\r\n      <tr>\r\n        <th>User Type</th>\r\n        <th>Level</th>\r\n        <th>Tenure</th>\r\n        <th>Amount</th>\r\n        <th>Status</th>\r\n        <th>Action</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngFor="let each of extension_deals"> \r\n        <td>\r\n          {{userTypes[each.user_type]}}\r\n        </td>\r\n        <td>\r\n          {{levels[each.level]}}\r\n        </td>\r\n        <td>\r\n          {{each.tenure}}\r\n        </td>\r\n        <td>\r\n          {{each.amount}}\r\n        </td>\r\n        <td>\r\n        <div class="checkbox-toggle">\r\n            <input type="checkbox" [id]="\'check-toggle-active-\'+each.id" name="active" [(ngModel)]="each.status" (change)="changeStatus(each.id, each.status)">\r\n            <label [for]="\'check-toggle-active-\'+each.id"></label>\r\n        </div>\r\n        </td>\r\n        <td class="text-center">\r\n           <a  class="btn btn-inline btn-primary btn-sm" title="Edit text" [routerLink]="[\'/extension_deal/edit\']" [state]="each">\r\n            <i class="fa fa-pencil"></i>\r\n           </a>\r\n           <span class="btn btn-inline btn-danger btn-sm" title="Delete" (click)="deleteExtensionDeal(each.id)">\r\n            <i class="fa fa-trash"></i>\r\n          </span>\r\n        </td>\r\n      </tr>\r\n      <tr *ngIf="!extension_deals.length">\r\n        <td colspan="4">No Data Found</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</section>'},zfNZ:function(e,t){e.exports=""}}]);