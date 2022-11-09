import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }


  getAuth(userLogin:string, userPassword:string): Observable<User>{
    return this.http.get<User>('https://na-app-backend.herokuapp.com/login', {headers:{login: userLogin, password: userPassword}})
  }
  
  test():void{
    console.log(true);
    
  }
}
