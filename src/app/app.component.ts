import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _loggedIn: boolean = sessionStorage.getItem('token') ? true : false;
  private _isAdmin: boolean = sessionStorage.getItem('admin') ? true : false;
  private _usersList = [];

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    public snackBar: MdSnackBar
    ) {}

  openAuthDialog() {
    this.authService
      .showAuthDialog()
      .subscribe(result => result ? this.authService.authorizeUser(result)
        .then(() => {
          this._loggedIn = true;
          this.openSnackBar('Logging in successful.');
        })
        .catch((error) => {
          this.openSnackBar('There is an error, please try agian.');
        }) : '');
  }

  logout() {
    sessionStorage.clear();
    this.openSnackBar('You have been logout.');
    this._loggedIn = false;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  getUsers() {
    this.usersService.getAllUsers().then(response => this._usersList = response);
  }
}

