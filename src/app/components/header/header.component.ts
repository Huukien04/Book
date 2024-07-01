import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { GenreService } from 'src/app/genre.service';
import { Genre } from 'src/app/types/book';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toppings = new FormControl('');
  genres: Genre[] = [];
  genreService = inject(GenreService);
  router = inject(Router);
  @Output() newItemEvent = new EventEmitter<string>();
  @ViewChild('searchQuery') searchQuery!: ElementRef;
  message!: string;
  data=inject(DataService);



  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  keySearch() {
    this.message = this.searchQuery.nativeElement.value;
    this.data.changeMessage(this.message); 
  }

  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  newMessage() {
    this.messageSource.next(this.message);
    this.data.changeMessage(this.message); // Assuming changeMessage exists in DataService
  }

  ngOnInit() {

    this.data.currentMessage.subscribe(message => this.message = message);


    this.genreService.getAll().subscribe({
      next: (data) => {
        this.genres = data;
        console.log(this.genres);

      }
    })
  }
  listBook() {
    this.router.navigate(['book/list'])
  }
  onSearch(query: string) {
    console.log('Search query:', query);

  }
  home() {
    this.router.navigate(['book/list'])
  }
  add() {
    this.router.navigate(['book/add'])
  }
}
