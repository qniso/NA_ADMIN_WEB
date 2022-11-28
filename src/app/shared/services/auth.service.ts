import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { URLS } from 'src/app/app.config';
import { TokenInterceptor } from './token.interceptor';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
  ) {}


  getAuth(userLogin:string, userPassword:string): Observable<User>{
    return this.http.post<User>(URLS.BASE_URL + URLS.NA_API + URLS.LOGIN, {login: userLogin, password: userPassword})
  }
  
  checkAuth(): Observable<any>{
    return this.http.get<any>(URLS.BASE_URL + URLS.NA_API + '/')
  }
  
  // initializeValues(): Observable<any>{
  //   let accessToken;
  //   let expires; 

  //   try{
  //     accessToken = localStorage.getItem
  //   }
  // }

  isLogined(): boolean{
   return !!JSON.parse(localStorage.getItem("currentUser_NA")!) && JSON.parse(localStorage.getItem("currentUser_NA")!).accessToken == TokenInterceptor.accessToken; 
  }

}
