import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  baseUrl: string = 'http://localhost:3000/products/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getProduct(id): Observable<any> {
    return this.http.get<any>(this.baseUrl+id);
  }


  addProduct(body): Observable<any> {
    return this.http.post<any>(this.baseUrl,body);
  }

  updateProduct(body): Observable<any> {
    return this.http.put<any>(this.baseUrl,body);
  }


  deleteProduct(id):Observable<any>{
    return this.http.delete<any>(this.baseUrl+"/"+id);
  }
}
