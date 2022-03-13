import {  Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from './../admin/_alert/alert.service';
import { environment } from '../../environments/environment';

@Injectable()
export class CommonService {
  private reminderUrl = environment.requestUrl + '/api/system_report';

  constructor(private http: HttpClient, private alertService:AlertService ) {
  }

  getReminderNotification(): Observable<any> {
     return this.http.get(this.reminderUrl + '/get_reminder').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Reminder'))
    );
  }


  doneReminder(id) {
     return this.http.put(this.reminderUrl + '/done_reminder', {id}).pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Reminder'))
    );
  };

   private handleResponse(res) {
      return res;
  }

    private handleError<T>(operation = 'operation' , result?: T){
      return (error:any): Observable<T> => {
        this.alertService.error(`${operation} failed: ${error.message}`);
        return of(result as T);
     }
  }
}