import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private jwtHelper = new JwtHelperService();

  constructor(private cookieService: CookieService, private router: Router) { }

  setSession(authResult: any) {

   // this.cookieService.set('token', authResult.token);
  //  const existingToken = this.cookieService.get('token');
  //  if (!existingToken && authResult.token) {
  //    this.cookieService.set('token', authResult.token, undefined, '/', undefined, undefined, 'Strict');
  //  }

  this.cookieService.set('token', authResult.token); 
  
  }

  logout() {

    this.cookieService.delete('token', '/');

    this.router.navigate(['login']);
  }

  getRoles(): string[] {

    const token = this.cookieService.get('token');

    if (!token) {

      return [];

    }

    const decodedToken = this.jwtHelper.decodeToken(token);

    return decodedToken.role ? [decodedToken.role] : [];
  }

  isLoggedIn(): boolean {

    const token = this.cookieService.get('token');

    return !!token && !this.jwtHelper.isTokenExpired(token);
  }


}
