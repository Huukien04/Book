import { AfterViewInit, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { BookService } from 'src/app/book.service';
import { Book, Genre } from 'src/app/types/book';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogAnimationsExampleDialogComponent } from '../dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from 'src/app/genre.service';
import { HeaderComponent } from '../header/header.component';
import { DataService } from 'src/app/data.service';
import { Sort } from '@angular/material/sort';
@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit, AfterViewInit {

  bookService = inject(BookService);
  @Input() books: Book[] = [];
  pagedBooks: Book[] = [];
  genres: Genre[] = [];
  showFiller = false;
  pageSize = 4;
  totalBooks = 0;
  currentPage = 0;
  genreId!: number;
  route = inject(ActivatedRoute);
  genreService = inject(GenreService);
  @ViewChild('app-header') keytoSearch = inject(HeaderComponent);
  key!: string;
  message!: string;
  data = inject(DataService);
  router = inject(Router);
  sortedData: Book[] = [];

  toggleFiller() {
    this.showFiller = !this.showFiller;
  }

  readonly dialog = inject(MatDialog);


  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   this.dialog.open(DialogAnimationsExampleDialogComponent, {
  //     width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }
  sortData(sort: Sort) {
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

    this.data.currentMessage.subscribe(message => {
      this.message = message;
      if (message) {
        this.searchBook(message);
        this.getGenre()
      } else {
        this.loadBooks(); // Load books initially when no search query is present
      }
    });


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

            this.totalBooks = data.length;
            this.updatePagedBooks();
            this.getGenre()
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
      book.genre = this.genres.find(genre => genre.genreID === book.category_id)?.name || 'Unknown';
    });
  }
  searchBook(query: string) {
    // Implement the searchBook method to fetch books based on the query
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
        this.books = this.books.filter(book => book.bookID !== id)

        this.loadBooks()

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
}
