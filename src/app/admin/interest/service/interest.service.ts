import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { Interest } from '../../../models/interest';

@Injectable()
export class InterestService {
  private requestUrl = environment.requestUrl + '/api/interest_penality'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getInterests():Observable<Interest>{
    return this.http.get(this.requestUrl + '/all').pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Interest'))
    );
  }

  getInterest(id: string): Observable<Interest>{ 
    return this.http.get(this.requestUrl + '/' + id, this.httpOptions).pipe(
      tap((res :any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Interest'))
    );
  }

  getInterestView(id: string): Observable<Interest>{ 
    return this.http.get(this.requestUrl + '/' + id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Interest'))
    );
  } 

  saveInterest(interest):Observable<Interest>{  
    return this.http.post(this.requestUrl + '/save_interest_penality', interest , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Interest'))
    );
  }
 
  deleteInterest(id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {id:id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Interest'))
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

