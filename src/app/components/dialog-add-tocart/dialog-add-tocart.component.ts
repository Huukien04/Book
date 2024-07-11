import { Component, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-add-tocart',
  templateUrl: './dialog-add-tocart.component.html',
  styleUrls: ['./dialog-add-tocart.component.css']
})
export class DialogAddTocartComponent {
  snackBarRef = inject(MatSnackBarRef);
}
