import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { AlertService } from './../_alert/alert.service';

@Injectable()

export class UservideoService {

  private requestUrl = environment.requestUrl + '/apis/video'; 

  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };

  constructor(private http:HttpClient, private alertService: AlertService) {
  }


  getVideoByUserId(userId: Number): Observable<any>{
    return this.http.get(`${this.requestUrl}/${userId}`, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Customer'))
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