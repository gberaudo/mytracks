import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {fromLonLat} from 'ol/proj';
import {MapService} from './map.service';
import 'ol/ol.css';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.mapService.initMap();
  }

  exportGpx() {
    this.mapService.exportGpx();
  }
}
