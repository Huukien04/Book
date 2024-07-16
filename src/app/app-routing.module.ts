import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBookComponent } from './components/list-book/list-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { DialogAddGenreComponent } from './components/dialog-add-genre/dialog-add-genre.component';
import { AddGenreComponent } from './components/add-genre/add-genre.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { ChatComponent } from './components/chat/chat.component';


const routes: Routes = [
 
  {
    path: 'book/edit/:id',
    component: EditBookComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'book/add',
    component: AddBookComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'book/list',
    component: ListBookComponent,
    canActivate:[AuthGuard]

  },
  {
    path: 'category/:id',
    component: ListBookComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'genres',
    component: AddGenreComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'cart',
    component: ShoppingcartComponent
 
  },
  {
    path: 'chat',
    component: ChatComponent
 
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
