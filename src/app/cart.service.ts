import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';
import { DialogAddTocartComponent } from './components/dialog-add-tocart/dialog-add-tocart.component';
import { Book, interfaceCart, User } from './types/book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = 'http://localhost:3000/addCart';

  http = inject(HttpClient)

  public cartItemList: interfaceCart[] = [];

  public BookList = new BehaviorSubject<any>([]);

  public userID: number = 0;

  getBooks() {
    return this.BookList.asObservable();
  }

  setBook(book: any) {
    this.cartItemList.push(...book);
    this.BookList.next(book);
  }

  durationInSeconds = 1.5;

  constructor(private _snackBar: MatSnackBar) {
    this.loadUserID();
   }

  openSnackBar() {
    this._snackBar.openFromComponent(DialogAddTocartComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }


  private loadUserID() {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      const userNamesArray = JSON.parse(storedUserName);
      const userIDs = userNamesArray.flat().map((user: User) => user.userID);
      this.userID = userIDs[0];        
    }
  }



  getListCart() {
    return this.http.get(`${this.apiUrl}?userID=${this.userID}`); 
  }
   
  addCart(bookID:number){  

    console.log(12332323,this.userID);
    
    return this.http.post(this.apiUrl,{bookID ,userID: this.userID});
  }

  // addToCart(newBook: any) {

  //   console.log(this.cartItemList);

  //   const existingBook = this.cartItemList.find((book: any) => book.bookID === newBook.bookID);

  //   if (existingBook) {

  //     this.openSnackBar()

  //   } else {

  //     this.cartItemList.push(newBook);

  //     this.BookList.next(this.cartItemList);

  //     this.getTotalPrice();

  //   }
  // }

  getTotalPrice(): number {


    let grandtoTal = 0;

    this.cartItemList.map((a: any) => {


      grandtoTal += a.total;

    })

    return grandtoTal;

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




}
