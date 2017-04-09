import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {

  constructor(
    public dialogRef: MdDialogRef<AuthDialogComponent>
    ) { }

  onSubmit(form) {
    if(form.valid) {
      this.dialogRef.close(form.value);
    }
  }

}
