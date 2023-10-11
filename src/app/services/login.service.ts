import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private httpLogin :  HttpClient) { }

  private apiUrl = "http://localhost:8080/login"

  postLogin( email : string , password : string ):Observable<any>{
     return this.httpLogin.post<any>(this.apiUrl + email, password);
   }
}
