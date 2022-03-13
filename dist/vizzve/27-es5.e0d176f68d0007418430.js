(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{"4uC0":function(e,t,n){"use strict";n.r(t);var r=n("mrSG"),a=n("CcnG"),i=n("Ip0R"),s=n("gIcY"),o=n("ZYCi"),l=n("t/Na"),d=n("F/XL"),c=n("xMyE"),u=n("9Z1F"),p=n("AytR"),m=n("3AtW"),b=function(){function e(e,t){this.http=e,this.alertService=t,this.requestUrl=p.a.requestUrl+"/apis/apply_loan",this.httpOptions={headers:new l.d({"content-Type":"application/json;charset=UTF-8"})}}return e.prototype.getsEditLoan=function(){var e=this;return this.http.get(this.requestUrl+"/all").pipe(Object(c.a)((function(t){e.handleResponse(t)})),Object(u.a)(this.handleError("EditLoan")))},e.prototype.getEditLoan=function(e){var t=this;return console.log(222222,e),this.http.get(this.requestUrl+"/edit_loan/get_search_loans/"+e,this.httpOptions).pipe(Object(c.a)((function(e){t.handleResponse(e)})),Object(u.a)(this.handleError("EditLoan")))},e.prototype.getEditLoanView=function(e,t){var n=this;return this.http.get(this.requestUrl+"/edit_loan/get_edit_loan/"+e+"/"+t,this.httpOptions).pipe(Object(c.a)((function(e){n.handleResponse(e)})),Object(u.a)(this.handleError("EditLoan")))},e.prototype.saveEditLoan=function(e){var t=this;return this.http.post(this.requestUrl+"/edit_loan/save_editloan",e,this.httpOptions).pipe(Object(c.a)((function(e){t.handleResponse(e)})),Object(u.a)(this.handleError("EditLoan")))},e.prototype.deleteEditLoan=function(e){var t=this;return this.http.post(this.requestUrl+"/delete",{id:e},this.httpOptions).pipe(Object(c.a)((function(e){t.handleResponse(e)})),Object(u.a)(this.handleError("EditLoan")))},e.prototype.getUserEditLoan=function(){var e=this;return this.http.get(p.a.requestUrl+"/api/editloan/all").pipe(Object(c.a)((function(t){e.handleResponse(t)})),Object(u.a)(this.handleError("EditLoan")))},e.prototype.getEditLoanPermission=function(){var e=this;return this.http.get(p.a.requestUrl+"/api/permission/all").pipe(Object(c.a)((function(t){e.handleResponse(t)})),Object(u.a)(this.handleError("EditLoan")))},e.prototype.handleResponse=function(e){return e.error?this.alertService.warn("Failed: "+e.message):this.alertService.success("Success:"+e.message),e},e.prototype.handleError=function(e,t){var n=this;return void 0===e&&(e="operation"),function(r){return n.alertService.error(e+" failed: "+r.message),Object(d.a)(t)}},e.ctorParameters=function(){return[{type:l.b},{type:m.a}]},e=r.b([Object(a.C)()],e)}(),h=n("SZbH"),v=n("ZYjt"),f=function(){function e(e,t,n,r,a){this.route=e,this.router=t,this.editloanService=n,this.toastr=r,this.titleService=a,this.searchloan={loan_id:""},this.titleService.setTitle("List Edit Loan")}return e.prototype.ngOnInit=function(){},e.prototype.search=function(e){var t=this;console.log(e.loan_id),this.editloanService.getEditLoan(e.loan_id).subscribe((function(e){e&&(t.editloan=e.data),console.log("Running",t.editloan),$((function(){$("#listeditloan").dataTable({responsive:!0,destroy:!0,order:[]})}))}))},e.ctorParameters=function(){return[{type:o.a},{type:o.f},{type:b},{type:h.b},{type:v.c}]},e=r.b([Object(a.n)({selector:"list-editloan",template:n("SYXH")})],e)}(),g=function(){function e(e,t,n,r,a){this.router=e,this.route=t,this.editLoanService=n,this.toastr=r,this.titleService=a,this.selectedId=[],this.titleService.setTitle("Edit Loan")}return e.prototype.ngOnInit=function(){var e=this,t=this.route.snapshot.url[1].path,n=this.route.snapshot.url[2].path;this.editLoanService.getEditLoanView(t,n).subscribe((function(t){t&&(e.editloan=t.data,e.loanStatus=t.status)}))},e.prototype.save=function(e){var t=this;this.editLoanService.saveEditLoan(e).subscribe((function(e){console.log(e),t.toastr.success(e.message,"Success")}),(function(e){console.log(e)}))},e.ctorParameters=function(){return[{type:o.f},{type:o.a},{type:b},{type:h.b},{type:v.c}]},e=r.b([Object(a.n)({selector:"edit-loan",template:n("PO2Z")})],e)}(),y=function(){function e(e,t){this.route=e,this.titleService=t,this.titleService.setTitle("View Edit Loan")}return e.prototype.ngOnInit=function(){this.editloan=this.route.snapshot.data.editloan.data,this.permissions=this.route.snapshot.data.editloan.permission},e.ctorParameters=function(){return[{type:o.a},{type:v.c}]},e=r.b([Object(a.n)({selector:"view-editloan",template:n("qRTT")})],e)}(),_=function(){function e(e){this.editloanService=e}return e.prototype.resolve=function(){return this.editloanService.getsEditLoan()},e.ctorParameters=function(){return[{type:b}]},e=r.b([Object(a.C)()],e)}(),L=function(){function e(e){this.editloanService=e}return e.prototype.resolve=function(e){},e.ctorParameters=function(){return[{type:b}]},e=r.b([Object(a.C)()],e)}(),E=function(){function e(e){this.editloanService=e}return e.prototype.resolve=function(e){},e.ctorParameters=function(){return[{type:b}]},e=r.b([Object(a.C)()],e)}(),x=[{path:"",component:f,resolve:{editloans:_}},{path:"edit/:loan_id/:id",component:g,resolve:{editloan:L}},{path:"view/:loan_id/:id",component:y,resolve:{editloan:E}}],M=function(){function e(){}return e=r.b([Object(a.K)({imports:[o.g.forChild(x)],exports:[o.g]})],e)}(),O=n("Q6Ar");n.d(t,"EditLoanModule",(function(){return S}));var S=function(){function e(){}return e=r.b([Object(a.K)({imports:[i.b,s.a,M,O.a],providers:[b,_,L,E],declarations:[f,g,y]})],e)}()},PO2Z:function(e,t){e.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Edit Loan</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li><a [routerLink]="[\'/edit_loan\']">Loan</a></li>\r\n          <li class="active">Edit Loan</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\x3c!-- Main content --\x3e \r\n<section class="box-typical box-typical-padding">\r\n  <form name="form" (ngSubmit)="f.form.valid && save(f.value)" #f="ngForm" novalidate> \r\n    <div class="row m-t-1">\r\n      <div class="col-sm-12">\r\n        <div class="row">\r\n          <div class="col-md-6"> \r\n            <label for="loan_id" class="required semibold form-label">Loan Id</label>\r\n            <input type="text" class="form-control" name="loan_id" disabled [(ngModel)]="editloan.loan_id" #loan_id="ngModel"> \r\n            <input type="hidden" class="form-control" name="loans_id" [(ngModel)]="editloan.loan_id" #loans_id="ngModel"> \r\n            <input type="hidden" class="form-control" name="user_id" [(ngModel)]="editloan.user_id" #user_id="ngModel"> \r\n          </div> \r\n          <div class="col-md-6">\r\n              <div class="form-group">\r\n                  <label for="name" class="required semibold form-label">Username</label>\r\n                  <input type="text" class="form-control" name="name" disabled [(ngModel)]="editloan.appUser.username" #name="ngModel"> \r\n              </div>\r\n          </div>\r\n        </div> \r\n        <div class="row">\r\n          <div class="col-md-6">\r\n            <label for="mobile_no" class="required semibold form-label">Mobile Number</label>\r\n            <input type="text" class="form-control" name="mobile_no" disabled [(ngModel)]="editloan.appUser.mobile_no" #mobile_no="ngModel"> \r\n          </div> \r\n          <div class="col-md-6">\r\n              <div class="form-group">\r\n                  <label for="email" class="required semibold form-label">Email</label>\r\n                  <input type="text" class="form-control" name="email" disabled [(ngModel)]="editloan.appUser.email" #email="ngModel"> \r\n              </div>\r\n          </div>\r\n        </div>\r\n        <div class="row">\r\n          <div class="col-md-6">\r\n            <label for="required_amount" class="required semibold form-label">Loan Amount</label>\r\n            <input type="text" class="form-control" name="required_amount" disabled [(ngModel)]="editloan.required_amount" #required_amount="ngModel"> \r\n          </div> \r\n          <div class="col-md-6">\r\n              <div class="form-group" [ngClass]="{ \'has-error\': f.submitted && !disbursed_amount.valid}">\r\n                  <label for="disbursed_amount" class="required semibold form-label">Disbursed Amount</label>\r\n                  <input type="text" class="form-control" name="disbursed_amount" [(ngModel)]="editloan.disbursed_amount" #disbursed_amount="ngModel" required> \r\n                  <div *ngIf="f.submitted && !disbursed_amount.valid" class="help-block">Disbursed Amount field is required</div>\r\n              </div>\r\n          </div>\r\n        </div>\r\n        <div class="row">\r\n          <div class="col-md-6">\r\n            <label for="days" class="required semibold form-label">Days</label>\r\n            <input type="text" class="form-control" name="days" disabled [(ngModel)]="editloan.days" #days="ngModel"> \r\n          </div> \r\n          <div class="col-md-6">\r\n            <div class="form-group">\r\n                <label for="apply_date" class="required semibold form-label">Apply Date</label>\r\n                <input type="text" class="form-control" name="apply_date" disabled [(ngModel)]="editloan.apply_date" #apply_date="ngModel"> \r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class="row">\r\n          <div class="col-md-6">\r\n            <label for="status" class="required semibold form-label">Status</label> \r\n            <select class="form-control" name="status" [(ngModel)]="editloan.status" #status="ngModel" required>\r\n              <option disabled>select-status</option>\r\n              <option *ngFor="let stat_us of loanStatus" [value]="stat_us.status_id">{{stat_us.status}}</option>\r\n            </select>\r\n          </div> \r\n          <div class="col-md-6">\r\n            <div class="form-group">\r\n              <label for="disbursed_date" class="required semibold form-label">Disbursed Date</label>\r\n              <input type="datetime-local" class="form-control" name="disbursed_date" [(ngModel)]="editloan.disbursed_date" #disbursed_date="ngModel"> \r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class="row">\r\n          <div class="col-md-6">\r\n            <label for="payable_date" class="required semibold form-label">Payable Date</label>\r\n            <input type="datetime-local" class="form-control" name="payable_date" [(ngModel)]="editloan.payable_date" #payable_date="ngModel"> \r\n          </div> \r\n          <div class="col-md-6">\r\n              <div class="form-group">\r\n                  <label for="transfer_id" class="required semibold form-label">Transfer ID</label>\r\n                  <input type="text" class="form-control" name="transfer_id" [(ngModel)]="editloan.transfer_id" #transfer_id="ngModel"> \r\n              </div>\r\n          </div>\r\n        </div>\r\n        <div class="col-md-12 align-middle">\r\n          <div class="form-group">\r\n            <button class="btn btn-primary" style="margin-right: 10px;">Save</button>\r\n            <a class="btn btn-primary" [routerLink]="[\'/edit_loan\']">Cancel</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</section>'},SYXH:function(e,t){e.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Edit Loan</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li class="active">Edit Loan</li>\r\n        </ol>\r\n        \x3c!-- <div class="add-button pull-right">\r\n          <a [routerLink]="[\'/sub_category/add/\']" class="btn btn-inline btn-primary btn-sm" title="Add">Add Edit Loan</a>\r\n        </div> --\x3e\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n<section class="box-typical box-typical-padding">\r\n  <h5>Search & Filter</h5>\r\n  <form name="form" (ngSubmit)="search(f.value)" #f="ngForm" novalidate> \r\n    <div class="row m-t-1">\r\n      <div class="col-md-3">\r\n        <input type="text" class="form-control" name="loan_id" placeholder="Enter Loan Id" [(ngModel)]="searchloan.loan_id" #loan_id="ngModel">\r\n      </div><br>  \r\n      <div class="col-md-2">\r\n        <button class="btn btn-primary form-control"><i class="fa fa-search"></i> Search</button>\r\n      </div> \r\n      <div class="col-md-2">\r\n        <span (click)="reset()" class="btn btn-warning form-control" title="Reset Filter">Reset Filter</span>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</section>\r\n\x3c!-- Main Content --\x3e\r\n<section class="box-typical box-typical-padding">\r\n  <div class="table-responsive">\r\n    <table class="display table table-bordered" cellspacing="0" width="100%">\r\n      <thead>\r\n        <tr> \r\n          <th>Loan Id</th>\r\n          <th>Name</th>\r\n          <th>Mobile No</th>\r\n          <th>Email</th>\r\n          <th>Loan Type</th> \r\n          <th>Loan Amount</th> \r\n          <th>Days</th> \r\n          <th>Apply Date</th>  \r\n          <th>Status</th>  \r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <ng-container *ngFor="let customer of editloan">\r\n          <tr> \r\n            <td>\r\n              <a [routerLink]="[\'/edit_loan/edit/\'  + customer.loan_id + \'/\' + customer.user_id]" target="_blank" title="View Customer Detail">{{ customer.loan_id }}</a> \r\n              <span *ngIf="customer.customerReapply" class="flag-warning"> {{customer.customerReapply}} </span>\r\n              <span *ngIf="customer.customerOverdue" class="flag-danger"> {{customer.customerOverdue}} </span>\r\n              <span *ngIf="customer.customerExtend" class="flag-primary"> {{customer.customerExtend}} </span>\r\n            </td>\r\n            <td>\r\n              {{ customer.appUser.username }}\r\n            </td>\r\n            <td>\r\n              {{ customer.appUser.mobile_no }}\r\n            </td>\r\n            <td>\r\n              {{ customer.appUser.email }}\r\n            </td>\r\n            <td>\r\n              <span *ngIf="customer.appUser.user_type == 0">\r\n                Student\r\n              </span>\r\n              <span *ngIf="customer.appUser.user_type == 1">\r\n                Employment\r\n              </span>\r\n              <span *ngIf="customer.appUser.user_type == 2">\r\n                Business\r\n              </span>\r\n            </td>\r\n            <td>\r\n              {{ customer.required_amount }}\r\n            </td>\r\n            <td>\r\n              {{ customer.days}}\r\n            </td>  \r\n            <td>\r\n              {{ customer.apply_date | date: \'dd-MM-yyyy\'}}\r\n            </td> \r\n            <td>\r\n              {{customer.loanStatus.status}}\r\n            </td>   \r\n          </tr>\r\n        </ng-container> \r\n      </tbody>\r\n    </table>  \r\n  </div>\r\n</section>'},qRTT:function(e,t){e.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>View Edit Laon</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/sub_category\']">View Edit Laon</a></li>\r\n          <li class="active">View Edit Laon</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n\x3c!-- Main content --\x3e\r\n<section class="box-typical box-typical-padding"> \r\n  <h5>View Edit Laon Detail</h5>\r\n  <div class="row m-y-1">\r\n    <div class="col-lg-6">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="email">Category Name</label>\r\n        <span class="form-control maxlength-simple">{{ subcategory.userCategory.category }}</span>\r\n      </fieldset>\r\n    </div> \r\n    <div class="col-lg-6">\r\n      <fieldset class="form-group">\r\n        <label class="semibold form-label" for="email">View Edit Laon </label>\r\n        <span class="form-control maxlength-simple">{{ subcategory.name }}</span>\r\n      </fieldset>\r\n    </div> \r\n  </div> \r\n  <div class="row">\r\n    <div class="col-md-6">\r\n        <div class="form-group" >\r\n          <label class="semibold form-label">Permission</label>\r\n          <div *ngFor="let permission of permissions">\r\n              <label>\r\n                <input type="checkbox" name="{{permission.id}}" [value]="permission.id" [checked]="permission.id" disabled (change)="onChange($event, permission.id )"/>\r\n                {{permission.per_name}}\r\n              </label>\r\n            </div> \r\n        </div>\r\n    </div>  \r\n</div>\r\n  \r\n</section>\r\n\x3c!-- /.content --\x3e'}}]);