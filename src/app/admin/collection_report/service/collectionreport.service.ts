import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { User } from '../../../models/user';

@Injectable()
export class CollectionReportService {
  private requestUrl = environment.requestUrl + '/api/apply_loan'; // URL to Web API
  private CollectionReport: any;
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getCollectionReports():Observable<User>{
    return this.http.get(environment.requestUrl + '/api/system_report/collection/get_collections').pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionReport'))
    );
  } 
  
  getCollectionLoanReport(offset: number, limit: number){
    return this.http.get(environment.requestUrl + '/api/system_report/collection/get_collections_report/'+offset+'/'+limit).pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('OverallCollection'))
    );
  }

  getCollectionReport(value, offset, limit, isExport):Observable<User>{ 
    const {from_date, to_date, collection_team, assigned_users, loan_id, name, mobile_no, email, amount, id_number, tenure, user_type } = value; 
    return this.http.get(environment.requestUrl + '/api/system_report/collection/get_reports?from_date='+ from_date+'&to_date='+to_date+'&collection_team='+collection_team+'&assigned_users='+assigned_users+'&loan_id='+loan_id+'&name='+name+'&mobile_no='+mobile_no+'&email='+email+'&amount='+amount+'&id_number='+id_number+'&tenure='+tenure+'&user_type='+user_type+'&offset='+offset+'&limit='+limit+'&isExport='+isExport).pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionReport'))
    );
  } 

  getCollectionReportView(user_id: string): Observable<User>{
    return this.http.get(environment.requestUrl + '/api/user/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionReport'))
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
      catchError(this.handleError<any>('CollectionReport'))
    );
  }
  changeStatus(status:boolean, loan_id: string, key: string, email:string ): Observable<User>{ 
    return this.http.post(this.requestUrl + '/status' , { status: status ,apply_loan_id: loan_id ,key: key, email:email }, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionReport'))
    );
  } 
 
  deleteCollectionReport(user_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {user_id:user_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionReport'))
    )
  }

  // Get Basic Information of App CollectionReport....
  getBasicInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/basic_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionReport'))
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

  // Get Emp Information of App CollectionReport....
  getEmpInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/emp_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionReport'))
    );
  }

  // Get Bank Information of App CollectionReport....
  getBankInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/bank/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionReport'))
    );
  }

  // Get KYC Information of App CollectionReport....
  getKycInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/kyc/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionReport'))
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
  
  // Get User of App User....
  getUsers(collection_id): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/system_report/collection/get_users/' + collection_id, this.httpOptions).pipe(
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

