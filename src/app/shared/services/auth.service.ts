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
    return this.http.get<User>('http://ec2-54-91-44-147.compute-1.amazonaws.com:8080/login', {headers:{login: userLogin, password: userPassword}})
  }
  
  getRole(){
    let data = JSON.parse(localStorage.getItem("currentUser_NA") || '');

    return data.role
  }

  test():void{
    console.log(true);
    
  }
}
