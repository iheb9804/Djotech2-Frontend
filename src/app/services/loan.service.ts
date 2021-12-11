import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../shared/global';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  BASE_PATH = GlobalVariable.BASE_PATH;
  baseUrl: string = this.BASE_PATH+'/loans/';

  constructor(private http: HttpClient) { }

  getBorrowers(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getBorrower(id): Observable<any> {
    return this.http.get<any>(this.baseUrl+id);
  }

  addBorrower(body): Observable<any> {
    return this.http.post<any>(this.baseUrl,body);
  }

  updateBorrower(body): Observable<any> {
    return this.http.put<any>(this.baseUrl,body);
  }

  deleteBorrower(id):Observable<any>{
    return this.http.delete<any>(this.baseUrl+"/"+id);
  }
}
