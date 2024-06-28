import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Book } from './types/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl ='http://localhost:3000/books'
 http = inject(HttpClient)
getAll(){
  return this.http.get<Book[]>(this.apiUrl);
}
getDetail(id: string){
  return this.http.get(this.apiUrl);
}
getProductBycategory(categoryId: string){
  return this.http.get(`${this.apiUrl}?category_id=${categoryId}`);
}

addBook(data: any){
  return this.http.post(this.apiUrl, data);
}
editBook(id:string,data:any){
  return this.http.put(`${this.apiUrl}/${id}`,data);
}
deleteBook(id:string){
  return this.http.delete(`${this.apiUrl}/${id}`);

}
}
