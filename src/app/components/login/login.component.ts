import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { LoginService } from 'src/app/login.service';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Inject(DOCUMENT) private document!: Document;
  router = inject(Router);
  isAuthenication: boolean = true;

  private registerService = inject(RegisterService);
  private loginService = inject(LoginService);

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  loginForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required])

  })





  ngOnInit() {

  }

  onSubmit() {
    // this.loginService.getUser().subscribe({
    //   next: (data: any) => {


    //     const user = data.find((user: any) => user.userName === this.username?.value && user.userPass === this.password?.value);

    //     if (user) {

    //       this.router.navigate(['book/list']);
    //     } else {

    //       console.error('Invalid username or password');

    //     }
    //   },
    //   error: error => {
    //     // Handle error here
    //     console.error(error);

    //   }
    // });
    this.registerService.getUser().subscribe({
      next: (data: any) => {
        const user = data.find((user: any) => user.userName === this.username?.value && user.userPass === this.password?.value);

        if (user) {
          const token = user.token;
          const expiresAt = moment().add(60, 'minute').valueOf();
          this.isAuthenication = true;
          localStorage.setItem('id_token', token);
          localStorage.setItem('expires_at', JSON.stringify(expiresAt));

          this.router.navigate(['book/list']);



        } else {
          console.error('Invalid username or password');
        }
      },
      error: error => {
        console.error(error);
      }
    });
  }
  register() {
    this.router.navigate(['register']);
  }



}
