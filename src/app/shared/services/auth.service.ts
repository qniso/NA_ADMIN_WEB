import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { URLS } from 'src/app/app.config';

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
  
  isLogined(): boolean{
   return !!JSON.parse(localStorage.getItem("currentUser_NA")!);
  }

}
