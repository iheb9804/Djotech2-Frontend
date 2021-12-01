import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../shared/global';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  BASE_PATH = GlobalVariable.BASE_PATH;
  baseUrl: string = this.BASE_PATH+'/categories/';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getCategory(id): Observable<any> {
    return this.http.get<any>(this.baseUrl+id);
  }


  addCategory(body): Observable<any> {
    return this.http.post<any>(this.baseUrl,body);
  }

  updateCategory(body): Observable<any> {
    return this.http.put<any>(this.baseUrl,body);
  }


  deleteCategory(id):Observable<any>{
    return this.http.delete<any>(this.baseUrl+"/"+id);
  }
}
