import { AfterViewInit, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { BookService } from 'src/app/book.service';
import { Book } from 'src/app/types/book';
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
import { ActivatedRoute } from '@angular/router';
import { GenreService } from 'src/app/genre.service';
import { HeaderComponent } from '../header/header.component';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit, AfterViewInit {

  bookService = inject(BookService);
  @Input() books: Book[] = [];
  pagedBooks: Book[] = [];
  showFiller = false;
  pageSize = 4;
  totalBooks = 0;
  currentPage = 0;
  genreId!: string;
  route = inject(ActivatedRoute);
  genreService = inject(GenreService);
  @ViewChild('app-header') keytoSearch = inject(HeaderComponent);
  key!: string;
  message!: string;
  data = inject(DataService);



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


  openDialog(book: Book): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialogComponent, {
      width: '250px',
      data: { book }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(book.id);
      if (result === 'confirm') {
        this.handleDelete(book.id);
        console.log(book.id);
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
      } else {
        this.loadBooks(); // Load books initially when no search query is present
      }
    });


    this.route.params.subscribe((param) => {
      this.genreId = param['id']
      if (this.genreId) {
        console.log(this.genreId);

        this.bookService.getBookbyGenre(this.genreId).subscribe({
          next: (data) => {
            this.books = data;
            this.totalBooks = data.length;
            this.updatePagedBooks();
          }

        })
      } else {
        this.bookService.getAll().subscribe({
          next: (data) => {
            this.books = data;

            this.totalBooks = data.length;
            this.updatePagedBooks();
          }
        })
      }
    })


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
  handleDelete(id: string) {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        console.log("Delete Suces");
        this.books = this.books.filter(book => book.id !== id)
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

}
