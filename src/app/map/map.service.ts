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

import TrackManager from '@geoblocks/edittrack/src/TrackManager';
import OSRMRouter from '@geoblocks/router/src/OSRMRouter';
import {controlPointStyle, trackLayerStyleFunction, importLayerStyleFunction} from './style';

import PointGeometry from 'ol/geom/Point';
import Feature from 'ol/Feature';

import saveAs from 'save-as';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2JvMiIsImEiOiJjam5kbGpqcTUwZTJ5M3BueTd6dHB3aHk3In0.Gi-NTgWMekLzwkz59kaMTQ';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class MapService {
  map: OlMap;
  private trackManager: TrackManager;

  private importLayer: OlVectorLayer; // layer to display imported feature, e.g. from gpx

  public initMap() {
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
      target: 'map',
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

    const MAPBOX_URL = 'https://api.mapbox.com/directions/v5/mapbox/walking';

    const router = new OSRMRouter({
      projection,
      url: MAPBOX_URL,
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

  public importGpx(data) {
    const features = new GPXFormat().readFeatures(data, {
       featureProjection: this.map.getView().getProjection()
    });

    const controlPoints = [];
    for (const feature of features) {
      if (feature.getGeometry().getType() === 'LineString') {
        const geometry = <ol.geom.LineString> feature.getGeometry();
        feature.setProperties({
          type: 'segment',
          snapped: true
        });
        if (controlPoints.length === 0) {
          controlPoints.push(this.createControlPointFromCoordinate(geometry.getFirstCoordinate()));
        }
        controlPoints.push(this.createControlPointFromCoordinate(geometry.getLastCoordinate()));
      }
    }

    this.importLayer.getSource().addFeatures(features);
    // this.trackManager.restoreFeatures([...features, ...controlPoints]);
    // this.map.getView().fit(this.trackManager.getSource().getExtent());
  }
}
