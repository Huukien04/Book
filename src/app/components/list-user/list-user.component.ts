import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import {  User } from 'src/app/types/book';
import { UserService } from 'src/app/user.service';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUserComponent implements OnInit{

  listUserService = inject(UserService);

  listUser: User[] = [];

  @ViewChild('chart') chart!: ChartComponent;

public chartOptions: Partial<ChartOptions>| any = {
    series: [0,0,0,0,0],
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
  };
  ngOnInit(): void {

    this.listUserService.getAllUser().subscribe({

      next:(userarr)=>{

        this.listUser = userarr;
        this.updateChartOptions();
      }
    })
  
  }
  private updateChartOptions(): void {
     this.chartOptions.series = this.listUser.map(user => user.userID); 
    this.chartOptions.labels = this.listUser.map(user => user.userName); 
  }

}
