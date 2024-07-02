export type Book={
    id: string ,
    title:string,
    author_id:string,
    category_id:string,
    publiched_date:string,
    genre:string,
    description:string,
    price:number,
    stock_quantity:number,
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