import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private jwtHelper = new JwtHelperService();

  constructor(private router: Router,private cookieService:CookieService) { }

  canActivate(

    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // const token = localStorage.getItem('id_token');

    // const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');

    // if (token && moment().isBefore(moment(expiresAt))) {

    //   return true;

    // } else {

    //   this.router.navigate(['login'

    //   ]);
    //   return false;
    // }

    const token = this.cookieService.get('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {

      return true;

    } else {

      this.router.navigate(['login']);

      return false;
      
    }
  
  }
}
export function logout(cookieService: CookieService) {

  
  
  cookieService.delete('token');
  
  window.location.href = '/login';


} 
