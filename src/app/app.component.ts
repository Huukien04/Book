  import { Component, inject, OnInit } from '@angular/core';
  import { CanActivateFn, NavigationEnd, Router } from '@angular/router';
  import { LoginComponent } from './components/login/login.component';


  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit {
    title = 'WebBook';
    showHeader = true;

    constructor(private router: Router) {}
  
    ngOnInit() {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.showHeader = event.url !== '/login';
        }
      });
    }
  }
