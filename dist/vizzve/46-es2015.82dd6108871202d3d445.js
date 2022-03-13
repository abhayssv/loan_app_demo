(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{"4Rcd":function(e,t,r){"use strict";r.r(t);var s=r("mrSG"),i=r("8Y7J"),a=r("SVse"),n=r("s7LF"),o=r("iInd"),l=r("IheW"),p=r("LRne"),d=r("vkgz"),h=r("JIr8"),c=r("AytR"),u=r("3AtW");let m=class{constructor(e,t){this.http=e,this.alertService=t,this.requestUrl=c.a.requestUrl+"/api/apply_loan",this.httpOptions={headers:new l.d({"content-Type":"application/json;charset=UTF-8"})}}getReviewerReports(){return this.http.get(c.a.requestUrl+"/api/system_report/collection/get_reviewers").pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(()=>"failed"))}getReviewerLoanReport(e,t){return this.http.get(c.a.requestUrl+"/api/system_report/collection/get_reviewers_report/"+e+"/"+t).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("OverallCollection")))}getReviewerReport(e,t,r,s){const{from_date:i,to_date:a,reviewer:n,status:o,assigned_users:l,loan_id:p,name:u,mobile_no:m,email:v,user_type:g,tenure:b,amount:w,id_number:_}=e;return this.http.get(c.a.requestUrl+"/api/system_report/reviewer/get_reports?from_date="+i+"&to_date="+a+"&reviewer="+n+"&status="+o+"&assigned_users="+l+"&loan_id="+p+"&name="+u+"&mobile_no="+m+"&email="+v+"&user_type="+g+"&tenure="+b+"&amount="+w+"&id_number="+_+"&offset="+t+"&limit="+r+"&isExport="+s).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("ReviewerReport")))}exportSheet(e){return this.http.post(c.a.requestUrl+"/api/system_report/reviewer/export_reviewer_sheet",e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("ReviewerReport")))}getReviewerReportView(e){return this.http.get(c.a.requestUrl+"/api/user/"+e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("ReviewerReport")))}getContactDetails(e){return this.http.get(c.a.requestUrl+"/apis/contact/"+e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("User")))}getApplyLoanDetails(e,t){return this.http.get(this.requestUrl+"/"+e+"/"+t,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("ReviewerReport")))}changeStatus(e,t,r,s){return this.http.post(this.requestUrl+"/status",{status:e,apply_loan_id:t,key:r,email:s},this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("ReviewerReport")))}deleteReviewerReport(e){return this.http.post(this.requestUrl+"/delete",{user_id:e},this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("ReviewerReport")))}getBasicInfo(e){return this.http.get(c.a.requestUrl+"/api/admin/profile/basic_info/"+e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("ReviewerReport")))}getRefInfo(e){return this.http.get(c.a.requestUrl+"/api/admin/profile/ref/"+e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("User")))}getEmpInfo(e){return this.http.get(c.a.requestUrl+"/api/admin/profile/emp_info/"+e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("ReviewerReport")))}getBankInfo(e){return this.http.get(c.a.requestUrl+"/api/admin/profile/bank/"+e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("ReviewerReport")))}getKycInfo(e){return this.http.get(c.a.requestUrl+"/api/admin/profile/kyc/"+e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("ReviewerReport")))}getBusinessDetails(e){return this.http.get(c.a.requestUrl+"/api/admin/profile/business/"+e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("User")))}getCollegeDetails(e){return this.http.get(c.a.requestUrl+"/api/admin/profile/college/"+e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("User")))}getStatus(){return this.http.get(c.a.requestUrl+"/api/apply_loan/status",this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("User")))}getStatusByRole(e){return this.http.get(c.a.requestUrl+"/api/system_report/reviewer/get_status/"+e,this.httpOptions).pipe(Object(d.a)(e=>{this.handleResponse(e)}),Object(h.a)(this.handleError("User")))}handleResponse(e){return e.error?this.alertService.warn("Failed: "+e.message):this.alertService.success("Success:"+e.message),e}handleError(e="operation",t){return r=>(this.alertService.error(`${e} failed: ${r.message}`),Object(p.a)(t))}};m.ctorParameters=()=>[{type:l.b},{type:u.a}],m=s.a([Object(i.C)()],m);var v=r("EApP"),g=r("cUpR"),b=r("QAmw");let w=class{constructor(e,t,r,s,i){this.route=e,this.router=t,this.reviewerreportService=r,this.toastr=s,this.titleService=i,this.searchreviewerreport={from_date:"",to_date:"",loan_id:"",name:"",mobile_no:"",email:"",user_type:"",tenure:"",status:"",amount:"",id_number:"",reviewer:"",assigned_users:""},this.p=1,this.limit=10,this.user_types=[{id:0,name:"Student"},{id:1,name:"Employee"},{id:2,name:"Self Employee"}],this.tenures=[{id:1,days:7},{id:2,days:14},{id:3,days:21},{id:3,days:28}],this.amounts=[{id:1,amount:500},{id:2,amount:1e3},{id:3,amount:1500},{id:4,amount:2e3},{id:1,amount:2500},{id:2,amount:3e3},{id:3,amount:3500},{id:4,amount:4e3},{id:1,amount:4500},{id:2,amount:5e3},{id:3,amount:6500},{id:4,amount:7e3}],this.exporting=!1,this.isExport=!1,this.isShow=!1,this.titleService.setTitle("List Reviewer Report")}ngOnInit(){this.getReviewerReportLoan(this.p),this.reviewerreportService.getStatus().subscribe(e=>{e&&(this.status=e.data),this.loanStatus=this.status})}reset(){this.limit=10,this.fieldReset(),this.isSearching=!1,this.isExport=!1,this.statusByRole=null,this.p=1,this.total=0,this.getPage(1)}getPage(e){this.p=e,this.isExport=!1,this.isSearching?(this.isLoading=!0,this.getFilterdData()):this.getReviewerReportLoan(this.p)}getReviewerReportLoan(e){let t=(e-1)*this.limit;this.reviewerreports=new Array,this.isLoading=!0,this.reviewerreportService.getReviewerLoanReport(t,this.limit).subscribe(e=>{e&&(this.reviewerreports=[].concat(e.data),this.length=this.reviewerreports.length,this.total=Number(e.total||0)),this.isLoading=!1})}onChangeReviewer(e){this.users=[],e?this.reviewerreportService.getStatusByRole(e).subscribe(e=>{this.statusByRole=e.data,this.users=e.users}):this.statusByRole=null}search(e){this.searchOptions=e,this.p=1,this.total=0,this.isSearching=!0,this.isExport=!1,this.reviewerreports=new Array,this.isLoading=!0,this.getFilterdData()}getFilterdData(){let e=(this.p-1)*this.limit;this.reviewerreportService.getReviewerReport(this.searchOptions,e,this.limit,this.isExport).subscribe(e=>{this.isLoading=!1,this.exporting=!1,e.data&&e.data.length?(this.reviewerreports=[].concat(e.data),this.length=e.data.length,this.total=Number(e.total||0),this.isExport&&(this.exportData=[].concat(e.data),this.downloadExportedData())):(this.toastr.error("Record not found.","Error"),this.reviewerreports=[])},e=>{console.log(e),this.isLoading=!1})}getAllDataToExport(){this.exporting=!0,this.reviewerreportService.getReviewerReports().subscribe(e=>{e.data&&e.data.length?(this.exportData=e.data,this.downloadExportedData()):this.toastr.error("Record not found.","Error"),this.exporting=!1})}fieldReset(){this.searchreviewerreport={from_date:"",to_date:"",loan_id:"",name:"",mobile_no:"",email:"",user_type:"",tenure:"",status:"",amount:"",id_number:"",reviewer:"",assigned_users:""}}downloadExportedData(){var e=[];console.log("Data",this.exportData),this.exportData.forEach(t=>{const r=t.appUser||{};e.push({loan_id:t.loan_id,username:r.username||"",mobile_no:r.mobile_no||"",email:r.email||"",user_type:r.user_type?0==r.user_type?"student":"employee":"",required_amount:t.required_amount,disbursed_amount:t.disbursed_amount,remaining_amount:t.remaining_amount,payable_date:t.payable_date,status:t.loanStatus.status,reviewer_1:null!=t.appUserReviewer_1?t.appUserReviewer_1.firstname+t.appUserReviewer_1.lastname:"Not Assigned",reviewer_2:null!=t.appUserReviewer_2?t.appUserReviewer_2.firstname+t.appUserReviewer_2.lastname:"Not Assigned"})});const t=e;new b.ngxCsv(t,"Reviewer Sheet",{fieldSeparator:",",quoteStrings:'"',decimalseparator:".",showLabels:!0,showTitle:!0,title:"Reviewer Sheet",useBom:!0,headers:["Loan Id","Customer Name","Mobile Number","Email","User Type","Required Amount","disbursed_amount","remaining_amount","payable_date","Status","reviewer_1","reviewer_2"]}),this.toastr.success("Successfully Exported.")}exportSheet(){this.isSearching?(this.isExport=!0,this.exporting=!0,this.getFilterdData()):this.getAllDataToExport()}toggleDisplay(){this.isShow=!this.isShow}};w.ctorParameters=()=>[{type:o.a},{type:o.f},{type:m},{type:v.b},{type:g.c}],w=s.a([Object(i.n)({selector:"list-reviewer-report",template:r("rpmW")})],w);let _=class{constructor(e){this.reviewerreportService=e}resolve(){}};_.ctorParameters=()=>[{type:m}],_=s.a([Object(i.C)()],_);const R=[{path:"",component:w,resolve:{reviewerreports:_}}];let y=class{};y=s.a([Object(i.K)({imports:[o.g.forChild(R)],exports:[o.g]})],y);var f=r("xkgV");r.d(t,"ReviewerReportModule",(function(){return O}));let O=class{};O=s.a([Object(i.K)({imports:[a.b,n.a,y,f.a],providers:[m,_],declarations:[w]})],O)},rpmW:function(e,t){e.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Reviewer Report</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li class="active">Reviewer Report</li>\r\n        </ol> \r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n<section class="box-typical box-typical-padding">\r\n  <h5>Search & Filter</h5>\r\n  <form name="form" (ngSubmit)="search(f.value)" #f="ngForm" novalidate>\r\n    <div class="row">\r\n      <div class="col-md-3">\r\n        <label for="from_date">From Date</label>\r\n        <input type="date" class="form-control" #loanId name="from_date" [(ngModel)]="searchreviewerreport.from_date" #from_date="ngModel">\r\n      </div> \r\n      <div class="col-md-3">\r\n        <label for="to_date">To Date</label>\r\n        <input type="date" class="form-control" name="to_date" [(ngModel)]="searchreviewerreport.to_date" #to_date="ngModel">\r\n      </div>  \r\n      <div class="col-md-3">\r\n        <label for="loan_id">Loan Id</label>\r\n        <input type="number" class="form-control" name="loan_id" [(ngModel)]="searchreviewerreport.loan_id" #loan_id="ngModel">\r\n      </div>  \r\n      <div class="col-md-3">\r\n        <label for="name">Name</label>\r\n        <input type="text" class="form-control" name="name" [(ngModel)]="searchreviewerreport.name" #name="ngModel">\r\n      </div>  \r\n    </div><br> \r\n    <div class="row"> \r\n      <div class="col-md-3">\r\n        <label for="email">Email</label>\r\n        <input type="text" class="form-control" name="email" [(ngModel)]="searchreviewerreport.email" #email="ngModel">\r\n      </div>\r\n      <div class="col-md-3">\r\n        <label for="mobile_no">Mobile Number</label>\r\n        <input type="number" class="form-control" name="mobile_no" [(ngModel)]="searchreviewerreport.mobile_no" #mobile_no="ngModel">\r\n      </div>   \r\n      <div class="col-md-3">\r\n        <label for="id_number">Adhaar Number</label>\r\n        <input type="number" class="form-control" name="id_number" [(ngModel)]="searchreviewerreport.id_number" #id_number="ngModel">\r\n      </div> \r\n      <div class="col-md-3">\r\n        <label for="user_type">User Type</label> \r\n        <select class="form-control" name="user_type" [(ngModel)]="searchreviewerreport.user_type" #user_type="ngModel" required>\r\n          <option [ngValue]="null" disabled>select-user-type</option>\r\n          <option *ngFor="let userType of user_types" [ngValue]="userType.id">{{userType.name}}</option>\r\n        </select>\r\n      </div>  \r\n    </div><br>\r\n    <div class="row">\r\n      <div class="col-md-3">\r\n        <label for="tenure">Tenure</label> \r\n        <input type="text" class="form-control" name="tenure" [(ngModel)]="searchreviewerreport.tenure" #tenure="ngModel"/>\r\n      </div>   \r\n      <div class="col-md-3">\r\n        <label for="amount">Amount</label>\r\n        <select class="form-control" name="amount" [(ngModel)]="searchreviewerreport.amount" #amount="ngModel" required>\r\n          <option [ngValue]="null" disabled>select-tenure</option>\r\n          <option *ngFor="let amount of amounts" [ngValue]="amount.amount">{{amount.amount}}</option>\r\n        </select>\r\n      </div> \r\n      <div class="col-md-3">\r\n        <label for="roles">Reviewer</label> \r\n        <select class="form-control" class="form-control" name="reviewer" [(ngModel)]="searchreviewerreport.reviewer" #roles="ngModel" required (change)="onChangeReviewer($event.target.value)">\r\n          <option disabled>Select-Reviewer</option>\r\n          <option value="4">First Reviewer</option>\r\n          <option value="5">Second Reviewer</option>\r\n        </select>\r\n      </div> \r\n      <div class="col-md-3">\r\n        <label for="status">Status</label>\r\n        <select class="form-control" name="status" [(ngModel)]="searchreviewerreport.status" #status="ngModel" required>\r\n          <option disabled>select-status</option>\r\n          <option *ngFor="let stat_us of statusByRole" [value]="stat_us.status_id">{{stat_us.status}}</option>\r\n        </select>\r\n      </div>    \r\n    </div><br>\r\n    <div class="row">\r\n      <div class="col-md-3">\r\n        <label for="assigned_users">Assigned Users</label> \r\n        <select class="form-control" name="assigned_users" [(ngModel)]="searchreviewerreport.assigned_users" #assigned_users="ngModel" required>\r\n          <option disabled>select-users</option>\r\n          <option *ngFor="let user of users" [value]="user.id">{{user.firstname}} {{user.lastname}}</option>\r\n        </select>\r\n      </div>\r\n    </div>\r\n    <div class="row m-t-1">\r\n      <div class="col-md-2 search-button">\r\n        <button class="btn btn-primary" (click) = toggleDisplay()><i class="fa fa-search"></i> Search</button>\r\n      </div> \r\n      <div class="col-md-2 search-button">\r\n        <span (click)="reset()" class="btn btn-warning" title="Reset Filter">Reset Filter</span> \r\n      </div>\r\n      <div class="col-md-7 export-button">\r\n        <span (click)="exportSheet()" class="btn btn-success {{exporting ? \'is-disabled blink\' : \'\'}} {{isLoading? \'is-disabled\':\'\'}}" title="Export Report"><i class="fa fa-file-excel-o" aria-hidden="true"></i>{{!exporting ? \'Export Sheet\': \'Please Wait...\'}}</span> \r\n      </div>\r\n    </div>\r\n  </form>\r\n</section>\r\n\x3c!-- Main Content --\x3e\r\n<section class="box-typical box-typical-padding" style="height:720px;">\r\n  <table class="display table table-bordered" cellspacing="0" width="100%">\r\n    <thead>\r\n      <tr> \r\n        <th>Loan Id</th>\r\n        <th>Name</th>\r\n        <th>Mobile No</th>\r\n        <th>Email</th>\r\n        <th>Loan Type</th> \r\n        <th>Loan Amount</th> \r\n        <th>Days</th>\r\n        <th>Apply Date</th> \r\n        <th>Disbursed Date</th> \r\n        <th>Status</th>  \r\n      </tr>\r\n    </thead>\r\n    <tbody [style.height]="isLoading? \'500px\':\'\'" [class]="isLoading ? \'vizzve-loading\': \'\'" >\r\n      <ng-container *ngFor="let reviewerreport of reviewerreports | paginate: { itemsPerPage: limit, currentPage: p, totalItems: total }">\r\n        <tr> \r\n          <td>\r\n            {{ reviewerreport.loan_id }}\r\n          </td>\r\n          <td>\r\n            {{ reviewerreport.appUser && reviewerreport.appUser.username }}\r\n          </td>\r\n          <td>\r\n            {{ reviewerreport.appUser && reviewerreport.appUser.mobile_no }}\r\n          </td>\r\n          <td>\r\n            {{ reviewerreport.appUser && reviewerreport.appUser.email }}\r\n          </td>\r\n          <td *ngIf="reviewerreport.appUser && reviewerreport.appUser.user_type == 0">\r\n            Student\r\n          </td>\r\n          <td *ngIf="reviewerreport.appUser && reviewerreport.appUser.user_type == 1">\r\n            Employment\r\n          </td>\r\n          <td *ngIf="reviewerreport.appUser && reviewerreport.appUser.user_type == 2">\r\n            Business\r\n          </td>\r\n          <td>\r\n            {{ reviewerreport.required_amount }}\r\n          </td>\r\n          <td>\r\n            {{ reviewerreport.days }}\r\n          </td>\r\n          <td>\r\n            {{ reviewerreport.apply_date | date: \'dd-MM-yyyy\' }}\r\n          </td>  \r\n          <td>\r\n            {{ reviewerreport.disbursed_date | date: \'dd-MM-yyyy\' }}\r\n          </td>\r\n          <td>\r\n            {{ reviewerreport.loanStatus && reviewerreport.loanStatus.status}} \r\n          </td>   \r\n        </tr>\r\n      </ng-container>\r\n      <tr *ngIf="!reviewerreports.length">\r\n        <td colspan="11" class="text-center">No records.</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n  <div *ngIf="total> 10" class="pagination pagination-sm m-2 float-right {{isLoading ? \'is-disabled\': \'\'}}">\r\n    <pagination-controls (pageChange)="getPage($event)"></pagination-controls>\r\n  </div>\r\n</section>'}}]);