import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const loggedIn = route.data.loggedIn;

    if (loggedIn==false && this.auth.loggedIn()){
      return false;
    }

    if (loggedIn==false && !this.auth.loggedIn()){
      return true;
    }

    const hasRole = expectedRole.find(role => this.auth.getRole() === role)

    if (
      !this.auth.loggedIn() ||
      !hasRole
    ) {
      if (!this.auth.loggedIn()) {
        this.router.navigate(['login']);
      }

      return false;
    }
    return true;
  }




}
