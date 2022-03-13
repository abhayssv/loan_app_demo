import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../_alert/alert.service';
import { CollectionTeamManagement } from '../../../models/collectionteammanagement';

@Injectable()
export class CollectionTeamManagementService {
  private requestUrl = environment.requestUrl + '/apis/info'; // URL to Web API
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json;charset=UTF-8'})
  };
  constructor(private http:HttpClient, private alertService: AlertService) { }

  getsCollectionTeamManagement():Observable<CollectionTeamManagement>{
    return this.http.get(this.requestUrl + '/collection_team_management/all').pipe(
      tap((res: any)=>{  
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionTeamManagement'))
    );
  }

  getCollectionTeamManagement(collectionteammanagement_id: string): Observable<CollectionTeamManagement>{ 
    console.log("11111111111", collectionteammanagement_id);
    
    return this.http.get(this.requestUrl + '/collection_team_management/get_by_id/' + collectionteammanagement_id, this.httpOptions).pipe(
      tap((res :any)=>{ 
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionTeamManagement'))
    );
  }

  getCollectionTeamManagementView(collectionteammanagement_id: string): Observable<CollectionTeamManagement>{ 
    return this.http.get(this.requestUrl + '/collection_team_management/get_by_id/' + collectionteammanagement_id, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionTeamManagement'))
    );
  } 

  saveCollectionTeamManagement(collectionteammanagement):Observable<CollectionTeamManagement>{ 
    console.log("collectionteammanagement", collectionteammanagement);
    
    return this.http.post(this.requestUrl + '/collection_team_management/save_collection_team_management', collectionteammanagement , this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionTeamManagement'))
    );
  }
 
  deleteCollectionTeamManagement(collectionteammanagement_id:number):Observable<{}> { 
    return this.http.post(this.requestUrl + `/delete`, {id:collectionteammanagement_id}, this.httpOptions).pipe(
      tap((res :any)=>{
        this.handleResponse(res);
      }),
      catchError(this.handleError<any>('CollectionTeamManagement'))
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

