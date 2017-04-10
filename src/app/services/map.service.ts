import { Injectable } from '@angular/core';
import { Proposal } from '../proposal';
import { Headers, Http } from '@angular/http';

@Injectable()
export class MapService {
  private _baseUrl = 'https://band-api.dev.volanto.pl:13888';

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

  public getProposals(): Promise<Proposal[]> {
    const proposalUrl = `${this._baseUrl}/proposals`;

    return this.http.get(proposalUrl, { headers: this.getHeaders() })
               .toPromise()
               .then(response => response.json().content as Proposal[])
               .catch(this.handleError);
  }

}
