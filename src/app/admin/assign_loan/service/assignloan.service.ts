import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { User } from '../../../models/user';

@Injectable()
export class AssignLoanService {
  private requestUrl = environment.requestUrl + '/apis/assign_loan'; // URL to Web API
  private AssignLoan: any;
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getAssignLoans():Observable<User>{
    return this.http.get(this.requestUrl + '/all').pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    );
  } 

  getLoanByRoles(role_id):Observable<User>{
    return this.http.get(this.requestUrl + '/get_by_role/'+ role_id).pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    );
  } 
  // Manual Loan Assign

  manualAssignLoan(assign_id, loan_id, team_name ): Observable<User>{  
    return this.http.post(this.requestUrl + '/manual/assign_loan' , { assign_id, loan_id, team_name }, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    );
  } 

  // Auto Loan Assign
  autoAssignLoan(has_role, team): Observable<User>{  
    console.log("this.teamssssssss",team);
    return this.http.post(this.requestUrl + '/auto/assign_loan' , { has_role, team}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    );
  } 

  searchFirstReviewerLoans(value):Observable<User>{  
    const {from_date, to_date, loan_id, name,mobile_no,email,id_number,user_type,tenure,amount} = value; 
    return this.http.get(environment.requestUrl + '/api/system_report/first_reviewer/search_first_reviewer_loans?from_date='+from_date+'&to_date='+to_date+'&loan_id='+loan_id+'&name='+name+'&mobile_no='+mobile_no+'&email='+email+'&id_number='+id_number+'&user_type='+user_type+'&tenure='+tenure+'&amount='+amount).pipe(
      tap((res: any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    );
  } 

  getAssignLoanView(user_id: string): Observable<User>{
    return this.http.get(environment.requestUrl + '/api/user/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
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

  getApplyLoanDetails(loan_id: string, user_id: string): Observable<User>{
    return this.http.get(this.requestUrl+'/'+loan_id+'/'+ user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    );
  }

  changeStatus(status:boolean, loan_id: string, key: string, email:string ): Observable<User>{ 
    return this.http.post(this.requestUrl + '/status' , { status: status ,apply_loan_id: loan_id ,key: key, email:email }, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    );
  } 

  submitReview(value,loan_id:string): Observable<User>{ 
    return this.http.post(this.requestUrl + '/remark/submit_remark' , {remark:value.remark,loan_id:loan_id}, this.httpOptions).pipe(
      tap((res:any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    );
  }
 
  getUsers():Observable<User>{
    return this.http.get(environment.requestUrl + '/admin/user/all').pipe(
      tap((res: any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }
  
  deleteAssignLoan(user_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {user_id:user_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    )
  }

  // Get Basic Information of App AssignLoan....
  getBasicInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/basic_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    );
  }
 
  // Get App List Details of App AssignLoan....
  getAppListDetails(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/app_list/get_details/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
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

  // Get Emp Information of App AssignLoan....
  getEmpInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/emp_info/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    );
  }

  // Get Bank Information of App AssignLoan....
  getBankInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/bank/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    );
  }

  // Get KYC Information of App AssignLoan....
  getKycInfo(user_id: string): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/admin/profile/kyc/' + user_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
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

  // Get User Roles of App User....
  getStatusByRole(reviewer_id): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/system_report/reviewer/get_status/' + reviewer_id , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    ); 
  }

  // Get Remarks Details of App User....
  getRemarksDetails(loan_id:string): Observable<User>{ 
    return this.http.get(this.requestUrl + '/remark/get_reviewer_remark/'+ loan_id , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  } 

  // Get Status of App User....
  getStatus(): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/api/apply_loan/status?page=first' , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Get First Reviewer....
  getFirstReviewer(): Observable<User>{ 
    return this.http.get(environment.requestUrl + '/admin/user/reviewer/first' , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('User'))
    );
  }

  // Adhaar API
  getAdhaarDetails(aadhar_no:string, customer_id:string):Observable<{}> { 
    return this.http.post(environment.requestUrl + `/api/profile/kyc/adhaar/get_adhaar_details`, {adhaarNumber:aadhar_no, customer_id:customer_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('AssignLoan'))
    )
  } 
  
  getLoanHistory(customer_id:string):Observable<User>{
    return this.http.get(environment.requestUrl + '/api/apply_loan/customer/loan_history/'+ customer_id).pipe(
      tap((res: any)=>{
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

