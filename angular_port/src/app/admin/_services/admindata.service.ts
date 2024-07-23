import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

interface breadcrum {
  title : string,
  link : string,

}

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private token: any = '';
  private apiUrl = environment.apiUrl;
  private httpOptions : Object = {
    headers: new HttpHeaders({
      //'Accept': 'application/json',
      'x-auth-token': this.token,
      'Content-Type': 'application/json'
    }),
    //responseType: 'application/json'
  };
  private header_breadcrums:Array<breadcrum>= [];
  public header_breadcrums_change : Subject<Array<breadcrum>> = new Subject<Array<breadcrum>>();
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('nexuslens_cms_token');
    this.header_breadcrums_change.subscribe({
      next: (value: Array<breadcrum>)=>{
        this.header_breadcrums = value;
      }
    });
  }

  setHeaderBreadcrums(obj_arr: Array<breadcrum>){
    this.header_breadcrums = obj_arr;
    this.header_breadcrums_change.next(obj_arr);
    return true;
  }

  getAdminUser(): Observable<any>{
    return this.http.post<any>(this.apiUrl+"users/userinfo", {}, {headers: new HttpHeaders({'x-auth-token': this.token,'Content-Type': 'application/json'})});
  }
  

  getAllUsers(): Observable<any>{
    return this.http.get<any>(this.apiUrl+"users/all", {headers: new HttpHeaders({'x-auth-token': this.token,'Content-Type': 'application/json'})});
  }

  getUserData(id:string|null): Observable<any>{
    return this.http.post<any>(this.apiUrl+"users/user_data", {id:id}, {headers: new HttpHeaders({'x-auth-token': this.token,'Content-Type': 'application/json'})});
  }
}