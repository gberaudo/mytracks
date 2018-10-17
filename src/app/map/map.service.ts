import {Injectable} from '@angular/core';
import OlMap from 'ol/Map';
// @ts-ignore
import {fromLonLat} from 'ol/proj';
import OlTileLayer from 'ol/layer/Tile';
import OlVectorLayer from 'ol/layer/Vector';
import OlView from 'ol/View';
import OlOSMSource from 'ol/source/OSM';
import OlVectorSource from 'ol/source/Vector';

import TrackManager from '@geoblocks/edittrack/src/TrackManager';
import OSRMRouter from '@geoblocks/router/src/OSRMRouter';
import {controlPointStyle, trackLayerStyleFunction} from './style';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2JvMiIsImEiOiJjam5kbGpqcTUwZTJ5M3BueTd6dHB3aHk3In0.Gi-NTgWMekLzwkz59kaMTQ';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class MapService {
  map: OlMap;

  public initMap() {
    const bgLayer = new OlTileLayer({
      source: new OlOSMSource()
    });
    const trackLayer = new OlVectorLayer({
      source: new OlVectorSource(),
      style: trackLayerStyleFunction
    });

    const map = this.map = new OlMap({
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

    const MAPBOX_URL = 'https://api.mapbox.com/directions/v5/mapbox/walking';

    const router = new OSRMRouter({
      projection,
      url: MAPBOX_URL,
      extraParams: `access_token=${MAPBOX_TOKEN}`
    });
    const trackManager = new TrackManager({
      projection,
      map,
      trackLayer,
      router,
      style: controlPointStyle
    });
    trackManager.mode = 'edit';
  }
}
