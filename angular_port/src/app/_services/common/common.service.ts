import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

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

  getSystemData(): Observable<any>{
    return this.http.get<any>(this.apiUrl+"users/systeminfo", this.httpOptions);
  }
}
