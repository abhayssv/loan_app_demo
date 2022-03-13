import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { User } from '../../../models/user';

@Injectable()
export class RepaymentDetailService {
  private requestUrl = environment.requestUrl + '/api/apply_loan'; // URL to Web API
  private RepaymentDetail: any;
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getRepaymentDetails(offset, limit):Observable<User>{
    return this.http.get(environment.requestUrl + '/api/payment/payment_detail?offset='+offset+'&limit='+limit).pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('RepaymentDetail'))
    );
  }
  public searchrepaymentdetail = {
    "loan_id" : "",
    "name" : "",
    "mobile_no" : "",
    "email" : "",
    "from_date":"",
    "to_date":"",
    "status":"",
    "payment_method":"",
    "trans_id":"",
    "order_id":"",
    "id_number":"" 
  };
  searchLoan(value, limit, offset):Observable<User>{ 
    const {loan_id, email, mobile_no, name, from_date, to_date, status, payment_method, trans_id, order_id, id_number } = value; 
    return this.http.get(environment.requestUrl + '/api/payment/search_payment?loan_id='+ loan_id+'&email='+email+'&mobile_no='+mobile_no+'&name='+name+'&from_date='+from_date+'&to_date='+to_date+'&status='+status+'&payment_method='+payment_method+'&trans_id='+trans_id+'&order_id='+order_id+'&id_number='+id_number+'&limit='+limit+'&offset='+offset).pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('RepaymentDetail'))
    );
  } 
 
  getRepaymentDetailView(user_id: string): Observable<User>{
    return this.http.get(environment.requestUrl + '/api/user/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('RepaymentDetail'))
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

  createRepaymentLink(createRepaymentLink): Observable<User>{  
    return this.http.post(environment.requestUrl + '/api/payment/generate_payment_link' , { orderId:createRepaymentLink }, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('RepaymentDetail'))
    );
  }
 
  deleteRepaymentDetail(user_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {user_id:user_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('RepaymentDetail'))
    )
  }

  // Get Basic Information of App RepaymentDetail....
  getBasicInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/basic_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('RepaymentDetail'))
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

  // Get Emp Information of App RepaymentDetail....
  getEmpInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/emp_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('RepaymentDetail'))
    );
  }

  // Get Bank Information of App RepaymentDetail....
  getBankInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/bank/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('RepaymentDetail'))
    );
  }

  // Get KYC Information of App RepaymentDetail....
  getKycInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/kyc/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('RepaymentDetail'))
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

  // Get Status of App User....
  getStatus(): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/apply_loan/status' , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
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

