import { Injectable } from '@angular/core';
import { MarkerDialogComponent } from '../marker-dialog/marker-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { Proposal } from '../proposal';
import { User } from '../user';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class MarkerDialogService {
  private _baseUrl = 'https://band-api.dev.volanto.pl:13888';
  private _proposal: Proposal = {} as Proposal;

  constructor(
    private dialog: MdDialog,
    private http: Http,
    public snackBar: MdSnackBar
  ) {}

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

  private validateGis(lat, lng): Promise<any> {
    const gisUrl = `${this._baseUrl}/proposals/gis/validate/?latitude=${lat}&longitude=${lng}`;

    return this.http.get(gisUrl, { headers: this.getHeaders() })
               .toPromise()
               .then(response => response.json().features)
               .catch(error => this.handleError(error));
  }

  public showDialog(coords): Observable<any> {
    const {lat, lng} = coords;
    let dialogRef: MdDialogRef<MarkerDialogComponent>;

    this.validateGis(lat, lng)
    .then(response => {
      if (Array.isArray(response) && response.length > 0) {
        const data = response[0].attributes;

        this._proposal.latitude = lat;
        this._proposal.longitude = lng;
        this._proposal.precinct = data.obreb;
        this._proposal.parcelNumber = data.numer_dz;

        data.allowed ?
        dialogRef.componentInstance.allowed = data.allowed :
        dialogRef.componentInstance.error = 'It is not allowed to plce marker here.';

      } else {
        dialogRef.componentInstance.error = 'You can mark parcels only in Gmina Gdansk.';
      }
    })
    .catch(error => dialogRef.componentInstance.error = 'You have no premmision to perform  this action, please login.');

    dialogRef = this.dialog.open(MarkerDialogComponent);

    return dialogRef.afterClosed();
  }

  public sendProposal(value): Promise<any> {
    const proposalUrl = `${this._baseUrl}/proposals/`;
    const user = JSON.parse(sessionStorage.getItem('userData')) as User;

    this._proposal = Object.assign(this._proposal, value.proposal, user);
    this.snackBar.open('Adding marker in progress...', '', {
      duration: 1000,
    });

    return this.http.put(
        proposalUrl,
        JSON.stringify(this._proposal),
        { headers: this.getHeaders() }
      ).toPromise()
       .then(response => response.json() as Proposal)
       .catch(error => this.handleError(error));
  }
}
