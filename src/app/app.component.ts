import { Component } from '@angular/core';
import { MarkerDialogService } from './services/marker-dialog.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn: boolean = sessionStorage.getItem('token')? true : false;

  constructor(
    private dialogService: MarkerDialogService,
    private authService: AuthService
    ) {}

  openAuthDialog() {
    this.authService
      .showAuthDialog()
      .subscribe(result => result ? this.authService.authorizeUser(result).then(() => this.loggedIn = true) : '');
  }

  logout() {
    sessionStorage.clear();
    this.loggedIn = false;
  }
}

