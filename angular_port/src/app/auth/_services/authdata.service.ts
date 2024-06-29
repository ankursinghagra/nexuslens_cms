import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  
  private apiUrl = environment.apiUrl;
  private httpOptions : Object = {
    headers: new HttpHeaders({
      //'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    //responseType: 'application/json'
  };
  constructor(private http: HttpClient) {

  }

  getLogin(login_args: object): Observable<any>{
    return this.http.post<any>(this.apiUrl+"users/login", login_args, this.httpOptions);
  }
  
}
