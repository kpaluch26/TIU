import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem("jwt");
    const uType: string = localStorage.getItem("uType");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      if (uType == expectedRole) {
        return true;
      }
      else {
        this.router.navigate([""]);
        return false;
      }
    }
    this.router.navigate(["login"]);
    return false;
  }
}
