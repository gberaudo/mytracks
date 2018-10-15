import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {MapService} from '../map/map.service';

// @ts-ignore
import {fromLonLat} from 'ol/proj';

interface OSMPlace {
  display_name: string;
  lat: string;
  lon: string;
}

class Place {
  name: string;
  lat: number;
  lon: number;
  constructor(osmPlace: OSMPlace) {
    this.name = osmPlace.display_name;
    this.lat = parseFloat(osmPlace.lat);
    this.lon = parseFloat(osmPlace.lon);
  }
}

@Component({
  selector: 'app-place-search',
  templateUrl: './place-search.component.html',
  styleUrls: ['./place-search.component.css']
})
export class PlaceSearchComponent implements OnInit {
  placeCtrl = new FormControl();
  url = 'https://nominatim.openstreetmap.org/?format=json';

  places: Place[] = [];

  constructor(private http: HttpClient, private mapService: MapService) {

  }

  ngOnInit() {
    this.placeCtrl.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(place => {
          return this.http.get(`${this.url}&q=${place}`)
            .subscribe((data: Array<OSMPlace>) => {
                this.places = data.map(datum => {
                  return new Place(datum);
                });
              }
            )
            ;
        }
      ),
    ).subscribe();
  }

  onPlaceSelected(place: Place) {
    const  view = this.mapService.map.getView();
    view.animate({
      zoom: 15,
      center: fromLonLat([place.lon, place.lat])
    });
  }

  placeDisplayWith(place: Place): string {
    return place ? place.name : '';
  }
}
