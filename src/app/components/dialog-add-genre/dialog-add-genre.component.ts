import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { GenreService } from 'src/app/genre.service';
import { Genre } from 'src/app/types/book';

@Component({
  selector: 'app-dialog-add-genre',
  templateUrl: './dialog-add-genre.component.html',
  styleUrls: ['./dialog-add-genre.component.css']
})
export class DialogAddGenreComponent implements OnInit {
  addgenre: string = '';
  genre!: Genre;
  protected readonly value = signal('');
  genreService = inject(GenreService);
  route = inject(Router);

  ngOnInit(): void {

  }
  add(){
    this.route.navigate(['/genres'])
  }

}
