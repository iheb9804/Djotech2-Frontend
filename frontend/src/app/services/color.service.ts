import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  baseUrl: string = 'http://localhost:3000/colors/';

  constructor(private http: HttpClient) { }

  getColors(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }


  addColor(body): Observable<any> {
    return this.http.post<any>(this.baseUrl,body);
  }



  updateColors(body): Observable<any> {
    return this.http.put<any>(this.baseUrl,body);
  }


  deleteColor(id):Observable<any>{
    return this.http.delete<any>(this.baseUrl+"/"+id);
  }}
