import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { userLocationRestriction } from '../../../models/userLocationRestriction';

@Injectable()
export class LocationRestrictionService {
  private requestUrl = environment.requestUrl + '/api/user_limit'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getLocationRestrictions():Observable<userLocationRestriction>{
    return this.http.get(environment.requestUrl + '/api/permission/location/restriction').pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('LocationRestriction'))
    );
  }
  
  getStateList():Observable<userLocationRestriction>{
    return this.http.get(environment.requestUrl + '/api/permission/state/get_state_list').pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('LocationRestriction'))
    );
  }

  getCityList(state_id:number): Observable<userLocationRestriction>{ 
    console.log("StateID",state_id);
    
    return this.http.get(environment.requestUrl + '/api/permission/city/get_city_list/' + state_id, this.httpOptions).pipe(
      tap((res :any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('LocationRestriction'))
    );
  }
  
  // getLocationRestriction(id: string): Observable<userLocationRestriction>{ 
  //   return this.http.get(this.requestUrl + '/' + id, this.httpOptions).pipe(
  //     tap((res :any)=>{  
  //       this.handleResponse(res);
  //     }),
  //     catchError(this.handleError<any>('LocationRestriction'))
  //   );
  // }

  // getLocationRestrictionView(id: string): Observable<userLocationRestriction>{ 
  //   return this.http.get(this.requestUrl + '/' + id, this.httpOptions).pipe(
  //     tap((res :any)=>{
  //       this.handleResponse(res);
  //     }),
  //     catchError(this.handleError<any>('LocationRestriction'))
  //   );
  // } 

  saveLocationRestriction(formData):Observable<userLocationRestriction>{  
    return this.http.post(environment.requestUrl + '/api/permission/save/location_restriction/', formData , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('LocationRestriction'))
    );
  }
 
  deleteLocationRestriction(id:number):Observable<{}> { 
    return this.http.post(environment.requestUrl + '/api/permission/delete/location_restriction/', {id:id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('LocationRestriction'))
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

