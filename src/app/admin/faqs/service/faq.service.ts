import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { Faq } from '../../../models/faq';

@Injectable()
export class FaqService {
  private requestUrl = environment.requestUrl + '/api/faq'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getFaqs():Observable<Faq>{
    return this.http.get(this.requestUrl + '/all').pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Faq'))
    );
  }

  getFaq(faq_id: string): Observable<Faq>{ 
    return this.http.get(this.requestUrl + '/' + faq_id, this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Faq'))
    );
  }

  getFaqView(faq_id: string): Observable<Faq>{ 
    return this.http.get(this.requestUrl + '/' + faq_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Faq'))
    );
  } 

  saveFaq(faq):Observable<Faq>{ 
    return this.http.post(this.requestUrl + '/save_faq', faq , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Faq'))
    );
  }
 
  deleteFaq(faq_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {faq_id:faq_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Faq'))
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

