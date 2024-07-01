import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBookComponent } from './components/list-book/list-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';

const routes: Routes = [
  {
    path:'book/list',
    component:ListBookComponent
  },
  {
    path:'book/edit/:id',
    component:EditBookComponent
  },
  {
    path:'book/add',
    component:AddBookComponent
  },
  {
    path:'book/list',
    component:ListBookComponent
  },
  {
    path:'',
    component:ListBookComponent
  },
  {
path:'category/:id',
component:ListBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
