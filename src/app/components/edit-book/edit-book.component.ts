import { Component, ChangeDetectionStrategy, inject, OnInit, Input, signal, } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogData, Genre } from 'src/app/types/book';
import { AddBookComponent } from '../add-book/add-book.component';
import { DialogAnimationsExampleDialogComponent } from '../dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { BookService } from 'src/app/book.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from 'src/app/genre.service';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})

export class EditBookComponent implements OnInit {

  routerlink = inject(Router);
  selectedFile: File | null = null;
  router = inject(ActivatedRoute);
  genreService = inject(GenreService);
  genres: Genre[] = [];
  @Input() idBook!: number;
  @Input() bookService = inject(BookService);
  ngOnInit() {
    this.router.params.subscribe((param) => {
      this.idBook = param['id'];

      this.bookService.getDetail(this.idBook).subscribe({
        next: (data) => {
          this.addForm.patchValue(data);
          console.log(data);
        },
        error(err) {
          console.log(err);

        },
      })
    })
    this.genreService.getAll().subscribe({
      next: (data) => {
        this.genres = data;
      }
    })
  }

  protected readonly value = signal('');

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
  get published_date() {
    return this.addForm.get('published_date');
  }
  get image() {
    return this.addForm.get('image')?.value;
  }

  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    published_date: new FormControl('', [Validators.required]),
    stock_quantity: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    genreID:new FormControl('', [Validators.required])
  })
  editBook() {
    if (this.addForm.valid) {
      this.bookService.editBook(this.idBook, this.addForm.value).subscribe({
        next: () => {
          console.log("Add success");
          this.routerlink.navigate(['/book/list']);
        },
        error: (err) => {
          console.error('Error adding book:', err);
        }
      });
    } else {
      console.error('Form is invalid.');
    }
  }
  handleEdit() {
    if (this.addForm.valid) {
      if (this.selectedFile) {
        const formData = new FormData();


        formData.append('image', this.selectedFile, this.selectedFile.name);
        this.bookService.uploadImage(this.selectedFile).subscribe({
          next: (response) => {




            this.editBook();
            this.addForm.patchValue({ image: response.filePath });
          },
          error: (err) => {
            console.error('Error uploading image:', err);
          }
        });
      } else {
        // Handle case where no file is selected but form is valid
        this.editBook();
      }
    } else {
      console.error('Form is invalid.');
    }
  }
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }
  

}
