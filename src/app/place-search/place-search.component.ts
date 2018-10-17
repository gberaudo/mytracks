import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {MapService} from '../map/map.service';
// @ts-ignore
import {fromLonLat} from 'ol/proj';
import {Place} from './place-search.module';
import {PlaceSearchService} from './place-search.service';

@Component({
  selector: 'app-place-search',
  templateUrl: './place-search.component.html',
  styleUrls: ['./place-search.component.scss'],
})
export class PlaceSearchComponent implements OnInit {
  placeCtrl = new FormControl();
  url = 'https://nominatim.openstreetmap.org/?format=json';

  places: Place[] = [];

  constructor(
    private mapService: MapService,
    private searchService: PlaceSearchService
  ) {

  }

  ngOnInit() {
    this.placeCtrl.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(place => {
          return this.searchService.geocode(place)
            .then((places: Array<Place>) => {
              this.places = places;
            });
        }
      ),
    ).subscribe();
  }

  onPlaceSelected(place: Place) {
    const view = this.mapService.map.getView();
    view.animate({
      zoom: 15,
      center: fromLonLat([place.lon, place.lat])
    });
  }

  placeDisplayWith(place: Place): string {
    return place ? place.name : '';
  }
}
