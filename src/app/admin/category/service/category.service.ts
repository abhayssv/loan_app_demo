import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { Category } from '../../../models/category';

@Injectable()
export class CategoryService {
  private requestUrl = environment.requestUrl + '/api/category'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getsCategory():Observable<Category>{
    return this.http.get(this.requestUrl + '/all').pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Category'))
    );
  }

  getCategory(category_id: string): Observable<Category>{ 
    return this.http.get(this.requestUrl + '/' + category_id, this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Category'))
    );
  }

  getCategoryView(category_id: string): Observable<Category>{ 
    return this.http.get(this.requestUrl + '/' + category_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Category'))
    );
  } 

  saveCategory(category):Observable<Category>{ 
    return this.http.post(this.requestUrl + '/save_category', category , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Category'))
    );
  }
 
  deleteCategory(category_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {id:category_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Category'))
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

