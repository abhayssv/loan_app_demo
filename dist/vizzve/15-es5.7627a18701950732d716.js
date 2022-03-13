(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"+Yor":function(e,t){e.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Faq Details</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/faqs\']">Faqs</a></li>\r\n          <li class="active">Faq Details</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\x3c!-- Main content --\x3e\r\n<section class="box-typical box-typical-padding"> \r\n  <div class="row m-y-1">\r\n    <div class="col-lg-12">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="email">Question </label>\r\n        <span class="form-control maxlength-simple">{{ faq.question }}</span>\r\n      </fieldset>\r\n    </div> \r\n  </div>\r\n  <div class="row m-y-1">\r\n    <div class="col-lg-12">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="firstname">Answer </label> \r\n        <textarea class="form-control" [(ngModel)]="faq.answer" disabled rows="4" cols="50"></textarea>\r\n      </fieldset>\r\n    </div> \r\n  </div> \r\n</section>\r\n\x3c!-- /.content --\x3e'},LMBj:function(e,t){e.exports='<header class="section-header">\r\n    <div class="tbl">\r\n        <div class="tbl-row">\r\n            <div class="tbl-cell">\r\n                <h3>Add Faq</h3>\r\n                <ol class="breadcrumb breadcrumb-simple">\r\n                    <li><a [routerLink]="[\'/\']">Home</a></li>\r\n                    <li><a [routerLink]="[\'/faqs\']">Faqs</a></li>\r\n                    <li class="active">Add Faq</li>\r\n                </ol>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</header>\r\n\x3c!-- Main content --\x3e\r\n<section class="box-typical box-typical-padding">\r\n    <form name="form" (ngSubmit)="f.form.valid && save()" #f="ngForm" novalidate>\r\n        <div class="row m-t-1">\r\n            <div class="col-sm-12">\r\n                <div class="row">\r\n                    <div class="col-md-12">\r\n                        <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !question.valid}">\r\n                            <label for="question" class="required semibold form-label">Question</label>\r\n                            <input type="text" class="form-control" placeholder="Question..." name="question" [(ngModel)]="faq.question" #question="ngModel" required>\r\n                            <div *ngIf="f.submitted && !question.valid" class="help-block">Question field is required</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class="row">\r\n                    <div class="col-sm-12">\r\n                        <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !answer.valid}">\r\n                            <label for="answer" class="required semibold form-label">Answer</label>\r\n                            <textarea class="form-control" placeholder="Answer..." name="answer" [(ngModel)]="faq.answer" #answer="ngModel" required rows="4" cols="50"></textarea>\r\n                            <div *ngIf="f.submitted && !answer.valid" class="help-block">Answer is required</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class="col-md-12 align-middle">\r\n                <div class="form-group">\r\n                    <button class="btn btn-primary" style="margin-right: 10px;">Save</button>\r\n                    <a class="btn btn-primary" [routerLink]="[\'/faqs\']">Cancel</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</section>'},PRXR:function(e,t,r){"use strict";r.r(t);var n=r("mrSG"),s=r("CcnG"),a=r("Ip0R"),i=r("gIcY"),o=r("ZYCi"),l=r("t/Na"),c=r("F/XL"),d=r("xMyE"),u=r("9Z1F"),f=r("AytR"),p=r("3AtW"),h=function(){function e(e,t){this.http=e,this.alertService=t,this.requestUrl=f.a.requestUrl+"/api/faq",this.httpOptions={headers:new l.d({"content-Type":"application/json;charset=UTF-8"})}}return e.prototype.getFaqs=function(){var e=this;return this.http.get(this.requestUrl+"/all").pipe(Object(d.a)((function(t){e.handleResponse(t)})),Object(u.a)(this.handleError("Faq")))},e.prototype.getFaq=function(e){var t=this;return this.http.get(this.requestUrl+"/"+e,this.httpOptions).pipe(Object(d.a)((function(e){t.handleResponse(e)})),Object(u.a)(this.handleError("Faq")))},e.prototype.getFaqView=function(e){var t=this;return this.http.get(this.requestUrl+"/"+e,this.httpOptions).pipe(Object(d.a)((function(e){t.handleResponse(e)})),Object(u.a)(this.handleError("Faq")))},e.prototype.saveFaq=function(e){var t=this;return this.http.post(this.requestUrl+"/save_faq",e,this.httpOptions).pipe(Object(d.a)((function(e){t.handleResponse(e)})),Object(u.a)(this.handleError("Faq")))},e.prototype.deleteFaq=function(e){var t=this;return this.http.post(this.requestUrl+"/delete",{faq_id:e},this.httpOptions).pipe(Object(d.a)((function(e){t.handleResponse(e)})),Object(u.a)(this.handleError("Faq")))},e.prototype.handleResponse=function(e){return e.error?this.alertService.warn("Failed: "+e.message):this.alertService.success("Success:"+e.message),e},e.prototype.handleError=function(e,t){var r=this;return void 0===e&&(e="operation"),function(n){return r.alertService.error(e+" failed: "+n.message),Object(c.a)(t)}},e.ctorParameters=function(){return[{type:l.b},{type:p.a}]},e=n.b([Object(s.C)()],e)}(),v=r("SZbH"),b=r("ZYjt"),q=function(){function e(e,t,r,n){this.router=e,this.faqService=t,this.toastr=r,this.titleService=n,this.editorConfig={editable:!0,spellcheck:!0,height:"auto",minHeight:"15rem",placeholder:"Enter text here...",translate:"no",customClasses:[{name:"quote",class:"quote"},{name:"redText",class:"redText"},{name:"titleText",class:"titleText",tag:"h1"}]},this.titleService.setTitle("Add FAQ")}return e.prototype.ngOnInit=function(){this.faq={faq_id:null,question:"",answer:"",message:"",data:this.faq}},e.prototype.save=function(){var e=this;this.faqService.saveFaq(this.faq).subscribe((function(t){e.router.navigate(["/faqs"]),e.toastr.success(t.message,"Success")}),(function(e){console.log(e)}))},e.ctorParameters=function(){return[{type:o.f},{type:h},{type:v.b},{type:b.c}]},e=n.b([Object(s.n)({selector:"add-faq",template:r("LMBj")})],e)}(),m=function(){function e(e,t,r,n,s){this.route=e,this.router=t,this.faqService=r,this.toastr=n,this.titleService=s,this.titleService.setTitle("List FAQ")}return e.prototype.ngOnInit=function(){var e=this.route.snapshot.data.faqs;e&&(this.faqs=e.data),$((function(){$("#lisfaqs").DataTable({responsive:!0,order:[]})}))},e.prototype.delete1=function(e){var t=this,r=[];confirm("Do you really want to delete this faq")&&this.faqService.deleteFaq(e).subscribe((function(n){t.toastr.success(n.message,"Success"),n.error||(r=t.faqs,t.faqs=r.filter((function(t){return t.faq_id!==e})))}))},e.ctorParameters=function(){return[{type:o.a},{type:o.f},{type:h},{type:v.b},{type:b.c}]},e=n.b([Object(s.n)({selector:"list-faq",template:r("qpv1")})],e)}(),g=function(){function e(e,t,r,n,s){this.router=e,this.route=t,this.faqService=r,this.toastr=n,this.titleService=s,this.editorConfig={editable:!0,spellcheck:!0,height:"auto",minHeight:"15rem",placeholder:"Enter text here...",translate:"no",customClasses:[{name:"quote",class:"quote"},{name:"redText",class:"redText"},{name:"titleText",class:"titleText",tag:"h1"}]},this.titleService.setTitle("Edit FAQ")}return e.prototype.ngOnInit=function(){var e=this.route.snapshot.data.faq;e&&(this.faq=e.data)},e.prototype.onChange=function(e){e.target.files},e.prototype.save=function(){var e=this;this.faqService.saveFaq(this.faq).subscribe((function(t){e.router.navigate(["/faqs"]),e.toastr.success(t.message,"Success")}),(function(e){console.log(e)}))},e.ctorParameters=function(){return[{type:o.f},{type:o.a},{type:h},{type:v.b},{type:b.c}]},e=n.b([Object(s.n)({selector:"edit-faq",template:r("gsgv")})],e)}(),y=function(){function e(e,t){this.route=e,this.titleService=t,this.editorConfig={editable:!0,spellcheck:!0,height:"auto",minHeight:"15rem",placeholder:"Enter text here...",translate:"no",customClasses:[{name:"quote",class:"quote"},{name:"redText",class:"redText"},{name:"titleText",class:"titleText",tag:"h1"}]},this.titleService.setTitle("View FAQ")}return e.prototype.ngOnInit=function(){this.faq=this.route.snapshot.data.faq.data},e.ctorParameters=function(){return[{type:o.a},{type:b.c}]},e=n.b([Object(s.n)({selector:"view-faq",template:r("+Yor")})],e)}(),x=function(){function e(e){this.faqService=e}return e.prototype.resolve=function(){return this.faqService.getFaqs()},e.ctorParameters=function(){return[{type:h}]},e=n.b([Object(s.C)()],e)}(),w=function(){function e(e){this.faqService=e}return e.prototype.resolve=function(e){return this.faqService.getFaq(e.paramMap.get("faq_id"))},e.ctorParameters=function(){return[{type:h}]},e=n.b([Object(s.C)()],e)}(),F=function(){function e(e){this.faqService=e}return e.prototype.resolve=function(e){return this.faqService.getFaqView(e.paramMap.get("faq_id"))},e.ctorParameters=function(){return[{type:h}]},e=n.b([Object(s.C)()],e)}(),S=[{path:"",component:m,resolve:{faqs:x}},{path:"edit/:faq_id",component:g,resolve:{faq:w}},{path:"add",component:q},{path:"view/:faq_id",component:y,resolve:{faq:F}}],O=function(){function e(){}return e=n.b([Object(s.K)({imports:[o.g.forChild(S)],exports:[o.g]})],e)}(),j=r("Q6Ar");r.d(t,"FaqModule",(function(){return k}));var k=function(){function e(){}return e=n.b([Object(s.K)({imports:[a.b,i.a,O,j.a],providers:[h,x,w,F],declarations:[m,g,q,y]})],e)}()},gsgv:function(e,t){e.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Edit Faq</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li><a [routerLink]="[\'//faqs\']">Faqs</a></li>\r\n          <li class="active">Edit Faq</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\x3c!-- Main content --\x3e\r\n<p>{{faq.question}}</p>\r\n<section class="box-typical box-typical-padding">\r\n  <form name="form" (ngSubmit)="f.form.valid && save()" #f="ngForm" enctype="multipart/form-data" novalidate>\r\n    <input type="hidden" name="faq_id" [(ngModel)]="faq.faq_id" #id="ngModel">\r\n    <div class="row m-t-1">\r\n      <div class="col-sm-12">\r\n        <div class="row">\r\n          <div class="col-md-12">\r\n            <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !question.valid}">\r\n              <label for="question" class="required semibold form-label">Question</label>\r\n              <input type="text" class="form-control" name="question" [(ngModel)]="faq.question" #question="ngModel"\r\n                required>\r\n              <div *ngIf="f.submitted && !question.valid" class="help-block">Question field is required</div>\r\n            </div>\r\n          </div>  \r\n        </div>\r\n        <div class="row">\r\n          <div class="col-sm-12">\r\n            <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !answer.valid}">\r\n              <label for="answer" class="required semibold form-label">Answer</label>  \r\n                <textarea class="form-control" placeholder="Answer..." name="answer" [(ngModel)]="faq.answer" #answer="ngModel" required rows="4" cols="50"></textarea>\r\n              <div *ngIf="f.submitted && !answer.valid" class="help-block">Answer is required</div>\r\n            </div>\r\n          </div>\r\n        </div> \r\n        <div class="col-md-12 align-middle">\r\n          <div class="form-group">\r\n            <button class="btn btn-primary" style="margin-right: 10px;">Save</button>\r\n            <a class="btn btn-primary" [routerLink]="[\'/faqs\']">Cancel</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</section>'},qpv1:function(e,t){e.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Faqs</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li class="active">Faqs</li>\r\n        </ol>\r\n        <div class="add-button pull-right">\r\n          <a [routerLink]="[\'/faqs/add/\']" class="btn btn-inline btn-primary btn-sm" title="Add">Add FAQ</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\x3c!-- Main Content --\x3e\r\n<section class="box-typical box-typical-padding">\r\n  <table id="lisfaqs" class="display table table-bordered" cellspacing="0" width="100%">\r\n    <thead>\r\n      <tr>\r\n        <th>ID</th>\r\n        <th>Question</th>\r\n        <th>Action</th>\r\n        \x3c!-- <th>Description</th>  --\x3e \r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngFor="let faq of faqs" [attr.id]="faq.id">\r\n         \r\n        <td>\r\n          {{ faq.faq_id }}\r\n        </td>\r\n        <td>\r\n          {{ faq.question }}\r\n        </td>  \r\n        <td class="text-center">\r\n          <a [routerLink]="[\'/faqs/view/\' + faq.faq_id]" class="btn btn-inline btn-primary btn-sm" title="View Faq"><i class="fa fa-search"></i></a> \r\n          \r\n          <a [routerLink]="[\'/faqs/edit/\' + faq.faq_id]" class="btn btn-inline btn-primary btn-sm" title="Edit Faq"><i class="fa fa-pencil"></i></a>\r\n           \r\n          <span class="btn btn-inline btn-danger btn-sm" title="Delete User" (click)="delete1(faq.faq_id)"><i class="fa fa-trash"></i></span>\r\n            \r\n        </td>\r\n        \x3c!-- <td style="width:50%">\r\n          {{ faq.description }}\r\n        </td>   --\x3e\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</section>'}}]);