import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../user';

@Injectable()
export class UserService {
  private baseUrl='https://band-api.dev.volanto.pl:13888';
  private headers: Headers;

  constructor(private http: Http) { }

  private setHeaders(): Headers {
    return new Headers({
      'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  }

  getUser():Promise<User> {
    const myAccountUrl = `${this.baseUrl}/accounts/my/`;
    this.headers = this.setHeaders();
    return this.http.get(myAccountUrl, { headers: this.headers })
              .toPromise()
              .then(response => response.json() as User)
              .catch(error => console.log(error));
  }

}
