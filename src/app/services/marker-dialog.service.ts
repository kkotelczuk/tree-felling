import { Injectable } from '@angular/core';
import { MarkerDialogComponent } from '../marker-dialog/marker-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { Proposal } from '../proposal';
import { User } from '../user';
import { UserService } from './user.service';

@Injectable()
export class MarkerDialogService {
  private baseUrl = 'https://band-api.dev.volanto.pl:13888';
  private proposal: Proposal = {} as Proposal;
  private user: User;
  private headers: Headers;

  constructor(
    private dialog: MdDialog,
    private http: Http,
    private userService: UserService
  ) {}

  private setHeaders(token): Headers {
    return new Headers({
      'X-AUTH-TOKEN': token,
      'Content-Type': 'application/json'
    })
  }

  private validateGis(lat, lng):Promise<any> {
    const gisUrl = `${this.baseUrl}/proposals/gis/validate/?latitude=${lat}&longitude=${lng}`;
    this.userService.getUser().then(response => {
      this.user = response;
      this.headers = this.setHeaders(response.token);
    });

    return this.http.get(gisUrl, { headers: this.headers })
               .toPromise()
               .then(response => response.json().features)
               .catch(error => console.log(error));
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
        dialogRef.componentInstance.allowed = data.allowed;
      }
      else{
        dialogRef.componentInstance.error = 'You can mark parcels only in Gmina Gdansk.';
      }
    })
    dialogRef = this.dialog.open(MarkerDialogComponent);

    return dialogRef.afterClosed();
  }

  public sendProposal(value):Promise<any> {
    const proposalUrl = `${this.baseUrl}/proposals/`
    this.proposal.name = this.user.name;
    this.proposal.lastName = this.user.lastName;
    this.proposal.email = this.user.email;
    this.proposal = Object.assign(this.proposal, value.proposal)

    const putBody = JSON.stringify(this.proposal);
    return this.http.put(proposalUrl, putBody,  { headers: this.headers })
              .toPromise()
              .then(response => response.json() as Proposal)
              .catch(error => console.log(error));
  }
}
