import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewCompany } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class EditCompanyService {

  constructor(
    private http: HttpClient,
  ) { }


  test(data: Object):Observable<NewCompany>{
    return this.http.post<NewCompany>("http://na-app-backend.herokuapp.com/company/save_new" ,data)
  }
  
}
