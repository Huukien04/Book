import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { GenreService } from 'src/app/genre.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.css']
})
export class AddGenreComponent implements OnInit {
  protected readonly value = signal('');
  genreService = inject(GenreService);
  router=inject(Router);
  get name() {
    return this.addForm.get('name');
  }
  addForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {

  }

  handleAdd() {
    if (this.addForm.valid) {

      this.genreService.addGenre(this.addForm.value).subscribe({
        next: () => {
          console.log("Add genre succes");
          this.router.navigate(['book/list'])
        },error(err) {
          console.log(err);
          
        },
        
      })
    }
    else {
      console.error('Form is invalid.');
    }
  }

}
