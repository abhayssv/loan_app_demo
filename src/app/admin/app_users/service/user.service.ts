import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { User } from '../../../models/user';

@Injectable()
export class UserService {
  private requestUrl = environment.requestUrl + '/api/user'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getUsers():Observable<User> {
    return this.http.get(this.requestUrl + '/all').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  getUsersCount():Observable<User> {
    return this.http.get(this.requestUrl + '/count').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  getCustomers(offset: number, limit: number){
    return this.http.get(this.requestUrl + '/customer_details/get_all/'+offset+'/'+limit).pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  searchCustomers(value, offset, limit):Observable<User>{ 
    const {from_date, to_date, email, mobile_no, name, user_type, id_number } = value;
    return this.http.get(this.requestUrl + '/customer_details/search?from_date='+ from_date+'&to_date='+to_date+'&email='+email+'&mobile_no='+mobile_no+'&name='+name+'&user_type='+user_type+'&id_number='+id_number+'&limit='+limit+'&offset='+offset).pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  } 

  getLoanCount():Observable<User>{
    return this.http.get(this.requestUrl + '/loan/getLoanCount').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  getUser(user_id: string): Observable<User>{
    return this.http.get(this.requestUrl + '/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  getContactDetails(user_id: string): Observable<User>{
    return this.http.get(environment.requestUrl + '/apis/contact/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  getUserView(user_id: string): Observable<User>{
    return this.http.get(this.requestUrl + '/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  changeStatus(status:boolean, user_id: number, key: string): Observable<User>{ 
    return this.http.post(this.requestUrl + '/status' , { status: status ,user_id: user_id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  changeLevel(level:boolean, user_id: number, key: string): Observable<User>{ 
    return this.http.post(this.requestUrl + '/level' , { level: level ,user_id: user_id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  changeUserType(user_type:boolean, user_id: number, key: string): Observable<User>{ 
    return this.http.post(this.requestUrl + '/user_type' , { user_type: user_type ,user_id: user_id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  saveUser(user):Observable<User>{
    return this.http.post(this.requestUrl + '/save_user', user , this.httpOptions).pipe(
      tap((res :any)=>{
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

  // Get Basic Information of App User....
  getBasicInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/basic_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Get Emp Information of App User....
  getEmpInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/emp_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Get Bank Information of App User....
  getBankInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/bank/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Get KYC Information of App User....
  getKycInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/kyc/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Get Reference Information of App User....
  getRefInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/ref/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Get Business Details of App User....
  getBusinessDetails(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/business/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Get College Details of App User....
  getCollegeDetails(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/college/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  
  // Change Basic Form Status
  changeBasicStatus(status:boolean, user_id: string, key: string): Observable<User>{ 
    return this.http.post(environment.requestUrl + '/api/admin/profile/basic_info/status_update' , { status: status ,user_id: user_id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Change KYC Form Status
  changeKycStatus(status:boolean, user_id: string, key: string): Observable<User>{ 
    return this.http.post(environment.requestUrl + '/api/admin/profile/kyc/status_update' , { status: status ,user_id: user_id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  // Change Bank Detail Form Status
  changeBankStatus(status:boolean, user_id: string, key: string): Observable<User>{ 
    return this.http.post(environment.requestUrl + '/api/admin/profile/bank/status_update' , { status: status ,user_id: user_id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  // Change Reference Information Form Status
  changeRefStatus(status:boolean, user_id: string, key: string): Observable<User>{ 
    return this.http.post(environment.requestUrl + '/api/admin/profile/ref/status_update' , { status: status ,user_id: user_id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  // Change College Detail Form Status
  changeCollegeStatus(status:boolean, user_id: string, key: string): Observable<User>{ 
    return this.http.post(environment.requestUrl + '/api/admin/profile/college/status_update' , { status: status ,user_id: user_id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  // Change Employment Form Status
  changeEmpStatus(status:boolean, user_id: string, key: string): Observable<User>{ 
    return this.http.post(environment.requestUrl + '/api/admin/profile/emp_info/status_update' , { status: status ,user_id: user_id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  // Change Business Details Form Status
  changeBusinessStatus(status:boolean, user_id: string, key: string): Observable<User>{ 
    return this.http.post(environment.requestUrl + '/api/admin/profile/business/status_update' , { status: status ,user_id: user_id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
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

