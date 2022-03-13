import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';


@Injectable()
export class ExtensionDealService {
	 private requestUrl = environment.requestUrl + '/api/system_report'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };

	constructor(private http:HttpClient, private alertService: AlertService) { }

	saveExtensionDeal(param:any){  
    return this.http.post(this.requestUrl + '/add_extension_deal', param , this.httpOptions).pipe(
      tap((res :any)=>{
         this.handleResponse(res);
      }),
       catchError(this.handleError<any>('ExtensionDeal'))
    );
  }

  allExtensionDeal(){  
    return this.http.get(this.requestUrl + '/all_extension_deal' , this.httpOptions).pipe(
      tap((res :any)=>{
         this.handleResponse(res);
      }),
       catchError(this.handleError<any>('ExtensionDeal'))
    );
  }

  deleteExtensionDeal(id:number){  
    return this.http.delete(this.requestUrl + '/delete_extension_deal?id='+id, this.httpOptions).pipe(
      tap((res :any)=>{
         this.handleResponse(res);
      }),
       catchError(this.handleError<any>('ExtensionDeal'))
    );
  }

  updateExtensionDealStatus(param:any){  
    return this.http.put(this.requestUrl + '/update_status_extension_deal',param , this.httpOptions).pipe(
      tap((res :any)=>{
         this.handleResponse(res);
      }),
       catchError(this.handleError<any>('ExtensionDeal'))
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




