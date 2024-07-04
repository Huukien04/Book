import { Component, ElementRef, Input, OnInit, ViewChild, inject, signal } from '@angular/core';
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

  bookID!: string;
  router = inject(Router)
  @Input() bookService = inject(BookService);
  protected readonly value = signal('');
  genreService = inject(GenreService);
  genres: Genre[] = [];
  selectedFile: File | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  ngOnInit() {
    this.genreService.getAll().subscribe({
      next: (data) => {
        this.genres = data;
        console.log(data);
        
      }
    })

  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }
  addBook() {
    if (this.addForm.valid) {
      this.bookService.addBook(this.addForm.value).subscribe({
        next: () => {
          console.log("Add success");
          this.router.navigate(['/book/list']);
        },
        error: (err) => {
          console.error('Error adding book:', err);
        }
      });
    } else {
      console.error('Form is invalid.');
    }
  }

  get nameBook() {
    return this.addForm.get('title');
  }
  get nameAuthor() {
    return this.addForm.get('author_id');
  }
  get quantity() {
    return this.addForm.get('stock_quantity');
  }
  get price() {
    return this.addForm.get('price')?.value;
  }
  get description() {
    return this.addForm.get('description');
  }
  get publiched_date() {
    return this.addForm.get('publiched_date');
  }
  get image() {
    return this.addForm.get('image')?.value;
  }

  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    
    description: new FormControl('', [Validators.required]),
    published_date: new FormControl('', [Validators.required]),
    stock_quantity: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  })



  handleAdd() {
    if (this.addForm.valid) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile, this.selectedFile.name);
        this.bookService.uploadImage(this.selectedFile).subscribe({
          next: (response) => {   
            this.addBook();      
            this.addForm.patchValue({ image: response.filePath });
             
          },
          error: (err) => {
            console.error('Error uploading image:', err);
          }
        });
      } else {
        // Handle case where no file is selected but form is valid
        this.addBook();
      }
    } else {
      console.error('Form is invalid.');
    }
  }
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

}
