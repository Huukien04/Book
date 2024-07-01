import { Component, ChangeDetectionStrategy, inject, OnInit, Input, signal, } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogData } from 'src/app/types/book';
import { AddBookComponent } from '../add-book/add-book.component';
import { DialogAnimationsExampleDialogComponent } from '../dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { BookService } from 'src/app/book.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})

export class EditBookComponent implements OnInit {

  routerlink = inject(Router);
  router = inject(ActivatedRoute);

  @Input()idBook!: string;
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
  }

  protected readonly value = signal('');
  get nameBook() {
    return this.addForm.get('nameBook');
  }
  get nameAuthor() {
    return this.addForm.get('nameAuthor');
  }
  get quantity() {
    return this.addForm.get('quantity');
  }
  get price() {
    return this.addForm.get('price')?.value;
  }
  get description() {
    return this.addForm.get('description');
  }
  get publicDate() {
    return this.addForm.get('publicDate');
  }
  get image() {
    return this.addForm.get('image')?.value;
  }

  addForm: FormGroup = new FormGroup({
    nameBook: new FormControl('', [Validators.required]),
    nameAuthor: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    publicDate: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  })


  handleEdit() {
    if (this.addForm.valid) {
      this.bookService.editBook(this.idBook,this.addForm.value).subscribe({
        next: () => {
          console.log("add succes");
          this.routerlink.navigate(['/book/list']);
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
