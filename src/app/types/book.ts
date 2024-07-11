import { DatePipe } from "@angular/common";

export type Book={
    bookID: number ,
    title:string,
    author_id:string,
    genreID:number,
    published_date:string,
    genreName:string,
    name:string,
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

export type User={
    userID:number,
    userName:string,
    token:string,
    expiresIn:string,
    idToken:string
}




