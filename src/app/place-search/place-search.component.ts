import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';

interface OSMPlace {
  display_name: string;
  lat: number;
  lon: number;
}

class Place {
  constructor(osmPlace: OSMPlace) {
    return {
      name: osmPlace.display_name,
      lat: osmPlace.lat,
      lon: osmPlace.lon
    };
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

  constructor(private http: HttpClient) {

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

}
