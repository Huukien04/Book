import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from './types/book';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  apiUrl = 'http://localhost:3000/login';

  http = inject(HttpClient)

  login(userID:string , userPass:string){
  return this.http.post<any>(this.apiUrl,{userID,userPass});
  }
}
