import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  apiUrl = 'http://localhost:3000/user';
  http = inject(HttpClient)
  getUser() {
    return this.http.get(this.apiUrl);
  }
  addUser(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  getUserLogin(id: number) {
    return this.http.get(this.apiUrl);
  }



}
