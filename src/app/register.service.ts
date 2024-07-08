import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from './types/book';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }
  apiUrl ='http://localhost:3000/login';
  http = inject(HttpClient)

 addUser(data:any){
  return this.http.post<User>(this.apiUrl,data);
 }
 getUser(){
  return this.http.get(this.apiUrl);
 }
}
