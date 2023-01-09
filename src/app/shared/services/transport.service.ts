import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { URLS } from 'src/app/app.config';
import { CurrentCarProfile, Transport } from '../models/transport.model';

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  data!: CurrentCarProfile;
  currentCarId!: number;

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
    return this.http
      .post<any>(
        URLS.BASE_URL + URLS.NA_API + URLS.TRANSPORT + URLS.GET_TRANSPORT_INFO,
        body
      )
      .pipe(map((res) => (this.data = res)));
  }

  editUsingReasonInfo(body: {}): Observable<any> {
    return this.http.post<any>(
      URLS.BASE_URL +
        URLS.NA_API +
        URLS.TRANSPORT +
        URLS.EDIT_USING_REASON_INFO,
      body
    );
  }

  editGeneralInfo(body: {}): Observable<any> {
    return this.http.post<any>(
      URLS.BASE_URL + URLS.NA_API + URLS.TRANSPORT + URLS.EDIT_GENERAL_INFO,
      body
    );
  }
}
