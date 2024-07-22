import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, inject } from '@angular/core';
import { User } from './types/book';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  apiUrl = 'http://localhost:3000/login';

  apiUrlget = 'http://localhost:3000/getUser';

  http = inject(HttpClient)

  user: User[] = [];

  public userList = new BehaviorSubject<User | null>(null);

  @Input() cookieService = inject(CookieService)

  private token: string | null = null;

  login(userID: string, userPass: string) {



    return this.http.post<any>(this.apiUrl, { userID, userPass })

      .pipe(

        tap(response => {

          const token = response.token;

          if (token) {

            this.setCurrentUser(response.user, token);

          }

        })
      );

  }

  setCurrentUser(user: User | null, token: string | null) {

    this.userList.next(user);

    if (token) {

      this.cookieService.set('token', token);

    } else {

      this.cookieService.delete('token');

    }
  }

  getUser() {

    return this.userList.asObservable();

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
