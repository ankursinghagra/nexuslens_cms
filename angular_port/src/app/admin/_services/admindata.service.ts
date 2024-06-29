import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('nexuslens_cms_token');
  }

  getAdminUser(): Observable<any>{
    return this.http.post<any>(this.apiUrl+"users/userinfo", {}, {headers: new HttpHeaders({'x-auth-token': this.token,'Content-Type': 'application/json'})});
  }
  

  getAllUsers(): Observable<any>{
    return this.http.get<any>(this.apiUrl+"users/all", {headers: new HttpHeaders({'x-auth-token': this.token,'Content-Type': 'application/json'})});
  }
}