import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { GlobalVariable } from '../shared/global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken:any;
  user:any;
  authGuard:AuthGuardService;
  BASE_PATH = GlobalVariable.BASE_PATH;
  constructor(private http:HttpClient, injector:Injector,private router : Router ) {

   }

   loggedIn(){
    //const helper = new JwtHelperService();
    this.loadToken();
    const token: string = this.authToken;
    return token != null //&& !helper.isTokenExpired(token);
   }

   registerUser(user:any) : Observable<any>{
    return this.http.post<any>(this.BASE_PATH+'/users/register',user);
  }

  login(cordonnes:any) : Observable<any>{
    return this.http.post<any>(this.BASE_PATH+'/users/authenticate',cordonnes);
  }

  getProfile() : Observable<any>{

    return this.http.get<any>(this.BASE_PATH+'/users/profile');
  }

  getRole(){
    let jwt = localStorage.getItem("id_token");
    if (jwt == null) return null;
    jwt=jwt.substring(4)
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData.role;
  }

  getConnectedUser(){
    let jwt = localStorage.getItem("id_token");
    if (jwt == null) return null;
    jwt=jwt.substring(4)
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData;
  }

  loadToken(){
    this.authToken=localStorage.getItem('id_token');
  }



  enregistrerToken(token,user){
    localStorage.setItem('id_token',token);
    this.authToken=token;
    this.user=user;

  }
  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }
  getToken(){
    return localStorage.getItem('id_token');
  }


}
