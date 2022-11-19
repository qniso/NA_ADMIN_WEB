import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(
    private http: HttpClient,
  ) { }


  getAuth(userLogin:string, userPassword:string): Observable<User>{
    return this.http.post<User>('http://ec2-54-91-44-147.compute-1.amazonaws.com:8080/na-app-api/authenticate', {login: userLogin, password: userPassword})
  }
  
  getRole(){
    let data = JSON.parse(localStorage.getItem("currentUser_NA") || '');
    return data.role
  }

  isLogined(){
    let user = JSON.parse(localStorage.getItem("currentUser_NA") || '');
    return !!user;
  }

  test():void{
    console.log(true);
    
  }
}
