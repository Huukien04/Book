import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';
import { DialogAddTocartComponent } from './components/dialog-add-tocart/dialog-add-tocart.component';
import { Book, interfaceCart, User } from './types/book';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = 'http://localhost:3000/addCart';
  deleteapiUrl = 'http://localhost:3000/deleteCart';

  http = inject(HttpClient)

  public cartItemList: interfaceCart[] = [];

  @Input() public BookList = new BehaviorSubject<any>([]);

  @Input() loginService = inject(LoginService);

  public userID: number = 0;

  getBooks() {
    return this.BookList.asObservable();
  }

  durationInSeconds = 1.5;

  constructor(private _snackBar: MatSnackBar) {

  }

  openSnackBar() {
    this._snackBar.openFromComponent(DialogAddTocartComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  
  loadCart(){
    this.BookList.next(this.cartItemList);
  }
  getListCart(userID:number) {
    return this.http.get(`${this.apiUrl}?userID=${userID}`);
  }

  addCart(bookID: number,userID:number) {

    return this.http.post(this.apiUrl, { bookID, userID });

  }

  getTotal(): number {

   let grandtoTal = 0;
  this.cartItemList.map((a:any)=>{
    grandtoTal += a.length;
   
    
  })
  grandtoTal = this.cartItemList.length;
  console.log(grandtoTal);
  
    return grandtoTal;

  }

  deleteCart(cartID:number){
   
    return this.http.delete(`${this.deleteapiUrl}/${cartID}`);
  }


  deteBook(book: any) {

    this.cartItemList.map((booka: any, index: any) => {

      if (book.bookID == booka.bookID) {

        this.cartItemList.splice(index, 1);

        console.log("Delete suces");

      } else {


        console.log("Delete fale");

      }
    })
    this.BookList.next(this.cartItemList);
  }

  updateCartItems(cartItems: any) {
    this.cartItemList = [];
    
    this.cartItemList.push(...cartItems)
    this.BookList.next(this.cartItemList);

 
    
  }



}
