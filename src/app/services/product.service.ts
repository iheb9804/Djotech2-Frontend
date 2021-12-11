import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../shared/global';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_PATH = GlobalVariable.BASE_PATH;
  baseUrl: string = this.BASE_PATH + '/products/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getDashboardProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "dashboard");
  }

  getProduct(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + id);
  }


  addProduct(body): Observable<any> {
    return this.http.post<any>(this.baseUrl, body);
  }

  updateProduct(body): Observable<any> {
    return this.http.put<any>(this.baseUrl, body);
  }


  deleteProduct(id): Observable<any> {
    return this.http.delete<any>(this.baseUrl + "/" + id);
  }

  sellProduct(body): Observable<any> {
    return this.http.post<any>(this.baseUrl + "sellProduct", body);
  }

  loadProduct(body): Observable<any> {
    return this.http.post<any>(this.baseUrl + "loadProduct", body);
  }
}
