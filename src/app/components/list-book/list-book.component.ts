import { AfterViewInit, Component, HostListener, Input, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { BookService } from 'src/app/book.service';
import { Book, Genre, interfaceCart, User } from 'src/app/types/book';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {

  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { DialogAnimationsExampleDialogComponent } from '../dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from 'src/app/genre.service';
import { HeaderComponent } from '../header/header.component';
import { DataService } from 'src/app/data.service';
import { Sort } from '@angular/material/sort';
import { BookGenresService } from 'src/app/book-genres.service';
import { CartService } from 'src/app/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginService } from 'src/app/login.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit, AfterViewInit {

  renderer = inject(Renderer2);

  bookService = inject(BookService);

  @Input() books: Book[] = [];

  @Input() pagedBooks: Book[] = [];

  @Input() genres: Genre[] = [];

  showFiller = false;

  @Input() cartService = inject(CartService);

  authService = inject(AuthService);

  isrole: boolean = false;

  @Input() pageSize = 12;

  @Input() totalBooks = 0;

  @Input() currentPage = 0;

  @Input() genreId!: number;

  route = inject(ActivatedRoute);

  genreService = inject(GenreService);

  bookGenresService = inject(BookGenresService);

  idGenreSubject = new Subject<number>();


  @Input() bookSubject = new BehaviorSubject<any>(null);

  @Input() loginService = inject(LoginService);

  @ViewChild('app-header') keytoSearch = inject(HeaderComponent);

  @Input() idUser: number = 0;

  @Input() idgenrebylist!:number;

  key!: string;

  todoBooks: Book[] = [];

  doneBooks: Book[] = [];

  message!: string;

  data = inject(DataService);

  router = inject(Router);

  sortedData: Book[] = [];

 

  toggleFiller() {

    this.showFiller = !this.showFiller;

  }

  readonly dialog = inject(MatDialog);

  sortData(sort: Sort) {

    debugger

    const data = this.books.slice();

    if (!sort.active || sort.direction === '') {

      this.sortedData = data;

      this.updatePagedBooks();


      return;
    }

    this.sortedData = data.sort((a, b) => {

      const isAsc = sort.direction === 'asc';

      switch (sort.active) {

        case 'price':

          return compare(a.price, b.price, isAsc);

        case 'quantity':

          return compare(a.stock_quantity, b.stock_quantity, isAsc);

        default:

          return 0;
      }
    });

    console.log(this.sortedData);

    this.books = this.sortedData;

    this.updatePagedBooks();

    function compare(a: number | string, b: number | string, isAsc: boolean) {

      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);

    }

  }

  openDialog(book: Book): void {

    const dialogRef = this.dialog.open(DialogAnimationsExampleDialogComponent, {

      width: '250px',

      data: { book }

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'confirm') {

        this.handleDelete(book.bookID);


      }
    });

  }
  ngAfterViewInit(): void {

  }

  ngOnInit() {

    this.checkRole();

    this.data.currentMessage.subscribe(message => {

      this.message = message;

      if (message) {

        this.searchBook(message);

        this.getGenre()

      } else {

        this.loadBooks();

      }
    });

    

    this.loginService.getUser().subscribe({

      next: (user:User) => {

        if (user) {
          
          const users = user; 

          this.idUser = users.userID;

        } else {

          console.log("get idUser fale");

        }
      }, error: (error) => {

        console.error("Error fetching user:", error);

      }
    })
    this.getIDgenreBylistGenre(this.idgenrebylist);

    this.route.params.subscribe((param) => {

      this.genreId = param['id']

      if (this.genreId) {


        this.bookService.getBookbyGenre(this.genreId).subscribe({

          next: (data) => {

            this.books = data;

            this.totalBooks = data.length;

            this.updatePagedBooks();

            this.getGenre()

          }

        })
      } else {
        this.bookService.getAll().subscribe({

          next: (data) => {

            this.books = data;

            this.books.forEach((a: any) => {

              Object.assign(a, { quantity: 1, total: a.price });
            })

            this.totalBooks = data.length;

            this.updatePagedBooks();

            this.getGenre()
          }
        })
      }
    })
  }


  checkRole() {

    let role = this.authService.getRoles();

    this.isrole = role.includes('Admin');

  }

  addTocart(book: Book) {

    this.bookSubject.next(book);

    this.cartService.addCart(book.bookID, this.idUser).subscribe({

      next: (value) => {

        this.cartService.loadCart();

        console.log("add to cart sucssec", value);

      }, error: (err) => {

        this.cartService.openSnackBar();

        console.log("add to cart fale", err);


      },
    })

  }

  getIDgenreBylistGenre(id: number) {

   let idgenrebylist:number  = id;

    this.idGenreSubject.next(id);

    this.idGenreSubject.subscribe({

      next: (data) => {

        idgenrebylist = data

       this.bookService.getBookbyGenre(idgenrebylist).subscribe({

        next:(data)=>{

          this.books = data;

          this.totalBooks = data.length;

          this.updatePagedBooks();
        }
       })

      }
    })

    

  }
  getGenre() {

    this.genreService.getAll().subscribe({

      next: (data) => {

        this.genres = data;

        this.mapGenresToBooks();
      },
      error: (e) => {

        console.error('Error fetching genres:', e);

      }
    });
  }
  mapGenresToBooks(): void {

    this.books.forEach(book => {

      book.genreName = this.genres.find(genre => genre.genreID === book.genreID)?.name || 'Unknown';
    
    });
  }


  searchBook(query: string) {

    this.bookService.searchBook(query).subscribe({

      next: (data) => {

        this.books = data;

        this.totalBooks = data.length;

        this.updatePagedBooks();

      },
      error: (e) => {

        console.log(e);

      }
    });
  }






  loadBooks() {
    // Load all books
    this.bookService.getAll().subscribe({

      next: (data) => {

        this.books = data;

        this.totalBooks = data.length;

        this.updatePagedBooks();

      },
      error: (e) => {

        console.log(e);

      }
    });
  }
  handleDelete(id: number) {

    this.bookService.deleteBook(id).subscribe({

      next: () => {

        console.log("Delete Suces");

        this.books = this.books.filter(book => book.bookID !== id);

        this.loadBooks();

        this.router.navigate(['book/list']);

        window.location.reload();

      },
      error: (e) => {

        console.log(e);

      }
    })

  }

  onPageChange(event: PageEvent) {

    this.pageSize = event.pageSize;

    this.currentPage = event.pageIndex;

    this.updatePagedBooks();

  }
  updatePagedBooks() {

    const startIndex = this.currentPage * this.pageSize;

    const endIndex = startIndex + this.pageSize;

    this.pagedBooks = this.books.slice(startIndex, endIndex);

  }
  getImageUrl(imagePath: string): string {

    const fakePathPrefix = 'C:\\fakepath\\';

    if (imagePath && imagePath.startsWith(fakePathPrefix)) {

      return `${imagePath.substring(fakePathPrefix.length)}`;
    }


    return imagePath;
  }

  // drop(event: CdkDragDrop<[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //   }
  // }


  drop(event: CdkDragDrop<Book[]>) {

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
   
    } else {

      transferArrayItem(

        event.previousContainer.data,

        event.container.data,

        event.previousIndex,

        event.currentIndex

      );
    }
  }



  onFilterClick(event: Event) {

    const target = event.currentTarget as HTMLElement;

    // Remove active class from all filters
    const filters = document.querySelectorAll('.filter');
    
    filters.forEach(filter => {
     
      this.renderer.removeClass(filter, 'active');
    });

    // Add active class to the clicked filter
    this.renderer.addClass(target, 'active');
  }



}
