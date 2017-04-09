import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { User } from '../user';

@Injectable()
export class AuthService {
  private baseUrl='https://band-api.dev.volanto.pl:13888/tokens';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private dialog: MdDialog,
    private http: Http
    ) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  public showAuthDialog(): Observable<any> {
    let dialogRef: MdDialogRef<AuthDialogComponent>;
    dialogRef = this.dialog.open(AuthDialogComponent);

    return dialogRef.afterClosed();
  }

  public authorizeUser(value): Promise<any> {
    const postBody = JSON.stringify(value.auth);
    return this.http.post(this.baseUrl, postBody,  { headers: this.headers })
              .toPromise()
              .then(response => {
                const { token, lastName, name, email, isAdmin } = response.json();
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('admin', isAdmin);
                sessionStorage.setItem('userData', JSON.stringify({lastName, name, email}));
              })
              .catch(error => this.handleError(error));
  }

}
