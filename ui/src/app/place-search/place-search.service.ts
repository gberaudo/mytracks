import {Injectable} from '@angular/core';
import {MapquestPlace, MapquestGeocodeResponse, Place} from './place-search.module';
import {HttpClient} from '@angular/common/http';

const MAPQUEST_API_KEY = 'XQ2rYGNQsSVc56EzMiLUAsGzAGCTDSkd';
const MAPQUEST_URL = 'https://open.mapquestapi.com/geocoding/v1/address';

@Injectable()
export class PlaceSearchService {
  constructor(private http: HttpClient) {
  }

  private mapquestGeocode(placeStr: string): Promise<MapquestPlace[]> {
    const url = `${MAPQUEST_URL}?key=${MAPQUEST_API_KEY}&location=${placeStr}`;
    const promise = new Promise<MapquestPlace[]>((resolve, reject) => {
      this.http.get<MapquestGeocodeResponse>(url)
        .toPromise()
        .then(res => {
          resolve(res.results[0].locations);
        })
        .catch(err => {
          resolve([]);
        });
    });

    return promise;
  }

  public geocode(placeStr: string): Promise<Place[]> {
    return this.mapquestGeocode(placeStr)
      .then(mapquestPlaces => {
        return mapquestPlaces.map(mapquestPlace => {
          return this.placeFromMapquestPlace(mapquestPlace);
        });
      });
  }

  private placeFromMapquestPlace(mapquestPlace: MapquestPlace) {
    let name = '';
    if (mapquestPlace.street && mapquestPlace.street.trim() && mapquestPlace.street.trim() !== ',') {
      name += mapquestPlace.street + ', ';
    }

    if (mapquestPlace.adminArea5) {
      name += mapquestPlace.adminArea5 + ', ';
    }

    name += mapquestPlace.adminArea3;

    return {
      name: name,
      lat: mapquestPlace.latLng.lat,
      lon: mapquestPlace.latLng.lng
    };
  }

}
