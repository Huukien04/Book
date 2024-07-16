import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { GenreService } from 'src/app/genre.service';
import { Book, Genre, User } from 'src/app/types/book';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { BehaviorSubject, Subject, debounceTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddGenreComponent } from '../dialog-add-genre/dialog-add-genre.component';
import { LoginService } from 'src/app/login.service';
import { logout } from 'src/app/guards/auth-guard.guard';
import { LoginComponent } from '../login/login.component';
import { CartService } from 'src/app/cart.service';
import { ShoppingcartComponent } from '../shoppingcart/shoppingcart.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/auth.service';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);

  toppings = new FormControl('');

  genres: Genre[] = [];

  @Input() users: User[] = [];

  @Input() totalItem: number = 0;

  @Input() userName: string = '';

  @Input() userID: number = 0;

  @Input() cartService = inject(CartService);

  authService = inject(AuthService);

  isrole: boolean = false;

  @Input() loginService = inject(LoginService);

  genreService = inject(GenreService);

  router = inject(Router);

  @Output() newItemEvent = new EventEmitter<string>();

  @ViewChild('searchQuery') searchQuery!: ElementRef;

  message!: string;

  data = inject(DataService);

  inputText: string = '';

  private searchSubject = new Subject<string>();

  private readonly debounceTimeMs = 400;

  user = inject(LoginService);

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  onSearch() {
    this.searchSubject.next(this.inputText);
  }

  openDialog() {

    const dialogRef = this.dialog.open(DialogAddGenreComponent);

    dialogRef.afterClosed().subscribe(result => {

      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.checkrole();

    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {

      this.data.changeMessage(searchValue);
    });
    this.data.currentMessage.subscribe(message => this.message = message);

    this.genreService.getAll().subscribe({

      next: (data) => {

        this.genres = data;
      }
    })

    this.cartService.getBooks().subscribe({

      next: (data) => {

        this.totalItem = data.length;
      }
    })

    this.loginService.getUser().subscribe({
      next: (user) => {

        if (user) {

          this.userName = user.userName;

          this.userID = user.userID;

        } else {
          this.userName = '';
        }
      }
    });

  }
  checkrole() {
    let role = this.authService.getRoles();
    this.isrole = role.includes('Admin');
  }

  listBook() {
    this.router.navigate(['book/list'])
  }

  home() {
    this.router.navigate(['book/list'])

  }
  add() {
    this.router.navigate(['book/add'])
  }
  logout() {
    this.router.navigate(['login']);
    logout();
    this.loginService.setCurrentUser(null, '');
    localStorage.removeItem('userName');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

  }
  chat(){
    this.router.navigate(['chat']);

  }
  addTocart() {
    this.router.navigate(['cart']);
  }

  drop(event: CdkDragDrop<Book[]>) {

    console.log(111111111111111111111111);

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const book: Book = event.previousContainer.data[event.previousIndex];

      const bookID = book.bookID;

      console.log("sânsasnajsn", bookID, this.userID);


      this.cartService.addCart(bookID, this.userID)


    }
  }
}
