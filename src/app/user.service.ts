import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './types/book';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:3000/allUser';

  http = inject(HttpClient);

  constructor() { }
 
  getAllUser() {

    return this.http.get<User[]>(this.apiUrl)

  }

}
