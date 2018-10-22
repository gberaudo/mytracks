import {Injectable} from '@angular/core';
import OlMap from 'ol/Map';
// @ts-ignore
import {fromLonLat} from 'ol/proj';
import OlTileLayer from 'ol/layer/Tile';
import OlVectorLayer from 'ol/layer/Vector';
import OlView from 'ol/View';
import OlOSMSource from 'ol/source/OSM';
import OlVectorSource from 'ol/source/Vector';
import GPXFormat from 'ol/format/GPX';
// @ts-ignore
import {createEmpty, extend} from 'ol/extent';


import TrackManager from '@geoblocks/edittrack/src/TrackManager';
import OSRMRouter from '@geoblocks/router/src/OSRMRouter';
import {controlPointStyle, importLayerStyleFunction, trackLayerStyleFunction} from './style';

import PointGeometry from 'ol/geom/Point';
import Feature from 'ol/Feature';

import saveAs from 'save-as';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2JvMiIsImEiOiJjam5kbGpqcTUwZTJ5M3BueTd6dHB3aHk3In0.Gi-NTgWMekLzwkz59kaMTQ';

const MAPBOX_URLS = {
  'walking': 'https://api.mapbox.com/directions/v5/mapbox/walking',
  'cycling': 'https://api.mapbox.com/directions/v5/mapbox/cycling',
};


@Injectable(
  {
    providedIn: 'root'
  }
)
export class MapService {
  map: OlMap;
  private trackManager: TrackManager;
  private router: OSRMRouter;

  private importLayer: OlVectorLayer; // layer to display imported feature, e.g. from gpx

  constructor() {
    this.initMap();
  }

  private initMap() {
    const bgLayer = new OlTileLayer({
      source: new OlOSMSource()
    });
    const trackLayer = new OlVectorLayer({
      source: new OlVectorSource(),
      style: trackLayerStyleFunction
    });

    const importLayer = this.importLayer = new OlVectorLayer({
      source: new OlVectorSource,
      style: importLayerStyleFunction
    });

    const map = this.map = new OlMap({
      layers: [
        bgLayer,
        importLayer,
        trackLayer
      ],
      view: new OlView({
        center: fromLonLat([6.5628989, 46.5143871]),
        zoom: 13
      })
    });

    const projection = map.getView().getProjection();

    const router = this.router = new OSRMRouter({
      projection,
      url: MAPBOX_URLS['walking'],
      extraParams: `access_token=${MAPBOX_TOKEN}`
    });

    this.trackManager = new TrackManager({
      projection,
      map,
      trackLayer,
      router,
      style: controlPointStyle
    });
    this.trackManager.mode = 'edit';
  }

  public exportGpx() {
    const lineString = new GPXFormat().writeFeatures(
      [this.trackManager.getTrackFeature()],
      {
        featureProjection: this.map.getView().getProjection()
      }
    );

    const blob = new Blob([lineString], {type: 'application/gpx+xml'});

    saveAs(blob, 'mytrack.gpx');
  }

  private createControlPointFromCoordinate(coordinate: ol.Coordinate): ol.Feature {
    const geometry = new PointGeometry(coordinate);

    const feature = new Feature({
      geometry
    });
    feature.setProperties({
      type: 'controlPoint',
      snapped: true
    });
    return feature;
  }

  public setProfile(profile: string) {
    this.router.setUrl(MAPBOX_URLS[profile]);
  }

  public importGpx(data) {
    const features = new GPXFormat().readFeatures(data, {
      featureProjection: this.map.getView().getProjection()
    });

    // we import gpx as a ground layer to assist track creation, so we are interested in LineString features only.
    const lineFeatures = features.filter(feature => {
      return feature.getGeometry().getType() === 'LineString';
    });

    this.importLayer.getSource().clear();
    this.importLayer.getSource().addFeatures(lineFeatures);

    // fit map to imported features
    const extent = features.reduce((pre, feature) => {
      return extend(pre, feature.getGeometry().getExtent());
    }, createEmpty());
    this.map.getView().fit(extent, {
      padding: [100, 100, 100, 100],
      duration: 1000
    });
  }
}
