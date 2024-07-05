import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBookComponent } from './components/list-book/list-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { DialogAddGenreComponent } from './components/dialog-add-genre/dialog-add-genre.component';
import { AddGenreComponent } from './components/add-genre/add-genre.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'book/list',
    component: ListBookComponent
  },
  {
    path: 'book/edit/:id',
    component: EditBookComponent
  },
  {
    path: 'book/add',
    component: AddBookComponent
  },
  {
    path: 'book/list',
    component: ListBookComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  
  {
    path: 'category/:id',
    component: ListBookComponent
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
    component: AddGenreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
