import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { adminUser } from '../../../models/adminUser';

@Injectable()
export class AdminUsersService {
  private requestUrl = environment.requestUrl + '/admin/user'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getUsers():Observable<adminUser>{
    return this.http.get(this.requestUrl + '/all').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  getUser(user_id: string): Observable<adminUser>{
    return this.http.get(this.requestUrl + '/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  
  getUserView(user_id: string): Observable<adminUser>{
    return this.http.get(this.requestUrl + '/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  changeStatus(status:boolean, user_id: number, key: string): Observable<adminUser>{ 
    return this.http.post(this.requestUrl + '/status' , { status: status ,user_id: user_id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  
  changeContactListPermission(status:boolean, user_id: number, key: string): Observable<adminUser>{ 
    return this.http.post(this.requestUrl + '/contact_list_permission' , { status: status ,user_id: user_id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  saveUser(user):Observable<adminUser>{
    return this.http.post(this.requestUrl + '/save_user', user ).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  
  searchLoan(value):Observable<adminUser>{
    const {name, email, mobile_no, user_type, user_role, user_status } = value; 
    return this.http.get(this.requestUrl + '/search/users?name='+name+'&email='+email+ '&mobile_no='+mobile_no+'&user_type='+user_type+'&user_role='+user_role+'&user_status='+user_status).pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
 
  deleteUser(user_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {user_id:user_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    )
  }
  // Get User Category...
  getUserCategory():Observable<adminUser>{
    return this.http.get(environment.requestUrl + '/api/category/all').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  // Get All User Sub Category...
  getAllUserSubCategory():Observable<adminUser>{
    return this.http.get(environment.requestUrl + '/api/subcategory/all').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  // Get User Sub Category by Category Id...
  getUserSubCategory(cat_id: string): Observable<adminUser>{
    return this.http.get(environment.requestUrl + '/api/allSubCategory/' + cat_id, this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  getUserRole(): Observable<adminUser>{
    return this.http.get(environment.requestUrl + '/api/get_roles/', this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
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

