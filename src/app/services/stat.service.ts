import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../shared/global';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  BASE_PATH = GlobalVariable.BASE_PATH;
  baseUrl: string = this.BASE_PATH + '/stats/';

  constructor(private http: HttpClient) { }

  undoOperation(id): Observable<any> {
    return this.http.delete<any>(this.baseUrl+id);
  }

  getStats(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getPhonesValue(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/phonesValue");
  }

  getPhonesTradeValue(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/phonesTradeValue");
  }

  getStockInTrade(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/stockInTrade");
  }

  getTotalValue(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/totalValue");
  }

  getLoans(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/loans");
  }

  getDebts(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/debts");
  }

}