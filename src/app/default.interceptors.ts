import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { request } from 'http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = window.localStorage.getItem('bearerToken'); 
    let token2 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTI3NzE1MzcsIm5iZiI6MTYxMjc3MTUzNywianRpIjoiODYzMmQ1OTAtYThjZS00MWQxLTg5NTYtNGU1MjY2ZDMzNWVkIiwiZXhwIjoxOTI4MTMxNTM3LCJpZGVudGl0eSI6ImRldi50ZWNoa25vd3Nwcm9AYWFkaGFhcmFwaS5pbyIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7InNjb3BlcyI6WyJyZWFkIl19fQ.9xmpxLzoSg55x4zVYrCqD5hFY9VDFcBSTc8eerqwLg8';
    
    if(req.url.includes('https://kyc-api.aadhaarkyc.io/api/v1/aadhaar-validation')){ 
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token2
        }
      });
    }else if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'JWT ' + token
        }
      });
    }
    return next.handle(req);
  }
}