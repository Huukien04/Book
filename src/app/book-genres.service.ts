import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Book, Genre } from './types/book';

@Injectable({
  providedIn: 'root'
})
export class BookGenresService {

  apiUrl ='http://localhost:3000/bookgenre';
 http = inject(HttpClient)
//  addBookGenre(bookID: number, genreID: number) {
//   return this.http.post(this.apiUrl, { bookID, genreID });
// }
getGenresBook(){
  return this.http.get(this.apiUrl);
}

}
