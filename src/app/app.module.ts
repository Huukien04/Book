import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ListBookComponent } from './components/list-book/list-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import { DialogAnimationsExampleDialogComponent } from './components/dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { FooterComponent } from './components/footer/footer.component';
import {Sort, MatSortModule} from '@angular/material/sort';
import { PricePipe } from './components/price.pipe';
import { DialogAddGenreComponent } from './components/dialog-add-genre/dialog-add-genre.component';
import { AddGenreComponent } from './components/add-genre/add-genre.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import {MatBadgeModule} from '@angular/material/badge';
import { DialogAddTocartComponent } from './components/dialog-add-tocart/dialog-add-tocart.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogAddUserComponent } from './components/dialog-add-user/dialog-add-user.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ChatComponent } from './components/chat/chat.component';

import { FlexLayoutModule } from "@angular/flex-layout";

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    AddBookComponent,
    ListBookComponent,
    HeaderComponent,
    EditBookComponent,
    DialogAnimationsExampleDialogComponent,
    FooterComponent,
    PricePipe,
    DialogAddGenreComponent,
    AddGenreComponent,
    RegisterComponent,
    ShoppingcartComponent,
    DialogAddTocartComponent,
    DialogAddUserComponent,
    ChatComponent
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatGridListModule,
    HttpClientModule,
    MatSnackBarModule,
    
    MatListModule,
    MatSelectModule,
    MatPaginatorModule,
    DragDropModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    NativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    SocketIoModule.forRoot(config),
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
