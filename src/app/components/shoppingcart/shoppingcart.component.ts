import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { BookService } from 'src/app/book.service';
import { CartService } from 'src/app/cart.service';
import { LoginService } from 'src/app/login.service';
import { interfaceCart } from 'src/app/types/book';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  @Input() totalItem: number = 0;
  
  @Input() cartList:interfaceCart[] = [];

  @Input() cartItems = new Subject<any>();

  bookService = inject(BookService);

  @Input() total!: number;

  userID: number = 0;

  router = inject(Router);

  @Input() genreName = '';

  @Input() loginService = inject(LoginService);

  @Input() cartService = inject(CartService);

  ngOnInit(): void {

    // this.loadCartItems();
    this.loginService.getUser().subscribe({
      next: (user: any) => {
        if (user && user.userID) {
          this.cartService.getListCart(user.userID).subscribe({
            next: (value: any) => {
              this.cartList = value       
              
            this.cartService.updateCartItems(value);
              console.log('Cart data:', value);
            },
            error: (err: any) => {

              console.error('Error loading cart:', err);

            }
          });
        } else {
          console.error('User not found or userID is missing');
        }
      },
      error: (err) => {
        console.error('Error fetching user ID:', err);
      },
    });
   

  }

  genre(genreID : number){
    this.bookService.getBookbyGenre(genreID).subscribe({
      next: (data) => {
     
      }

    })

  }

  public loadCartItems() {
    this.loginService.getUser().subscribe({
      next: (user: any) => {
        if (user && user.userID) {
          this.cartService.getListCart(user.userID).subscribe({
            next: (value: any) => {
              this.cartList = value       
              
            this.cartService.updateCartItems(value);
              console.log('Cart data:', value);
              this.updateTotalPrice();
            },
            error: (err: any) => {

              console.error('Error loading cart:', err);

            }
          });
        } else {
          console.error('User not found or userID is missing');
        }
      },
      error: (err) => {
        console.error('Error fetching user ID:', err);
      },
    });
  }


  getImageUrl(imagePath: string): string {

    const fakePathPrefix = 'C:\\fakepath\\';
    if (imagePath && imagePath.startsWith(fakePathPrefix)) {

      return `${imagePath.substring(fakePathPrefix.length)}`;
    }


    return imagePath;
  }

  handleDelete(idcart: number) {
    this.cartService.deleteCart(idcart).subscribe({

      next: (data) => {
        console.log('delete succes');
        this.loadCartItems();
      }, error(err) {
        console.log('delete fale', err);

      },
    });
    
  }
  list() {
    this.router.navigate(['book/list'])
  }
  
  updateTotalPrice() {
    this.total = this.cartList.reduce((sum, item) => sum + item.stock_quantity * item.price, 0);
  }

}
