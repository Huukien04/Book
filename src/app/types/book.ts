export type Book={
    id: string ,
    title:string,
    author_id:string,
    category_id:string,
    published_date:string,
    genre:string,
    description:string,
    price:string,
    stock_quantity:string,
    image:string
}
export type Genre={
   id:string,
    name:string
}
export interface DialogData {
    animal: string;
    name: string;
  }