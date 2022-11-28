import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { URLS } from 'src/app/app.config';
import { TokenInterceptor } from './token.interceptor';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token: string | null  = null ;

  constructor(
    private http: HttpClient,
  ) {}


  getAuth(userLogin:string, userPassword:string): Observable<User>{
    return this.http.post<User>(URLS.BASE_URL + URLS.NA_API + URLS.LOGIN, {login: userLogin, password: userPassword})
    .pipe(
      tap((token)=> {
        localStorage.setItem('currentUser_NA', `{"accessToken":"${token.accessToken}"}`);
        this.setToken(token.accessToken);
      })
    )
  }

  setToken(token: string){
    this.token = token;
  }

  getToken(){
    return this.token;
  }

  checkAuth(): Observable<any>{
    return this.http.get<any>(URLS.BASE_URL + URLS.NA_API + '/')
  }
  
  isLogined(): boolean{
   return !!this.token; 
  }

  logout(){
    this.setToken('null');
    localStorage.removeItem('currentUser_NA');
  }

}
