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
  private baseUrl = 'https://band-api.dev.volanto.pl:13888';
  private proposal: Proposal = {} as Proposal;

  constructor(
    private dialog: MdDialog,
    private http: Http,
    public snackBar: MdSnackBar
  ) {}

  private getHeaders(): Headers {
    return new Headers({
      'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private validateGis(lat, lng):Promise<any> {
    const gisUrl = `${this.baseUrl}/proposals/gis/validate/?latitude=${lat}&longitude=${lng}`;

    return this.http.get(gisUrl, { headers: this.getHeaders() })
               .toPromise()
               .then(response => response.json().features)
               .catch(error => this.handleError(error));
  }

  public showDialog(coords): Observable<any> {
    let dialogRef: MdDialogRef<MarkerDialogComponent>;
    const {lat, lng} = coords;
    this.validateGis(lat, lng).then(response => {
      if(Array.isArray(response) && response.length > 0) {
        const data = response[0].attributes;

        this.proposal.latitude = lat;
        this.proposal.longitude = lng;
        this.proposal.precinct = data.obreb;
        this.proposal.parcelNumber = data.numer_dz;
        data.allowed ?
        dialogRef.componentInstance.allowed = data.allowed :
        dialogRef.componentInstance.error = 'It is not allowed to plce marker here.'
      }
      else{
        dialogRef.componentInstance.error = 'You can mark parcels only in Gmina Gdansk.';
      }
    }).catch(error => dialogRef.componentInstance.error = 'You have no premmision to perform  this action, please login.')
    dialogRef = this.dialog.open(MarkerDialogComponent);

    return dialogRef.afterClosed();
  }

  public sendProposal(value):Promise<any> {
    this.snackBar.open('Adding marker in progress...', '', {
      duration: 1000,
    });
    const proposalUrl = `${this.baseUrl}/proposals/`

    const user = JSON.parse(sessionStorage.getItem('userData')) as User;
    this.proposal = Object.assign(this.proposal, value.proposal, user)

    const putBody = JSON.stringify(this.proposal);
    return this.http.put(proposalUrl, putBody,  { headers: this.getHeaders() })
              .toPromise()
              .then(response => response.json() as Proposal)
              .catch(error => this.handleError(error));
  }
}
