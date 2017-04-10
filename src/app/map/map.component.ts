import { Component, OnInit, Directive } from '@angular/core';
import { MarkerDialogService } from '../services/marker-dialog.service';
import { MarkerInfoComponent } from '../marker-info/marker-info.component';
import { MapService } from '../services/map.service';
import { Proposal } from '../proposal';
import { Marker } from '../marker';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private _lat = 54.3512521;
  private _lng = 18.6153264;
  private _zoom = 12;
  private _streetViewControl = false;
  private _markers: Marker[] = [];
  public proposals: Proposal[];

  constructor(
    private dialogService: MarkerDialogService,
    private mapService:  MapService,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.mapService.getProposals().then(response => {
      response.forEach(item => this.addMarker(item));
    });
  }

  openDialog($event) {
    this.dialogService
      .showDialog($event.coords)
      .subscribe(result => result ?
        this.dialogService.sendProposal(result)
          .then(response => {
            this.addMarker(response);
            this.openSnackBar('Marker has been added.');
          }) :
        '');
  }

  addMarker(value) {
    const {latitude, longitude, id, street, locationDesc, trees} = value;

    this._markers.push({latitude, longitude, id, street, locationDesc, trees});
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
