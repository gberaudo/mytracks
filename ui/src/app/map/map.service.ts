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
import Style from 'ol/style/Style.js';
import Stroke from 'ol/style/Stroke.js';
import Icon from 'ol/style/Icon.js';

import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';

// @ts-ignore
import {createEmpty, extend} from 'ol/extent';


import TrackManager from '@geoblocks/edittrack/src/TrackManager';
import OSRMRouter from '@geoblocks/router/src/OSRMRouter';
import {controlPointStyle, importLayerStyleFunction, trackLayerStyleFunction} from './style';

import PointGeometry from 'ol/geom/Point';
import Feature from 'ol/Feature';

import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';

import saveAs from 'save-as';
import { GeoJsonObject } from 'geojson';
import { TrackListItem, ApiService } from '../api.service';
import { CompactouxReader } from './CompactouxSource';

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
    this.updateTracksList();
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

    const map = window['map'] = this.map = new OlMap({
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

    //this.initBusLayer();
    fetch('compactoux')
    .then(response => response.arrayBuffer())
    .then(buffer => this.initCompactouxBusLayer(buffer));

    //this.initBusSegmentsLayer();
    //this.initTrackSegmentsLayer();
  }


  private initCompactouxBusLayer(buffer) {
    const reader = new CompactouxReader(buffer);
    const features = reader.readFeatures('EPSG:3857');
    const cache = {};
    const layer = new VectorLayer({
      useSpatialIndex: false,
      opacity: 0.45,
      maxResolution: 15,
      source: new VectorSource({
        attributions: '© <a href="https://data.geo.admin.ch/ch.bav.haltestellen-oev">Swisstopo</a>',
        features: features,
      }),
      style: (feature, resolution) => {
        const type = feature.getProperties().type;
        if (!cache[type]) {
          cache[type] = new Style({
              image: new Icon({
                scale: 0.8,
                src: `images/transports/${type}.png`
              })
            });
        }
        return cache[type];
        // console.log(feature, resolution);
      }
    });

    this.map.addLayer(layer);

    const filterOptions = {
      layerFilter: l => l === layer,
      hitTolerance: 5
    };

    this.map.on('pointermove', (evt) => {
      const hovered = this.map.hasFeatureAtPixel(evt.pixel, filterOptions);
      const style = this.map.getTargetElement().style;
      const newStyle = hovered ? 'pointer' : 'default';
      if (style.cursor !== newStyle) {
        style.cursor = newStyle;
      };
    });

    const urlByLang = {
      'de': 'https://www.sbb.ch/de/kaufen/pages/fahrplan/fahrplan.xhtml',
      'en': 'https://www.sbb.ch/en/buying/pages/fahrplan/fahrplan.xhtml',
      'fr': 'https://www.sbb.ch/fr/acheter/pages/fahrplan/fahrplan.xhtml',
      'it': 'https://www.sbb.ch/it/acquistare/pages/fahrplan/fahrplan.xhtml'
    };


    this.map.on('singleclick', (evt) => {
      this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const url = `${urlByLang['fr']}?nach=${feature.get('id')}`;
        window.open(url, '_blank', 'noopener');
      }, filterOptions);
    });
  }


  private initBusLayer() {
    const cache = {};
    const layer = new VectorTileLayer({
      declutter: false,
      renderBuffer: 100,
      renderMode: 'image',
      opacity: 0.45,
      source: new VectorTileSource({
        attributions: '© <a href="https://data.geo.admin.ch/ch.bav.haltestellen-oev">Swisstopo</a>',
        format: new MVT(),
        url: 'tiles/{z}/{x}/{y}.pbf'
      }),
      style: (feature, resolution) => {
        const type = feature.getProperties().type;
        if (!cache[type]) {
          cache[type] = new Style({
              image: new Icon({
                scale: 0.8,
                src: `images/transports/${type}.png`
              })
            });
        }
        return cache[type];
        // console.log(feature, resolution);
      }
    });

    this.map.addLayer(layer);

    const filterOptions = {
      layerFilter: l => l === layer,
      hitTolerance: 5
    };

    this.map.on('pointermove', (evt) => {
      const hovered = this.map.hasFeatureAtPixel(evt.pixel, filterOptions);
      const style = this.map.getTargetElement().style;
      const newStyle = hovered ? 'pointer' : 'default';
      if (style.cursor !== newStyle) {
        style.cursor = newStyle;
      };
    });

    const urlByLang = {
      'de': 'https://www.sbb.ch/de/kaufen/pages/fahrplan/fahrplan.xhtml',
      'en': 'https://www.sbb.ch/en/buying/pages/fahrplan/fahrplan.xhtml',
      'fr': 'https://www.sbb.ch/fr/acheter/pages/fahrplan/fahrplan.xhtml',
      'it': 'https://www.sbb.ch/it/acquistare/pages/fahrplan/fahrplan.xhtml'
    };


    this.map.on('singleclick', (evt) => {
      this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const url = `${urlByLang['fr']}?nach=${feature.get('id')}`;
        window.open(url, '_blank', 'noopener');
      }, filterOptions);
    });
  }

  private initBusSegmentsLayer() {
    const cache = {};
    const colors = {
      bus: 'red',
      train: 'green',
      subway: 'purple'
    };
    const layer = new VectorTileLayer({
      //declutter: false,
      source: new VectorTileSource({
        attributions: '© OSM',
        format: new MVT(),
        url: 'tilesbus/{z}/{x}/{y}.pbf'
      }),
     style: (feature, resolution) => {
       const type = feature.getProperties().route;
       if (!cache[type]) {
         cache[type] = new Style({
            stroke: new Stroke({
              color: colors[type],
              width: 2,
             })
           });
       }
       return cache[type];
       // console.log(feature, resolution);
     }
    });

    this.map.addLayer(layer);
  }

  private initTrackSegmentsLayer() {
    const cache = {};
    const colors = {
      paved: 'lightred',
      concrete: 'lightgreen',
      gravel: 'gray',
      unknown: 'transparent',
      // track: 'blue',
      // footway: 'yellow',
      // steps: 'red',
      // path: 'green'
    };
    const layer = new VectorTileLayer({
      //declutter: false,
      source: new VectorTileSource({
        attributions: '© OSM',
        format: new MVT(),
        url: 'tilestrack/{z}/{x}/{y}.pbf'
      }),
     style: (feature, resolution) => {
       const type = feature.getProperties().surface || 'unkown';
       if (!cache[type]) {
         cache[type] = new Style({
            stroke: new Stroke({
              color: colors[type] || colors['unknown'],
              width: 2,
             })
           });
       }
       return cache[type];
       // console.log(feature, resolution);
     }
    });

    this.map.addLayer(layer);
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
