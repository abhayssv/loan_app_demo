import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { User } from '../../../models/user';

@Injectable()
export class CashFlattingService {
  // getUsers() {
  //   throw new Error('Method not implemented.');
  // }
  private requestUrl = environment.requestUrl + '/api/apply_loan'; // URL to Web API
  private CashFlatting: any;
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getCashFlattings():Observable<User>{
    return this.http.get(this.requestUrl + '/flat').pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }

  employeeFlat(value):Observable<any>{
    const param = {tx_time: value.date, order_amount: (value.value || 0) ,penality:(value.penality||0), loan_id:value.loan_id}
    return this.http.post(environment.requestUrl + '/apis/payment/empl_installment_flat', param).pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }

  searchLoan(value):Observable<User>{ 
    const {loan_id, email, mobile_no, name, id_number } = value;
    return this.http.get(this.requestUrl + '/search_flat?loan_id='+ loan_id+'&email='+email+'&mobile_no='+mobile_no+'&name='+name+'&id_number='+id_number).pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  } 
 
  getCashFlattingView(user_id: string): Observable<User>{
    return this.http.get(environment.requestUrl + '/api/user/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }

  getDetailByLoanId(loan_id: string): Observable<User>{
    return this.http.get(environment.requestUrl + '/apis/user/get_detail_by_loan_id/' + loan_id, this.httpOptions).pipe(
      tap((res :any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }

  getTransactionsByLoanId(loanId):Observable<User>{
    return this.http.post(environment.requestUrl + '/api/assign_loan/get_transactions_by_loan_id', { loanId }).pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }

  getEmployTransactions(loanId):Observable<any>{
    return this.http.post(environment.requestUrl + '/apis/apply_loan/get_transactions/by_loan_id', { loanId }).pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }
  saveBusinessCredit():Observable<User>{ 
    return this.http.post(environment.requestUrl + '/apis/credit/save_business_credit', { level: 0} ,this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }

  saveFlatBusiness(flat):Observable<User>{ 
    return this.http.post(environment.requestUrl + '/api/payment/flat_installment_flat', flat , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }
  getLoanHistory(customer_id:string):Observable<any>{
    return this.http.get(environment.requestUrl + '/api/apply_loan/customer/loan_history/'+ customer_id).pipe(
      tap((res: any)=>{
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

  // changeStatus(status:number, user_id: number, key: string): Observable<User>{  
  //   return this.http.post(this.requestUrl + '/status' , { status: status ,apply_loan_id: user_id ,key: key}, this.httpOptions).pipe(
  //     tap((res:any)=>{
  //       this.handleResponse(res);
  //     }),
  //     catchError(this.handleError<any>('CashFlatting'))
  //   );
  // }

  getUsers():Observable<User>{
    return this.http.get(environment.requestUrl + '/admin/user/all').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
 

  saveFlat(flat):Observable<User>{ 
    return this.http.post(environment.requestUrl + '/api/payment/flat_save', flat , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }
  saveExtend(flat):Observable<User>{ 
    return this.http.post(environment.requestUrl + '/api/payment/extend_save', flat , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }

  createRepaymentLink(formValue): Observable<User>{  
    return this.http.post(environment.requestUrl + '/apis/payment/generate_payment_links' , formValue, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('RepaymentDetail'))
    );
  }

  saveCustomExtend(customExtend):Observable<User>{ 
    return this.http.post(environment.requestUrl + '/api/payment/custom_extend_save', customExtend , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }
 
  deleteCashFlatting(user_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {user_id:user_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    )
  }

  // Get Basic Information of App CashFlatting....
  getBasicInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/basic_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
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

  // Get Emp Information of App CashFlatting....
  getEmpInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/emp_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }

  // Get Bank Information of App CashFlatting....
  getBankInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/bank/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
    );
  }

  // Get KYC Information of App CashFlatting....
  getKycInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/kyc/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CashFlatting'))
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

