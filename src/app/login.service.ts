import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, inject } from '@angular/core';
import { User } from './types/book';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { response } from 'express';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  apiUrl = 'http://localhost:3000/login';

  apiUrlget = 'http://localhost:3000/getUser';

  http = inject(HttpClient)

  user: User[] = [];

  public userList = new Subject<User >();

  allUser :User[] = [];

  authService = inject(AuthService);

  @Input() cookieService = inject(CookieService)

  private token: string | null = null;

  login(userID: string, userPass: string) {

    // , { withCredentials: true }

    return this.http.post<any>(this.apiUrl, { userID, userPass } )

      .pipe(

        tap(response => {

          const token = response.token;

          const user = response.results[0];
         
          
          if (token && user) {
         
            this.authService.setSession({ token, user });
          }

        })
      );

  }

  setCurrentUser(user: User , token: string | null) {

    this.userList.next(user);

    if (token) {

       this.cookieService.set('token', token);

    } else {

      this.cookieService.delete('token');

    }
  }

  getUser(): Observable<User> {
    const token = this.cookieService.get('token');
    if (token) {
      return this.http.get<User>(this.apiUrlget, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      return this.userList.asObservable();
    }
  }



  getToken(): string | null {

    return this.token;

  }

  loadCurrentUser() {

    const token = this.cookieService.get('token');

    if (token) {

      this.http.get<User>(this.apiUrlget, {


        headers: {

          Authorization: `Bearer ${token}`

        }

      }).subscribe(user => {
 
        this.setCurrentUser(user, token);

      });
    }
  }

}
