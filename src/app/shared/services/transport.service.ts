import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { URLS } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  saveNewTransport(value: object):Observable<any>{
    return this.http.post<any>(URLS.BASE_URL + URLS.NA_API + URLS.TRANSPORT + URLS.SAVE_NEW_TRANSPORT, value)
  }
}
