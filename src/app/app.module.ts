import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PlaceSearchModule} from './place-search/place-search.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PlaceSearchModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
