import { Injectable } from '@angular/core';
import { Proposal } from '../proposal';
import { Http } from '@angular/http';

@Injectable()
export class MapService {
  private baseUrl = 'https://band-api.dev.volanto.pl:13888';

  constructor(private http: Http) { }

  getProposals(): Promise<Proposal[]> {
    const proposalUrl = `${this.baseUrl}/proposals`
    return this.http.get(proposalUrl)
               .toPromise()
               .then(response => response.json().content as Proposal[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
