import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlaceSearchComponent} from './place-search.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MapModule} from '../map/map.module';
import {PlaceSearchService} from './place-search.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [PlaceSearchComponent],
  exports: [PlaceSearchComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    MapModule
  ],
  providers: [PlaceSearchService],

})
export class PlaceSearchModule {
}


export class Place {
  name: string;
  lat: number;
  lon: number;
  constructor(osmPlace: OSMPlace) {
    this.name = osmPlace.display_name;
    this.lat = parseFloat(osmPlace.lat);
    this.lon = parseFloat(osmPlace.lon);
  }
}


export interface OSMPlace {
  display_name: string;
  lat: string;
  lon: string;
}

export interface MapquestPlace {
  street: string;
  adminArea5: string; // city
  adminArea3: string; // state
  adminArea: string; // country code
  latLng: {
    lat: number;
    lng: number;
  };
}

export interface MapquestGeocodeResponse {
  results: Array<{
    locations: Array<MapquestPlace>
  }>;
}
