import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from './types/book';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  apiUrl = 'http://localhost:3000/login';

  http = inject(HttpClient)

  user : User[]=[];

  public UserList = new BehaviorSubject<any>([]);


  login(userID:string , userPass:string){

  return this.http.post<any>(this.apiUrl,{userID,userPass});

  }

  addUserlogin(user:User){
  
  this.user.push(user);
  this.UserList.next(user);
  
  localStorage.setItem('userName', JSON.stringify(this.user));
  }

  getUser(){
    return this.UserList.asObservable()
  }

}
