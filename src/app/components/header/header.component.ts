import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { GenreService } from 'src/app/genre.service';
import { Genre } from 'src/app/types/book';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { BehaviorSubject, Subject, debounceTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddGenreComponent } from '../dialog-add-genre/dialog-add-genre.component';
import { LoginService } from 'src/app/login.service';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  readonly dialog = inject(MatDialog);


  toppings = new FormControl('');
  genres: Genre[] = [];
  genreService = inject(GenreService);
  router = inject(Router);
  @Output() newItemEvent = new EventEmitter<string>();
  @ViewChild('searchQuery') searchQuery!: ElementRef;
  message!: string;
  data = inject(DataService);
  inputText: string = '';
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 1000;
  user = inject(LoginService);
  constructor() { }
  userName:string='';
  ngOnDestroy() {
    this.searchSubject.complete();
  }
 
  onSearch() {
    this.searchSubject.next(this.inputText);   
   
  
    
  }

  openDialog() {

    const dialogRef = this.dialog.open(DialogAddGenreComponent);

   dialogRef.afterClosed().subscribe(result => {

      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.user.getUser().subscribe({
      next(value) {
        
      },
    })
    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {      
      this.data.changeMessage(searchValue);
    });
    this.data.currentMessage.subscribe(message => this.message = message);
  
    
    this.genreService.getAll().subscribe({
      next: (data) => {
        this.genres = data;
      }
    }) 
  }
  listBook() {
    this.router.navigate(['book/list'])
  }
 
  home() {
    this.router.navigate(['book/list'])
  }
  add() {
    this.router.navigate(['book/add'])
  }
}
