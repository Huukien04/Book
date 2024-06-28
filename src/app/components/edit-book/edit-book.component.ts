import { Component,ChangeDetectionStrategy, inject, OnInit, } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogData } from 'src/app/types/book';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})

export class EditBookComponent implements OnInit{

 

  constructor(
    private dialogRef: MatDialogRef<EditBookComponent>, // Inject MatDialogRef
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    console.log('Component initialized');
  }

  closeDialog(): void {
    this.dialogRef.close(); 
  }

  openDialog(enterAnimationDuration:any,exitAnimationDuration:any): void {
    this.dialog.open(EditBookComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
