import { DatePipe } from "@angular/common";

export type Book={
    bookID: number ,
    title:string,
    author_id:string,
    category_id:number,
    publiched_date:string,
    genre:string,
    description:string,
    price:number,
    stock_quantity:number,
    image:string
}
export type Genre={
    genreID:number,
    name:string
}
export interface DialogData {
    animal: string;
    name: string;
}
