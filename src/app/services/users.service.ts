import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
  private _baseUrl = 'https://band-api.dev.volanto.pl:13888/accounts/';

  constructor(private http: Http) { }

  private getHeaders(): Headers {
    return new Headers({
      'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  public getAllUsers(): Promise<any> {
    return this.http.get(this._baseUrl, { headers: this.getHeaders() })
           .toPromise()
           .then(response => response.json().content)
           .catch(this.handleError);
  }
}
