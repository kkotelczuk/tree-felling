import { Component, OnInit } from '@angular/core';
import { MarkerDialogService } from '../services/marker-dialog.service';
import { MapService } from '../services/map.service';
import { Proposal } from '../proposal';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 54.3512521;
  lng = 18.6153264;
  zoom = 12;
  streetViewControl = false;
  markers = [];
  public proposals: Proposal[];

  constructor(
    private dialogService: MarkerDialogService,
    private mapService:  MapService
  ) { }

  ngOnInit() {
    this.mapService.getProposals().then(response => {
      this.proposals = response;
      localStorage.setItem('proposals', JSON.stringify(this.proposals));
      this.proposals.forEach(item => this.addMarker(item));
      console.log(response);
    });
  }

  openDialog($event) {
    this.dialogService
      .showDialog($event.coords)
      .subscribe(result => result ? this.dialogService.sendProposal(result)
        .then(response => this.addMarker(response)) : '');
  }

  addMarker(value) {
    this.markers.push({
      lat: value.latitude,
      lng: value.longitude,
      draggable: false
    });
  }
}
