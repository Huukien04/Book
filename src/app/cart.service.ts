import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = 'http://localhost:3000/addCart';

  http = inject(HttpClient)

  public cartItemList: any = [];

  public BookList = new BehaviorSubject<any>([]);

  getBooks() {
    return this.BookList.asObservable();
  }

  setBook(book: any) {
    this.cartItemList.push(...book);
    this.BookList.next(book);
  }

  addToCart(book: any) {
    this.cartItemList.push(book);
    console.log(this.cartItemList);

    this.BookList.next(this.cartItemList);
    this.getTotalPrice();


  }

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


  constructor() { }


}
