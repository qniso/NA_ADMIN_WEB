import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { URLS } from 'src/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}

  getRoleButtons(): Observable<any> {
    return this.http
      .get<any>(
        URLS.BASE_URL + URLS.NA_API + URLS.ROLLE_BUTTONS + URLS.GET_ALLOWED
      )
      .pipe(
        tap((userRoles) => {
          sessionStorage.setItem('role', JSON.stringify(userRoles));
        })
      );
  }
}
