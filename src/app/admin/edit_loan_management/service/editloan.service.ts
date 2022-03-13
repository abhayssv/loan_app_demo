import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { EditLoan } from '../../../models/editloan';

@Injectable()
export class EditLoanService {
  private requestUrl = environment.requestUrl + '/apis/apply_loan'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getsEditLoan():Observable<EditLoan>{
    return this.http.get(this.requestUrl + '/all').pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('EditLoan'))
    );
  }

  getEditLoan(loan_id: string): Observable<EditLoan>{ 
    console.log(222222, loan_id);
    
    return this.http.get(this.requestUrl + '/edit_loan/get_search_loans/' + loan_id, this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('EditLoan'))
    );
  }

  getEditLoanView(loan_id: string, user_id: string): Observable<EditLoan>{ 
    return this.http.get(this.requestUrl + '/edit_loan/get_edit_loan/' + loan_id + '/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('EditLoan'))
    );
  } 

  saveEditLoan(value):Observable<EditLoan>{ 
    return this.http.post(this.requestUrl + '/edit_loan/save_editloan', value, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res); 
      }),
      catchError(this.handleError<any>('EditLoan'))
    );
  }
  
 
  deleteEditLoan(editloan_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {id:editloan_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('EditLoan'))
    )
  }

  // Get EditLoan...
  getUserEditLoan():Observable<EditLoan>{
    return this.http.get(environment.requestUrl + '/api/editloan/all').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('EditLoan'))
    );
  }
  // Get EditLoan Permission...
  getEditLoanPermission():Observable<EditLoan>{
    return this.http.get(environment.requestUrl + '/api/permission/all').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('EditLoan'))
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

