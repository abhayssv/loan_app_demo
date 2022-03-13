import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { User } from '../../../models/user';

@Injectable()
export class SecondreviewService {
  private requestUrl = environment.requestUrl + '/api/apply_loan'; // URL to Web API
  private Secondreview: any;
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getSecondreviews(limit:number, offset: number):Observable<User>{
    return this.http.get(`${this.requestUrl}/get_all/second_reviewer_loan/${limit}/${offset}`).pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Secondreview'))
    );
  }

  searchSecondReviewerLoans(limit:number, offset: number, searchObj: object):Observable<User>{ 
    
    return this.http.post(`${environment.requestUrl}/api/system_report/second_reviewer/search_second_reviewer_loans/${limit}/${offset}`, searchObj).pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Secondreview'))
    );
  } 
 
  getSecondreviewView(user_id: string): Observable<User>{
    return this.http.get(environment.requestUrl + '/api/user/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Secondreview'))
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

  changeStatus(status:number, loan_id: string, key: string, changeStatus, customerDetail, trans_id): Observable<User>{  
    return this.http.post(this.requestUrl + '/disbursal_status' , { status: status ,apply_loan_id: loan_id ,key: key, changeStatus, customerDetail, transfer_id:trans_id }, this.httpOptions).pipe(
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

  getUsers():Observable<User>{
    return this.http.get(environment.requestUrl + '/admin/user/all').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
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
 
  deleteSecondreview(user_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {user_id:user_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Secondreview'))
    )
  }

  // Get Basic Information of App Secondreview....
  getBasicInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/basic_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Secondreview'))
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

  // Get Emp Information of App Secondreview....
  getEmpInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/emp_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Secondreview'))
    );
  }

  // Get Bank Information of App Secondreview....
  getBankInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/bank/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Secondreview'))
    );
  }

  // Get KYC Information of App Secondreview....
  getKycInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/kyc/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Secondreview'))
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

  // Get App List Details of App Firstreview....
  getAppListDetails(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/app_list/get_details/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Firstreview'))
    );
  }
  // Adhaar API
  // getAdhaarDetails(aadhar_no:string, customer_id:string):Observable<{}> { 
  //   return this.http.post(environment.requestUrl + `/api/profile/kyc/adhaar/get_adhaar_details`, {adhaarNumber:aadhar_no, customer_id:customer_id}, this.httpOptions).pipe(
  //     tap((res :any)=>{
  //       this.handleResponse(res);
  //     }),
  //     catchError(this.handleError<any>('Firstreview'))
  //   )
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

  // generateClientId(aadhar_no:string):Observable<{}> {
  //   const adhaarObj = {
  //     "type": "aadhaar_validation",
  //     "body": {
  //       "id_number":  aadhar_no
  //     }
  //   } 
  //   return this.http.post(`https://kyc-api.aadhaarkyc.io/api/v1/async/submit`, adhaarObj , this.httpOptions).pipe(
  //     tap((res :any)=>{
  //       this.handleResponse(res);
  //     }),
  //     catchError(this.handleError<any>('Secondreview'))
  //   )
  // }

  // Get Second Reviewer....
  getSecondReviewer(): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/admin/user/reviewer/second' , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
      // Get Remarks Details of App User....
  
  getRemarksDetails(loan_id:string): Observable<User>{ 
    return this.http.get(this.requestUrl + '/remark/get_reviewer_remark/'+ loan_id , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Get Status of App User....
  getStatus(): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/apply_loan/status?page=second' , this.httpOptions).pipe(
      tap((res :any)=>{
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

