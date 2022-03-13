import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {

    private requestUrl = environment.requestUrl;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
    };
    constructor(private http: HttpClient) {
                
    }

    login(useremail: string, password: string, rememberme: boolean): Observable<string> {
        
        let now = new Date();
        let exp = new Date(now.getTime() + (6*60*60*1000)); 
        let user = {username: {email:useremail, isadmin: 1 }, password: password, grant_type: 'password'};
        let url = this.requestUrl+'/admin/signin';
        
        return this.http.post<any>(url,JSON.stringify(user), this.httpOptions).pipe(
            tap((res: any) => {
                let token = res && res.newToken;
                if (token) {
                    localStorage.setItem('bearerToken', res.newToken);
                    localStorage.setItem('adminUserSession', res);
                    if(rememberme)
                    {
                        localStorage.setItem('adminRememberMe', 'true');
                        localStorage.setItem('adminRememberEmail', useremail);
                    }
                    else
                    {
                        localStorage.removeItem('adminRememberMe');
                        localStorage.removeItem('adminRememberEmail');
                    }
                    return res;
                } else {
                    return res;
                }
            }),
            catchError(this.handleError<any>('Login'))
        );
    }
    logout(): void {
        if(!localStorage.getItem('adminRememberMe'))
        {
            localStorage.removeItem('adminRememberMe');
            localStorage.removeItem('adminRememberEmail');
        }
        localStorage.removeItem('adminUserSession');
        localStorage.removeItem('adminToken');
    }

    sendReqEmail(email):Observable<String>{ 
        return this.http.post(this.requestUrl + '/admin/user/forgot_password', email , this.httpOptions).pipe(
            tap((res: any) => {
                return res; 
            }),
            catchError(this.handleError<any>('Login'))
        );
    } 

    resetPassword(value):Observable<any>{ 
        return this.http.post(this.requestUrl + '/admin/user/reset', value , this.httpOptions).pipe(
            tap((res: any) => {
                return res; 
            }),
            catchError(this.handleError<any>('Login'))
        );
    }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {  
          console.error(error); 
          //this.messageService.add(`${operation} failed: ${error.message}`);
          return of(result as T);
        }
    }
}