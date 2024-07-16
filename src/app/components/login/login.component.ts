import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';
import { LoginService } from 'src/app/login.service';
import { RegisterService } from 'src/app/register.service';
import { DialogAddTocartComponent } from '../dialog-add-tocart/dialog-add-tocart.component';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  router = inject(Router);

  @Input() loginService = inject(LoginService);

  isAuthenication: boolean = true;

  @Input() cartService = inject(CartService);



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

    if (this.loginForm.valid) {
      this.loginService.login(this.username?.value, this.password?.value).subscribe({
        next: (data) => {
           
             
        const result = data.results;
        const token = data.token;
        this.loginService.setCurrentUser(result[0],token);
        
            const expiresAt = moment().add(60, 'minute').valueOf();

            localStorage.setItem('id_token', token);
            localStorage.setItem('expires_at', JSON.stringify(expiresAt));

            this.router.navigate(['book/list']);
        
        },
        error: (err) => {
          console.error('Login error:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
   
  
  }
  register() {
    this.router.navigate(['register']);
  }



}
