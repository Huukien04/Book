import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  login(userID: string, userPass: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { userID, userPass });
  }

  setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getRoles(): string[] {
    const token = localStorage.getItem('token');
    if (!token) {
      return [];
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log(111111112222, decodedToken);

    return decodedToken.role ? [decodedToken.role] : [];
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }


}
