import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { URLS } from 'src/app/app.config';
import { Transport } from '../models/transport.model';

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  constructor(private http: HttpClient, private router: Router) {}

  saveNewTransport(value: object): Observable<Transport> {
    return this.http.post<Transport>(
      URLS.BASE_URL + URLS.NA_API + URLS.TRANSPORT + URLS.SAVE_NEW_TRANSPORT,
      value
    );
  }

  getAllTransport(): Observable<any> {
    return this.http.get<any>(
      URLS.BASE_URL + URLS.NA_API + URLS.TRANSPORT + URLS.GET_ALL_TRANSPORT
    );
  }

  getTransportInfo(body: {}): Observable<any> {
    return this.http.post<any>(
      URLS.BASE_URL + URLS.NA_API + URLS.TRANSPORT + URLS.GET_TRANSPORT_INFO,
      body
    );
  }
}
