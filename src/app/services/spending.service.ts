import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../shared/global';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {
  BASE_PATH = GlobalVariable.BASE_PATH;
  baseUrl: string = this.BASE_PATH + '/spendings/';

  constructor(private http: HttpClient) { }

  getSpendings(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }


  getSpending(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + id);
  }




  addSpending(body): Observable<any> {
    return this.http.post<any>(this.baseUrl, body);
  }

  updateSpending(body): Observable<any> {
    return this.http.put<any>(this.baseUrl, body);
  }


  deleteSpending(id): Observable<any> {
    return this.http.delete<any>(this.baseUrl + "/" + id);
  }
}
