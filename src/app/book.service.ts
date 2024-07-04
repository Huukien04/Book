import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Book } from './types/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl ='http://localhost:3000/books';
  uploadUrl = 'http://localhost:3001/upload';
 http = inject(HttpClient)
getAll(){
  return this.http.get<Book[]>(this.apiUrl);
}
getDetail(id: number){
  return this.http.get<Book[]>(`${this.apiUrl}/${id}`);
}
getBookbyGenre(genreId:number){
  return this.http.get<Book[]>(`${this.apiUrl}?category_id=${genreId}`)
}
searchBook(title:string){
  return this.http.get<Book[]>(`${this.apiUrl}?title_like=${title}`)
}
addBook(data: any){
  return this.http.post(this.apiUrl, data);
}
editBook(id:number,data:any){
  return this.http.put(`${this.apiUrl}/${id}`,data);
}
deleteBook(id:number){
  return this.http.delete(`${this.apiUrl}/${id}`);
}
uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    // Adjust the endpoint and response handling as per your backend API
    return this.http.post<{ filePath: string }>(this.uploadUrl, formData);
  }

uploadFile(formData: FormData): Observable<any> {
  return this.http.post(this.uploadUrl, formData);
}
}
