import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { Contact } from '../../../models/contact';

@Injectable()
export class ContactService {
  private requestUrl = environment.requestUrl + '/apis/contact'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getContacts():Observable<Contact>{
    return this.http.get(this.requestUrl + '/all').pipe( 
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Contact'))
    );
  }

  getContact(user_id: string): Observable<Contact>{
    return this.http.get(this.requestUrl + '/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('contact'))
    );
  }

  getContactView(id: string): Observable<Contact>{
    return this.http.get(this.requestUrl + '/' + id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('contact'))
    );
  }

  changeStatus(status:boolean, id: number, key: string): Observable<Contact>{ 
    return this.http.post(this.requestUrl + '/status' , { status: status ,id: id ,key: key}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Contact'))
    );
  }

  saveContact(contact):Observable<Contact>{
    return this.http.post(this.requestUrl + '/save_contact', contact , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Contact'))
    );
  }

  
  deleteContact(id:number):Observable<{}> {
    return this.http.delete(this.requestUrl + `/delete/${id}`, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('Contact'))
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

