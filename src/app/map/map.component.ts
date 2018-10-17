import {Component, OnInit} from '@angular/core';

import OlMap from 'ol/Map';
import OlTileLayer from 'ol/layer/Tile';
import OlVectorLayer from 'ol/layer/Vector';
import OlView from 'ol/View';
import OlOSMSource from 'ol/source/OSM';
import OlVectorSource from 'ol/source/Vector';
// @ts-ignore
import {fromLonLat} from 'ol/proj';
import {MapService} from './map.service';
import 'ol/ol.css';

import TrackManager from '@geoblocks/edittrack/src/TrackManager';
import OSRMRouter, {OSRM_DEFAULT_PROFILE_URL} from '@geoblocks/router/src/OSRMRouter';
import {styleFunction, controlPoint} from './style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService) {
  }

  ngOnInit() {

    const bgLayer = new OlTileLayer({
      source: new OlOSMSource()
    });
    const trackLayer = new OlVectorLayer({
      source: new OlVectorSource(),
      style: styleFunction
    });

    const map = this.mapService.map = new OlMap({
      target: 'map',
      layers: [
        bgLayer,
        trackLayer
      ],
      view: new OlView({
        center: fromLonLat([6.5628989, 46.5143871]),
        zoom: 13
      })
    });

    const projection = map.getView().getProjection();

    const router = new OSRMRouter({
      projection,
      url: OSRM_DEFAULT_PROFILE_URL
    });
    const trackManager = new TrackManager({
      projection,
      map,
      trackLayer,
      router,
      style: controlPoint
    });
    trackManager.mode = 'edit';
  }
}
