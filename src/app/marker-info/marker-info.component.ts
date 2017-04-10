import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-marker-info',
  templateUrl: './marker-info.component.html',
  styleUrls: ['./marker-info.component.scss']
})
export class MarkerInfoComponent implements OnInit {
  @Input() id: number;
  @Input() street: string;
  @Input() locationDesc: string;
  @Input() trees: number;

  constructor() { }

  ngOnInit() {
  }

}
