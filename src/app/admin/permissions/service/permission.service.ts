import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { Permissions } from '../../../models/permissions';

@Injectable()
export class PermissionService {
  interval(arg0: number) {
    throw new Error('Method not implemented.');
  }
  private requestUrl = environment.requestUrl + '/api/permission'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getPermissions():Observable<Permissions>{
    return this.http.get(this.requestUrl + '/all').pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Permission'))
    );
  }

  getPermission(id: string): Observable<Permissions>{ 
    return this.http.get(this.requestUrl + '/' + id, this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Permission'))
    );
  }

  getPermissionView(id: string): Observable<Permissions>{ 
    return this.http.get(this.requestUrl + '/' + id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Permission'))
    );
  } 

  savePermission(permission):Observable<Permissions>{ 
    return this.http.post(this.requestUrl + '/save_permission', permission , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Permission'))
    );
  }
 
  deletePermission(id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {id:id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Permission'))
    )
  } 

  // checkPerdmission():Observable<Permissions>{  
  //   return this.http.get(this.requestUrl + '/check_permissions',  this.httpOptions).pipe(
  //     tap((res :any)=>{
  //       this.handleResponse(res);
  //     }),
  //     catchError(this.handleError<any>('Permission'))
  //   );
  // }

  checkPermission():Observable<Permissions>{
    return this.http.get(this.requestUrl + '/get_permissions').pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Permission'))
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

