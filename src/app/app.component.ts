import { Component } from '@angular/core';
import { MarkerDialogService } from './services/marker-dialog.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private dialogService: MarkerDialogService,
    private authService: AuthService
    ) {}

  openAuthDialog() {
    this.authService
      .showAuthDialog()
      .subscribe(result => result ? this.authService.authorizeUser(result).then(res => console.log(res)) : '');
  }
}

