import { Component } from '@angular/core';
import { MarkerDialogService } from './services/marker-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dialogService: MarkerDialogService) {}
}

