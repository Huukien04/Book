import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Book, Genre } from './types/book';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  apiUrl ='http://localhost:3000/genres'
  apiUrlgetTotalByGenre ='http://localhost:3000/getTotalBookByGenre'
  http = inject(HttpClient)
 getAll(){
   return this.http.get<Genre[]>(this.apiUrl);
 }
 getDetail(id: string){
   return this.http.get(`${this.apiUrl}/${id}`);
 }
 getProductBycategory(categoryId: string){
   return this.http.get<Book>(`${this.apiUrl}?id=${categoryId}`);
 }
 getGenre(id:string){
  return this.http.get<Genre[]>(`${this.apiUrl}`);
 }
 addGenre(data: any){
   return this.http.post(this.apiUrl, data);
 }
 editBook(id:string,data:any){
   return this.http.put(`${this.apiUrl}/${id}`,data);
 }
 deleteBook(id:string){
   return this.http.delete(`${this.apiUrl}/${id}`);
 }
getTotalBookByGenre(){
  return this.http.get<any[]>(this.apiUrlgetTotalByGenre);
}

}
