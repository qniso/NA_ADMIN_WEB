import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CurrUser, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // public currentUser: Observable<CurrUser>;
  // private currentUserSubject: BehaviorSubject<CurrUser>;

  constructor(
    private http: HttpClient,
  ) {
    // this.currentUserSubject = new BehaviorSubject<CurrUser>(
    //   {
    //   token: JSON.parse(localStorage.getItem("currentUser_NA")!),
    //   }
    // );
    // this.currentUser = this.currentUserSubject.asObservable();
   }


  getAuth(userLogin:string, userPassword:string): Observable<User>{
    return this.http.post<User>('http://ec2-54-91-44-147.compute-1.amazonaws.com:8080/na-app-api/authenticate', {login: userLogin, password: userPassword})
  }
  
  isLogined(): boolean{
    // console.log(this.currentUserSubject?.value.token);
    
   return !!JSON.parse(localStorage.getItem("currentUser_NA")!);
  }

}
