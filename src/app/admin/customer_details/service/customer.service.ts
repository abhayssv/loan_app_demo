import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { User } from '../../../models/user';

@Injectable()
export class CustomerService {
  private requestUrl = environment.requestUrl + '/api/apply_loan'; // URL to Web API
  private Customer: any;
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  
  constructor(private http:HttpClient, private alertService: AlertService) { } 

  getCustomers(offset: number, limit: number){
    return this.http.get(this.requestUrl + '/customer_details/get_all_loan/'+offset+'/'+limit).pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Customer'))
    );
  }

 getSettings() {
     return this.http.get(`${environment.requestUrl}/api/user/settings/all`).pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('settings'))
    );
  }
   

  getAgreementPdfData(loan_id: string): Observable<User>{ 
    return this.http.post(this.requestUrl + '/loan_agreement_by_loan_id' , { loan_id: loan_id }, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Customer'))
    );
  } 
 
  searchLoan(value, offset, limit):Observable<User>{ 
    const {from_date, to_date, loan_id, name, email, mobile_no, user_type, tenure, status, amount, id_number, reviewer, assigner} = value; 
    return this.http.get(environment.requestUrl + '/api/system_report/customer_details/search_loan_by_date?from_date='+ from_date+'&to_date='+to_date+'&loan_id='+loan_id+'&name='+name+'&email='+email+'&mobile_no='+mobile_no+'&user_type='+user_type+'&tenure='+tenure+'&status='+status+'&amount='+amount+'&id_number='+id_number+'&reviewer='+reviewer+'&assigner='+assigner+'&offset='+offset+'&limit='+limit).pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Firstreview'))
    );
  } 
 
  getCustomerView(user_id: string): Observable<User>{
    return this.http.get(environment.requestUrl + '/api/user/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Customer'))
    );
  }

  getReviewerRemarksDetails(loan_id:string): Observable<User>{ 
    return this.http.get(this.requestUrl + '/remark/get_reviewer_remark/'+ loan_id , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  getCollectionRemarksDetails(loan_id:string): Observable<User>{ 
    return this.http.get(this.requestUrl + '/remark/get_collection_remark/'+ loan_id , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  getContactDetails(user_id: string): Observable<User>{
    return this.http.get(environment.requestUrl + '/apis/contact/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  getApplyLoanDetails(loan_id: string, user_id: string): Observable<User>{
    return this.http.get(this.requestUrl+'/'+loan_id+'/'+ user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Firstreview'))
    );
  }
// Change loan Disbursed and Reject Status
  changeStatus(status:boolean, loan_id: string, key: string, changeStatus, customerDetail, reason: String): Observable<User>{ 
    return this.http.post(this.requestUrl + '/disbursal_status' , { status: status ,apply_loan_id: loan_id ,key: key, changeStatus, customerDetail, reason}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Customer'))
    );
  }
// Change loan Banned Status
  changeBannedStatus(status:boolean, loan_id: string, user_id: string, user_status:string): Observable<User>{ 
    return this.http.post(this.requestUrl + '/banned_status' , { status: status ,apply_loan_id: loan_id ,user_id: user_id, user_status:user_status }, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Customer'))
    );
  }

// Change loan UnBanned Status
  changeUnBannedStatus(status:boolean, loan_id: string, user_id: string, user_status:string): Observable<User>{ 
    return this.http.post(this.requestUrl + '/unbanned_status' , { status: status ,apply_loan_id: loan_id ,user_id: user_id, user_status:user_status }, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Customer'))
    );
  }
  
  getUsers():Observable<User>{
    return this.http.get(environment.requestUrl + '/admin/user/all').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  getStatus():Observable<User>{
    return this.http.get(environment.requestUrl + '/api/apply_loan/status').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  

  getLoanHistory(customer_id:string):Observable<User>{
    return this.http.get(environment.requestUrl + '/api/apply_loan/customer/loan_history/'+ customer_id).pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Get Reviewer
  
  getReviewer():Observable<User>{
    return this.http.get(environment.requestUrl + '/api/system_report/get/reviewers?page=customer_details').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Get Reviewer
  
  getAssignerList():Observable<User>{
    return this.http.get(environment.requestUrl + '/api/system_report/get/reviewer_assigner?page=customer_details').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  // getClientId(aadhar_no): Observable<User>{ 
  //   // console.log("Service Adhaar No",aadhar_no); 
  //   let dataObj = {
  //     "type": "aadhaar_validation",
  //     "body": {
  //       "id_number":  aadhar_no
  //     }
  //   } 
  //   return this.http.post('https://kyc-api.aadhaarkyc.io/api/v1/async/submit' , dataObj, this.httpOptions).pipe(   
  //   tap((res:any)=>{  
  //       this.handleResponse(res);
  //     }),
  //     catchError(this.handleError<any>('Customer'))
  //   );
  // }

  // getAadharDetail(clientId): Observable<User>{ 
  //   // console.log("Client:",clientId);  
  //   return this.http.get('https://kyc-api.aadhaarkyc.io/api/v1/async/status/' + clientId, this.httpOptions).pipe(   
  //   tap((res:any)=>{
  //     console.log("Service:",res); 
  //       this.handleResponse(res);
  //     }),
  //     catchError(this.handleError<any>('Customer'))
  //   );
  // }

  // Adhaar API
  adhaarValidation(aadhar_no:string, customer_id:string):Observable<{}> { 
    return this.http.post(environment.requestUrl + `/api/profile/kyc/adhaar/get_adhaar_details`, {adhaarNumber:aadhar_no, customer_id:customer_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Firstreview'))
    )
  }

  panValidation(pan_no:string, customer_id:string):Observable<{}> { 
    return this.http.post(environment.requestUrl + `/api/profile/kyc/pan/get_pan_details`, {pan_no, customer_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Firstreview'))
    )
  }
 
  disburseMoney(beneficiaryId,reqAmount,trans_id): Observable<User>{  
    return this.http.post(environment.requestUrl + '/api/payment/disburse_amount' , {beneficiaryId:beneficiaryId, amount:reqAmount, transferId:trans_id}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Secondreview'))
    );
  }

  addBeneficiary(user_id): Observable<User>{   
    return this.http.post(environment.requestUrl + '/api/payment/create_benificiary' , {user_id:user_id}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Secondreview'))
    );
  }

  changeStatusPending(loan_id: string, trans_id:string): Observable<User>{  
    return this.http.post(this.requestUrl + '/pending_status' , { apply_loan_id: loan_id, transfer_id:trans_id }, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Secondreview'))
    );
  }

  submitReview(value,loan_id:string): Observable<User>{ 
    return this.http.post(this.requestUrl + '/remark/submit_remark' , {remark:value.remark,loan_id:loan_id}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Firstreview'))
    );
  }
  
  deleteCustomer(user_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {user_id:user_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Customer'))
    )
  }

  // Get Basic Information of App Customer....
  getBasicInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/basic_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Customer'))
    );
  }
  // Get Reference Information of App User....
  getRefInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/ref/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  // Get Emp Information of App Customer....
  getEmpInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/emp_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Customer'))
    );
  }

  // Get Bank Information of App Customer....
  getBankInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/bank/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Customer'))
    );
  }

  // Get KYC Information of App Customer....
  getKycInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/kyc/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Customer'))
    );
  }

  // Get Business Details of App User....
  getBusinessDetails(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/business/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Get College Details of App User....
  getCollegeDetails(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/college/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  } 

  // Adhaar API
  getAdhaarDetails(aadhar_no:string, customer_id:string):Observable<{}> { 
    return this.http.post(environment.requestUrl + `/api/profile/kyc/adhaar/get_adhaar_details`, {adhaarNumber:aadhar_no, customer_id:customer_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Firstreview'))
    )
  }

  // Get App List Details of App Firstreview....
  getAppListDetails(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/app_list/get_details/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  private handleResponse(res){
    if(res.error){
      this.alertService.warn(`Failed: ${res.message}`);
    } else {
      this.alertService.success(`Success:${res.message}`);
    }
      return res;
    }

    private handleError<T>(operation = 'operation' , result?: T){
      return (error:any): Observable<T> => {
        this.alertService.error(`${operation} failed: ${error.message}`);
        return of(result as T);
     }
  }
}

