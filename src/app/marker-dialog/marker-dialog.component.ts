import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-marker-dialog',
  templateUrl: './marker-dialog.component.html',
  styleUrls: ['./marker-dialog.component.scss']
})
export class MarkerDialogComponent {
  public error: string;
  public allowed: boolean;

  constructor(
    public dialogRef: MdDialogRef<MarkerDialogComponent>) {
  }

  onSubmit(formValue) {
    if(formValue.valid) {
      this.dialogRef.close(formValue.value);
    }
  }

}
