import {Injectable} from '@angular/core';
import OlMap from 'ol/Map';
// @ts-ignore
import {fromLonLat, addCommon} from 'ol/proj';
import OlTileLayer from 'ol/layer/Tile';
import OlVectorLayer from 'ol/layer/Vector';
import OlView from 'ol/View';
import OlOSMSource from 'ol/source/OSM';
import OlVectorSource from 'ol/source/Vector';
import GPXFormat from 'ol/format/GPX';
import GeoJSONFormat from 'ol/format/GeoJSON';

// @ts-ignore
import {createEmpty, extend} from 'ol/extent';


import TrackManager from '@geoblocks/edittrack/src/TrackManager';
import OSRMRouter from '@geoblocks/router/src/OSRMRouter';
import {controlPointStyle, importLayerStyleFunction, trackLayerStyleFunction} from './style';

import PointGeometry from 'ol/geom/Point';
import Feature from 'ol/Feature';

import saveAs from 'save-as';
import { GeoJsonObject } from 'geojson';
import { TrackListItem, ApiService } from '../api.service';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2JvMiIsImEiOiJjam5kbGpqcTUwZTJ5M3BueTd6dHB3aHk3In0.Gi-NTgWMekLzwkz59kaMTQ';

const MAPBOX_URLS = {
  'walking': 'https://api.mapbox.com/directions/v5/mapbox/walking',
  'cycling': 'https://api.mapbox.com/directions/v5/mapbox/cycling',
};

const geojsonFormat = new GeoJSONFormat();
addCommon();

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
  userTracks: Array<TrackListItem> = [];

  constructor(private apiService: ApiService) {
    this.initMap();
  }


  updateTracksList() {
    this.apiService.listTracks().then(tracks => this.userTracks = tracks);
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
    // const lineFeatures = features.filter(feature => {
    //   return feature.getGeometry().getType() === 'LineString'; // TODO: or MultiLineString
    // });

    this.importLayer.getSource().clear();
    this.importLayer.getSource().addFeatures(features);

    // fit map to imported features
    this._fitMapToFeatures(features);
  }

  clearTrack() {
    this.trackManager.clear();
  }

  private _fitMapToFeatures(features: Array<Feature>) {
    const extent = features.reduce((pre, feature) => {
      return extend(pre, feature.getGeometry().getExtent());
    }, createEmpty());
    this.map.getView().fit(extent, {
      padding: [100, 100, 100, 100],
      duration: 1000
    });
  }

  viewTrack(track) {
    const geojson = track.geojson;
    if (geojson) {
      const features = geojsonFormat.readFeatures(geojson);
      this.trackManager.restoreFeatures(features);
      this._fitMapToFeatures(features);
    } else {
      this.trackManager.clear();
    }
  }

  startEditing() {
    this.trackManager.mode = 'edit';
  }

  stopEditing() {
    this.trackManager.mode = 'view';
  }

  getCurrentTrackAsGeojson(): GeoJsonObject {
    const features = this.trackManager.getFeatures();
    return geojsonFormat.writeFeatures(features);
  }

  deleteLastPoint() {
    this.trackManager.deleteLastPoint();
  }

  hasPoints() {
    return this.trackManager.getFeatures().length !== 0;
  }
}
