import {Injectable} from '@angular/core';
import OlMap from 'ol/Map';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class MapService {
  map: OlMap;
}
