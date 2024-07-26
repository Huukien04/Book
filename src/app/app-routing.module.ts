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
import { RoleAuthGuard } from './components/roleguards/role-guard.guard';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ListUserComponent } from './components/list-user/list-user.component';


const routes: Routes = [
 
  {
    path: 'book/edit/:id',
    component: EditBookComponent,
    canActivate:[AuthGuard,RoleAuthGuard],
    data:{
      expectedRoles: ['Admin']
    }
  },
  {
    path: 'book/add',
    // loadChildren: () => import('./modules/add-book/add-book.module').then(m => m.AddBookModule),
    component:AddBookComponent,
    canActivate:[AuthGuard,RoleAuthGuard],
    data:{
      expectedRoles: ['Admin']
    }
  },
  {
    path: 'book/list',
    // loadChildren: () => import('./modules/datboard/datboard.module').then(m => m.DatboardModule),
   component:ListBookComponent,
    canActivate:[AuthGuard], 

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
    canActivate:[AuthGuard,RoleAuthGuard],
    data:{
      expectedRoles: ['Admin']
    }
  },
  {
    path: 'cart',
    // loadChildren: () => import('./modules/addcart/addcart-routing.module').then(m => m.AddcartRoutingModule)
    component:ShoppingcartComponent
 
  },
  {
    path: 'chat',
    component: ChatComponent
 
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
 
  },
  {
    path: 'user/list',
    component: ListUserComponent
 
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
