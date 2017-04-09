import { Component, OnInit } from '@angular/core';
import { MarkerDialogService } from '../services/marker-dialog.service';

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

  constructor(private dialogService: MarkerDialogService) { }

  ngOnInit() {
  }

  addMarker($event) {
    this.dialogService
      .showDialog($event.coords)
      .subscribe(result => result ? this.dialogService.sendProposal(result) : '');
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    });
  }
}
