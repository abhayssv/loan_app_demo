import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';

@Injectable()
export class SettingsService {

  private requestUrl = environment.requestUrl + '/api/user';


  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };

  constructor(private http:HttpClient, private alertService: AlertService) { }

  getSettings() {
     return this.http.get(this.requestUrl + '/settings/all').pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('settings'))
    );
  }

  changeAadarVerificationBtn(params) {
     return this.http.post(this.requestUrl + '/switch_aadar_verification', params).pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Setting'))
    );
  }

  changePanVerificationBtn(params) {
     return this.http.post(this.requestUrl + '/switch_aadar_verification', params).pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Setting'))
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

