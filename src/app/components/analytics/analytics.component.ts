import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";
import { GenreService } from 'src/app/genre.service';
export type BookGenreData = {
  totalStockQuantity: number;
  genreName: string;
};
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  route = inject(Router);

  genreService = inject(GenreService);

  @ViewChild('chart') chart!: ChartComponent;

  listTotalBookByGenre: BookGenreData[] = [];

  ngOnInit(): void {
    this.genreService.getTotalBookByGenre().subscribe({
      next: (data:any) => {
       this.listTotalBookByGenre = data
       console.log(this.listTotalBookByGenre);
       
       this.updateChartOptions();
      }
    })
   
  }

  public chartOptions: Partial<ChartOptions> | any = {
    // biểu đồ tròn 
    series: [0, 0, 0, 0, 0],
    chart: {
      width: 380,
      type: 'pie'
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
       // biểu đồ cột
    // series: [{
    //   name: 'Stock Quantity',
    //   data: []
    // }],
    // chart: {
    //   type: 'bar', 
    //   height: 350
    // },
    // xaxis: {
    //   categories: []
    // },
    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 200
    //       },
    //       legend: {
    //         position: 'bottom'
    //       }
    //     }
    //   }
    // ]
  };

  // biểu đồ tròn
    private updateChartOptions(): void {
      this.chartOptions.series = this.listTotalBookByGenre.map(data => data.totalStockQuantity); 
     this.chartOptions.labels = this.listTotalBookByGenre.map(data => data.genreName); 
   }
  //biểu đồ cột
  // private updateChartOptions(): void {
  //   this.chartOptions.series = [{
  //     name: 'Stock Quantity',
  //     data: this.listTotalBookByGenre.map(data => data.totalStockQuantity)
  //   }];
  //   this.chartOptions.xaxis = {
  //     categories: this.listTotalBookByGenre.map(data => data.genreName)
  //   };
  // }


  public getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  listUser() {
    this.route.navigate(['user/list']);
  }

}
