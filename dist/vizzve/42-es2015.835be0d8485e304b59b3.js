(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{"8V1x":function(e,t,r){"use strict";r.r(t);var s=r("mrSG"),a=r("8Y7J"),i=r("SVse"),n=r("s7LF"),o=r("iInd"),p=r("IheW"),h=r("LRne"),l=r("vkgz"),c=r("JIr8"),d=r("AytR"),v=r("3AtW");let m=class{constructor(e,t){this.http=e,this.alertService=t,this.requestUrl=d.a.requestUrl+"/api/apply_loan",this.httpOptions={headers:new p.d({"content-Type":"application/json;charset=UTF-8"})}}getApproverAchivements(){return this.http.get(d.a.requestUrl+"/apis/system_report/achivement/get_approver_achivement/").pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ApproverAchivement")))}getUsers(e){return this.http.get(d.a.requestUrl+"/api/system_report/collection/get_users/"+e,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("User")))}getApproverAchivement(e){const{from_date:t,to_date:r,collection_team:s,assigned_users:a}=e;return this.http.get(d.a.requestUrl+"/apis/system_report/achivement/get_search_approver_achivement?from_date="+t+"&to_date="+r+"&assigned_users="+a+"&collection_team="+s).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ApproverAchivement")))}exportSheet(e){return this.http.post(d.a.requestUrl+"/api/system_report/reviewer/export_reviewer_sheet",e,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ApproverAchivement")))}getApproverAchivementView(e){return this.http.get(d.a.requestUrl+"/api/user/"+e,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ApproverAchivement")))}getContactDetails(e){return this.http.get(d.a.requestUrl+"/apis/contact/"+e,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("User")))}getApplyLoanDetails(e,t){return this.http.get(this.requestUrl+"/"+e+"/"+t,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ApproverAchivement")))}changeStatus(e,t,r,s){return this.http.post(this.requestUrl+"/status",{status:e,apply_loan_id:t,key:r,email:s},this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ApproverAchivement")))}deleteApproverAchivement(e){return this.http.post(this.requestUrl+"/delete",{user_id:e},this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ApproverAchivement")))}getBasicInfo(e){return this.http.get(d.a.requestUrl+"/api/admin/profile/basic_info/"+e,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ApproverAchivement")))}getRefInfo(e){return this.http.get(d.a.requestUrl+"/api/admin/profile/ref/"+e,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("User")))}getEmpInfo(e){return this.http.get(d.a.requestUrl+"/api/admin/profile/emp_info/"+e,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ApproverAchivement")))}getBankInfo(e){return this.http.get(d.a.requestUrl+"/api/admin/profile/bank/"+e,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ApproverAchivement")))}getKycInfo(e){return this.http.get(d.a.requestUrl+"/api/admin/profile/kyc/"+e,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("ApproverAchivement")))}getBusinessDetails(e){return this.http.get(d.a.requestUrl+"/api/admin/profile/business/"+e,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("User")))}getCollegeDetails(e){return this.http.get(d.a.requestUrl+"/api/admin/profile/college/"+e,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("User")))}getStatus(){return this.http.get(d.a.requestUrl+"/api/apply_loan/status",this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("User")))}getStatusByRole(e){return this.http.get(d.a.requestUrl+"/api/system_report/reviewer/get_status/"+e,this.httpOptions).pipe(Object(l.a)(e=>{this.handleResponse(e)}),Object(c.a)(this.handleError("User")))}handleResponse(e){return e.error?this.alertService.warn("Failed: "+e.message):this.alertService.success("Success:"+e.message),e}handleError(e="operation",t){return r=>(this.alertService.error(`${e} failed: ${r.message}`),Object(h.a)(t))}};m.ctorParameters=()=>[{type:p.b},{type:v.a}],m=s.a([Object(a.C)()],m);var u=r("EApP"),b=r("cUpR"),g=r("QAmw");let _=class{constructor(e,t,r,s,a){this.route=e,this.router=t,this.approverachivementService=r,this.toastr=s,this.titleService=a,this.searchapproverachivement={from_date:"",to_date:"",assigned_users:"",collection_team:""},this.exporting=!1,this.isExport=!1,this.titleService.setTitle("List Approver Achivement")}ngOnInit(){this.approverachivementService.getApproverAchivements().subscribe(e=>{e&&(this.approverachivement=e.data)}),$((function(){$("#lisapproverachivement").DataTable({responsive:!0,order:[]})}))}reset(){let e=this.router.url;this.router.routeReuseStrategy.shouldReuseRoute=()=>!1,this.router.onSameUrlNavigation="reload",this.router.navigate([e])}onChangeCollection(e){e?this.approverachivementService.getUsers(e).subscribe(e=>{this.users=e.data}):this.users=null}search(e){this.approverachivementService.getApproverAchivement(e).subscribe(e=>{e.data&&e.data.length?this.approverachivement=e.data:(this.toastr.error("Record not found.","Error"),this.approverachivement=[])})}getAllDataToExport(){this.exporting=!0,this.approverachivementService.getApproverAchivements().subscribe(e=>{e.data&&e.data.length?(this.exportData=e.data,this.downloadExportedData()):this.toastr.error("Record not found.","Error"),this.exporting=!1})}fieldReset(){this.searchapproverachivement={from_date:"",to_date:"",assigned_users:"",collection_team:""}}downloadExportedData(){var e=[];this.exportData.forEach(t=>{const r=t.appUser||{};e.push({loan_id:t.loan_id,username:r.username||"",mobile_no:r.mobile_no||"",email:r.email||"",user_type:r.user_type?0==r.user_type?"student":"employee":"",required_amount:t.required_amount,disbursed_amount:t.disbursed_amount,remaining_amount:t.remaining_amount,payable_date:t.payable_date,status:t.loanStatus.status,reviewer_1:null!=t.appUserReviewer_1?t.appUserReviewer_1.firstname+t.appUserReviewer_1.lastname:"Not Assigned",reviewer_2:null!=t.appUserReviewer_2?t.appUserReviewer_2.firstname+t.appUserReviewer_2.lastname:"Not Assigned"})});const t=e;new g.ngxCsv(t,"Reviewer Sheet",{fieldSeparator:",",quoteStrings:'"',decimalseparator:".",showLabels:!0,showTitle:!0,title:"Reviewer Sheet",useBom:!0,headers:["Loan Id","Customer Name","Mobile Number","Email","User Type","Required Amount","disbursed_amount","remaining_amount","payable_date","Status","reviewer_1","reviewer_2"]}),this.toastr.success("Successfully Exported.")}exportSheet(){this.isSearching?(this.isExport=!0,this.exporting=!0):this.getAllDataToExport()}};_.ctorParameters=()=>[{type:o.a},{type:o.f},{type:m},{type:u.b},{type:b.c}],_=s.a([Object(a.n)({selector:"list-reviewer-report",template:r("dQAQ")})],_);let f=class{constructor(e){this.approverachivementService=e}resolve(){}};f.ctorParameters=()=>[{type:m}],f=s.a([Object(a.C)()],f);const O=[{path:"",component:_,resolve:{approverachivements:f}}];let A=class{};A=s.a([Object(a.K)({imports:[o.g.forChild(O)],exports:[o.g]})],A);var R=r("xkgV");r.d(t,"ApproverAchivementModule",(function(){return j}));let j=class{};j=s.a([Object(a.K)({imports:[i.b,n.a,A,R.a],providers:[m,f],declarations:[_]})],j)},dQAQ:function(e,t){e.exports='<header class="section-header">\r\n  <div class="tbl">\r\n    <div class="tbl-row">\r\n      <div class="tbl-cell">\r\n        <h3>Approver Achievement Report</h3>\r\n        <ol class="breadcrumb breadcrumb-simple">\r\n          <li><a [routerLink]="[\'/\']">Home</a></li>\r\n          <li class="active">Approver Achievement Report</li>\r\n        </ol> \r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n<section class="box-typical box-typical-padding">\r\n  <h5>Search & Filter</h5>\r\n  <form name="form" (ngSubmit)="search(f.value)" #f="ngForm" novalidate>\r\n    <div class="row">\r\n      <div class="col-md-3">\r\n        <label for="from_date">From Date</label>\r\n        <input type="date" class="form-control" #loanId name="from_date" [(ngModel)]="searchapproverachivement.from_date" #from_date="ngModel">\r\n      </div> \r\n      <div class="col-md-3">\r\n        <label for="to_date">To Date</label>\r\n        <input type="date" class="form-control" name="to_date" [(ngModel)]="searchapproverachivement.to_date" #to_date="ngModel">\r\n      </div>\r\n      <div class="col-md-3">\r\n        <label for="user_type">Collection Team</label> \r\n        <select class="form-control" class="form-control" name="collection_team" [(ngModel)]="searchapproverachivement.collection_team" #collection_team="ngModel" required (change)="onChangeCollection($event.target.value)">\r\n          <option disabled>Select-Team</option>\r\n          <option value="4">First Reviewer</option>\r\n          <option value="5">Second Reviewer</option> \r\n        </select>\r\n      </div>  \r\n      <div class="col-md-3">\r\n        <label for="assigned_users">Assigned Users</label> \r\n        <select class="form-control" name="assigned_users" [(ngModel)]="searchapproverachivement.assigned_users" #assigned_users="ngModel" required>\r\n          <option disabled>select-users</option>\r\n          <option *ngFor="let user of users" [value]="user.id">{{user.firstname}} {{user.lastname}}</option>\r\n        </select>\r\n      </div>\r\n    </div>\r\n    <div class="row m-t-1">\r\n      <div class="col-md-2 search-button">\r\n        <button class="btn btn-primary" (click) = search()><i class="fa fa-search"></i> Search</button>\r\n      </div> \r\n      <div class="col-md-2 search-button">\r\n        <span (click)="reset()" class="btn btn-warning" title="Reset Filter">Reset Filter</span> \r\n      </div>\r\n      \x3c!-- <div class="col-md-7 export-button">\r\n        <span (click)="exportSheet()" class="btn btn-success {{exporting ? \'is-disabled blink\' : \'\'}} {{isLoading? \'is-disabled\':\'\'}}" title="Export Report"><i class="fa fa-file-excel-o" aria-hidden="true"></i>{{!exporting ? \'Export Sheet\': \'Please Wait...\'}}</span> \r\n      </div> --\x3e\r\n    </div>\r\n  </form>\r\n</section>\r\n\x3c!-- Main Content --\x3e\r\n<section class="box-typical box-typical-padding">\r\n  <table class="display table table-bordered" cellspacing="0" width="100%">\r\n    <thead>\r\n      <tr> \r\n        <th>User Name</th>\r\n        <th>User Role</th>\r\n        <th>Email</th>\r\n        <th>Mobile No</th>  \r\n        <th>Assign Loan</th> \r\n        <th>Approved/Disbursed Loan</th>\r\n        <th>Rejected Loan</th>\r\n        <th>User Status</th>  \r\n      </tr>\r\n    </thead>\r\n    <tbody *ngFor="let achivements of approverachivement" [attr.id]="achivements.id">\r\n      <tr> \r\n        <td>\r\n          {{ achivements.username }}\r\n        </td>\r\n        <td>\r\n          {{ achivements.user_role }}\r\n        </td>\r\n        <td>\r\n          {{ achivements.email }}\r\n        </td> \r\n        <td>\r\n          {{ achivements.mobile_no }}\r\n        </td> \r\n        <td>\r\n          {{ achivements.assing_loan }}\r\n        </td>\r\n        <td>\r\n          {{ achivements.approved_loan }}\r\n        </td>\r\n        <td>\r\n          {{ achivements.rejected_loan }}\r\n        </td> \r\n        <td>\r\n          {{ achivements.user_status }}\r\n        </td> \r\n      </tr> \r\n    </tbody>\r\n  </table> \r\n</section>'}}]);