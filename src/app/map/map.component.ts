import {Component, OnInit} from '@angular/core';

import OlMap from 'ol/Map';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OlOSMSource from 'ol/source/OSM';
// @ts-ignore
import {fromLonLat} from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const map = new OlMap({
      target: 'map',
      layers: [
        new OlTileLayer({
          source: new OlOSMSource()
        })
      ],
      view: new OlView({
        center: fromLonLat([6.5628989, 46.5143871]),
        zoom: 13
      })
    });
  }
}
