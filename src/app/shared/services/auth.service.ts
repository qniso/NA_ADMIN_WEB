import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }


  getAuth(userLogin:string, userPassword:string): Observable<any>{
    return this.http.get('https://na-app-backend.herokuapp.com/login', {headers:{login: userLogin, password: userPassword}})
  }
  
  test():void{
    console.log(true);
    
  }
}
