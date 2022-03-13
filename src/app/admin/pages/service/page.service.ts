import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { Page } from '../../../models/page';

@Injectable()
export class PageService {
  private requestUrl = environment.requestUrl + '/api/page'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getPages():Observable<Page>{
    return this.http.get(this.requestUrl + '/all').pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Page'))
    );
  }

  getPage(page_id: string): Observable<Page>{
    return this.http.get(this.requestUrl + '/' + page_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Page'))
    );
  }

  getPageView(page_id: string): Observable<Page>{
    return this.http.get(this.requestUrl + '/' + page_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Page'))
    );
  } 

  savePage(page):Observable<Page>{ 
    return this.http.post(this.requestUrl + '/save_page', page , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Page'))
    );
  }
 
  deletePage(page_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {page_id:page_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Page'))
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

