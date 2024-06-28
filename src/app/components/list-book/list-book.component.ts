import { Component, Input, OnInit, inject } from '@angular/core';
import { BookService } from 'src/app/book.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  bookService = inject(BookService);
  @Input() books: Book[] = [];
  showFiller = false;

  toggleFiller() {
    this.showFiller = !this.showFiller;
  }


  ngOnInit() {
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.books = data;
        console.log(this.books);
        
      },
      error: (e) => {

        console.log(e);
      },
    })
  }

  handleDelete(id: string){
    this.bookService.deleteBook(id).subscribe({
      next:()=>{
        console.log("Delete Suces");
        
      },
      error:(e)=>{
        console.log(e);
        
      }
    })
  }
}
