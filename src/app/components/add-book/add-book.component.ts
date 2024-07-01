import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { BookService } from 'src/app/book.service';
import { GenreService } from 'src/app/genre.service';
import { Genre } from 'src/app/types/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookID!:string;
  router=inject(Router)
  @Input() bookService = inject(BookService);
  protected readonly value = signal('');
genreService=inject(GenreService);
genres:Genre[]=[];

ngOnInit() {
  this.genreService.getAll().subscribe({
    next:(data)=>{
      this.genres=data;
    }
  })
  
}

  get nameBook() {
    return this.addForm.get('nameBook');
  }
  get nameAuthor(){
    return this.addForm.get('nameAuthor');
  }
  get quantity(){
    return this.addForm.get('quantity');
  }
  get price(){
    return this.addForm.get('price')?.value;
  }
  get description(){
    return this.addForm.get('description');
  }
  get publicDate(){
    return this.addForm.get('publicDate');
  }
  get image(){
    return this.addForm.get('image')?.value;
  }
  
  addForm:FormGroup=new FormGroup({
    title:new FormControl('',[Validators.required]),
    author_id:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    category_id:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    published_date:new FormControl('',[Validators.required]),
    stock_quantity: new FormControl('',[Validators.required]),
    image:new FormControl('',[Validators.required])
  })
 


  handleAdd(){
    if(this.addForm.valid){
      this.bookService.addBook(this.addForm.value).subscribe({
        next:()=>{
          console.log("add succes");
          this.router.navigate(['/book/list']);
        },
        error(err) {
          console.log(err);
          
        },

      })
    }
  }
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
