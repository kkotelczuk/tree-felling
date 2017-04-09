import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  private baseUrl='https://band-api.dev.volanto.pl:13888/tokens';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private dialog: MdDialog,
    private http: Http
    ) { }

  public showAuthDialog(): Observable<any> {
    let dialogRef: MdDialogRef<AuthDialogComponent>;
    dialogRef = this.dialog.open(AuthDialogComponent);

    return dialogRef.afterClosed();
  }

  public authorizeUser(value): Promise<any> {
    console.log(value)
    const postBody = JSON.stringify(value.auth);
    return this.http.post(this.baseUrl, postBody,  { headers: this.headers })
              .toPromise()
              .then(response => {
                let token = response.json().token;
                sessionStorage.setItem('token', token);
              })
              .catch(error => console.log(error));
  }

}
