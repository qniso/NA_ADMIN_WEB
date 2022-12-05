import { Injectable } from '@angular/core';
import { URLS } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserRole } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  getUserList():Observable<any>{
    return this.http.get<any>(URLS.BASE_URL + URLS.NA_API + URLS.USERS + URLS.GET_EMPLOYEE_LIST)
    .pipe(
      tap(res => {
        console.log(res);
      })
    );
  }
  getRoles():Observable<UserRole>{
    return this.http.get<UserRole>(URLS.BASE_URL + URLS.NA_API + URLS.USERS + URLS.GET_ALL_ROLES);
  }

  saveNewUser(value: Object):Observable<any>{
    return this.http.post<any>(URLS.BASE_URL + URLS.NA_API + URLS.USERS + URLS.NEW_USER, value);
  }
}
