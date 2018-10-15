import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PlaceSearchModule} from './place-search/place-search.module';
import {MapModule} from './map/map.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PlaceSearchModule,
    MapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
