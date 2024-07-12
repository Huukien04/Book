import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  @Input() totalItem: number = 0;

  @Input() cartList: any = [];

  @Input() total!: number;

  router = inject(Router);

  @Input() cartService = inject(CartService);

  ngOnInit(): void {

    this.cartService.getBooks().subscribe({
      next: (data) => {
        this.cartList = data;
        this.total = this.cartService.getTotalPrice();
      }
    })

    this.cartService.getListCart().subscribe({
      next:(value)=> {
        this.cartList = value;
        console.log(12345,value);
        
      },
    })

  }
 


  getImageUrl(imagePath: string): string {

    const fakePathPrefix = 'C:\\fakepath\\';
    if (imagePath && imagePath.startsWith(fakePathPrefix)) {

      return `${imagePath.substring(fakePathPrefix.length)}`;
    }


    return imagePath;
  }

  Delete(book: any){
    this.cartService.deteBook(book);
  }
  list(){
  this.router.navigate(['book/list'])
  }

}
