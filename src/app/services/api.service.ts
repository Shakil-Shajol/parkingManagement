import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BaseApiService {
  baseUrl= '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient) { }


  get(url: any, params= ''): Observable<any>{
    return this.http.get(url + params);
  }

  post(url: any, params: any): Observable<any>{
    return this.http.post(url,params, this.httpOptions);
  }
}
