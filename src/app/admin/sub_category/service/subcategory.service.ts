import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { SubCategory } from '../../../models/subcategory';

@Injectable()
export class SubCategoryService {
  private requestUrl = environment.requestUrl + '/api/subcategory'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getsSubCategory():Observable<SubCategory>{
    return this.http.get(this.requestUrl + '/all').pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('SubCategory'))
    );
  }

  getSubCategory(subcategory_id: string): Observable<SubCategory>{ 
    return this.http.get(this.requestUrl + '/' + subcategory_id, this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('SubCategory'))
    );
  }

  getSubCategoryView(subcategory_id: string): Observable<SubCategory>{ 
    return this.http.get(this.requestUrl + '/' + subcategory_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('SubCategory'))
    );
  } 

  saveSubCategory(value):Observable<SubCategory>{ 
    return this.http.post(this.requestUrl + '/save_subcategory', value, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res); 
      }),
      catchError(this.handleError<any>('SubCategory'))
    );
  }
  
 
  deleteSubCategory(subcategory_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {id:subcategory_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('SubCategory'))
    )
  }

  // Get User Category...
  getUserCategory():Observable<SubCategory>{
    return this.http.get(environment.requestUrl + '/api/category/all').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('SubCategory'))
    );
  }
  // Get User Sub Category Permission...
  getSubCategoryPermission():Observable<SubCategory>{
    return this.http.get(environment.requestUrl + '/api/permission/all').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('SubCategory'))
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

