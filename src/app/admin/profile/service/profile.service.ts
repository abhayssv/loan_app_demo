import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert';
import { Profile } from '../../../models/profile';

@Injectable()
export class ProfileService {
  private requestUrl = environment.requestUrl + '/admin/profile';  // URL to web API
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
  };
  constructor(private http: HttpClient, private alertService: AlertService) { }

  getProfile(): Observable<Profile> {
    return this.http.get(this.requestUrl).pipe(
      tap((res: any) => {
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Profile'))
    );
  }

  saveProfile(profile): Observable<Profile> {  
    return this.http.post(this.requestUrl, profile).pipe(
      tap((res: any) => {
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Profile'))
    );
  }

  removeProfileImage(): Observable<Profile> {
    return this.http.delete(this.requestUrl).pipe(
      tap((res: any) => {
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Profile'))
    );
  }
  private handleResponse(res) {
    if (res.error) {
      this.alertService.warn(`Failed: ${res.message}`);
    } else {
      this.alertService.success(`Success: ${res.message}`);
    }
    return res;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
} 