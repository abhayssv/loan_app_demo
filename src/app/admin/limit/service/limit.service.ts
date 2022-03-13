import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { userLimit } from '../../../models/userLimit';

@Injectable()
export class LimitService {
  private requestUrl = environment.requestUrl + '/api/user_limit'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getLimits():Observable<userLimit>{
    return this.http.get(this.requestUrl + '/all').pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Limit'))
    );
  }

  getLimit(id: string): Observable<userLimit>{ 
    return this.http.get(this.requestUrl + '/' + id, this.httpOptions).pipe(
      tap((res :any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Limit'))
    );
  }

  getLimitView(id: string): Observable<userLimit>{ 
    return this.http.get(this.requestUrl + '/' + id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Limit'))
    );
  } 

  saveLimit(limit):Observable<userLimit>{  
    return this.http.post(this.requestUrl + '/save_user_limit', limit , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Limit'))
    );
  }
 
  deleteLimit(id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {id:id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Limit'))
    )
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

