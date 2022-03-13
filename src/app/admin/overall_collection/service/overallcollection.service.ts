import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { User } from '../../../models/user';

@Injectable()
export class OverallCollectionService {
  private requestUrl = environment.requestUrl + '/api/apply_loan'; // URL to Web API
  private reminderUrl= environment.requestUrl + '/api/system_report';
  private OverallCollection: any;
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  // getOverallCollections():Observable<User>{
  //   return this.http.get(this.requestUrl + '/overall_collection').pipe(
  //     tap((res: any)=>{ 
  //       this.handleResponse(res);
  //     }),
  //     catchError(this.handleError<any>('OverallCollection'))
  //   );
  // }  

  getOverallCollections(offset: number, limit: number){
    return this.http.get(this.requestUrl + '/overall_collection/'+offset+'/'+limit).pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('OverallCollection'))
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

  getTenures():Observable<User>{
    return this.http.get(this.reminderUrl +'/all_tenures').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
    
  searchLoan(value):Observable<User>{ 
    const {loan_id, email, mobile_no, amount, assigned, collection_team, from_date, to_date, id_number, name, overdue_days, tenure, user_type } = value;
    return this.http.get(environment.requestUrl + '/api/system_report/get/search_overall_collection?loan_id='+ loan_id+'&email='+email+'&mobile_no='+mobile_no+'&amount='+amount+'&assigned='+assigned+'&collection_team='+collection_team+'&from_date='+from_date+'&to_date='+to_date+'&id_number='+id_number+'&name='+name+'&overdue_days='+overdue_days+'&tenure='+tenure+'&user_type='+user_type).pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('OverallCollection'))
    );
  }  

  getCollectionTeams():Observable<User>{
    return this.http.get(environment.requestUrl + '/api/system_report/get/collection_teams').pipe(
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

  getAssignerList():Observable<User>{
    return this.http.get(environment.requestUrl + '/api/system_report/get/assigner_list').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
 
  getOverallCollection(user_id: string): Observable<User>{
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

  submitReview(value,loan_id:string): Observable<User>{ 
    return this.http.post(this.requestUrl + '/remark/submit_remark' , {remark:value.remark,loan_id:loan_id}, this.httpOptions).pipe(
      tap((res:any)=>{
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

    // Get Reviewer Remarks Details of App User....
    getReviewerRemarksDetails(loan_id:string): Observable<User>{ 
      return this.http.get(this.requestUrl + '/remark/get_reviewer_remark/'+ loan_id , this.httpOptions).pipe(
        tap((res :any)=>{
          this.handleResponse(res);
        }),
        catchError(this.handleError<any>('User'))
      );
    }
    
    // Get Collection Remarks Details of App User....
    getCollectionRemarksDetails(loan_id:string): Observable<User>{ 
      return this.http.get(this.requestUrl + '/remark/get_collection_remark/'+ loan_id , this.httpOptions).pipe(
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

  // getUsers():Observable<User>{
  //   return this.http.get(environment.requestUrl + '/admin/user/all').pipe(
  //     tap((res: any)=>{
  //       this.handleResponse(res);
  //     }),
  //     catchError(this.handleError<any>('User'))
  //   );
  // }

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

   addReminder(data:any) {
     return this.http.post(this.reminderUrl + '/add_reminder',data).pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AddReminder'))
    );
  }
}

