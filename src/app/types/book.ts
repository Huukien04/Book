    import { DatePipe } from "@angular/common";
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from "ng-apexcharts";

    export class Book {
        bookID: number = 0;
        title: string = "";
        author_id: string = "";
        genreID: number = 0;
        published_date: string = "";
        genreName: string = "";
        name: string = "";
        description: string = "";
        price: number = 0;
        stock_quantity: number = 0;
        image: string = "";

        get total() {
            return this.price * this.stock_quantity;
        }
    }

    export interface interfaceCart{
        cartID: number ;
        userID : number;
        bookID : number;
        total:number;
       
        title: string;
        author_id: string;
        genreID: number;
        published_date: string ;
        genreName: string ;
        name: string ;
        description: string ;
        price: number;
        stock_quantity: number;
        image: string;

    }

    export type Genre = {
        genreID: number,
        name: string
    }
    export interface DialogData {
        animal: string;
        name: string;
    }

    export interface User {
        userID: number,
        userName: string,
        userPass:string,
        token: string,
        expiresIn: string,
        role:string,
        idToken: string
    }
    export type ChartOptions = {
        series: ApexNonAxisChartSeries;
        chart: ApexChart;
        responsive: ApexResponsive[];
        labels: any;
      };


