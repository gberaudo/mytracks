import {NgModule} from '@angular/core';
import {MapComponent} from './map.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule( {
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [BrowserModule]
})
export class MapModule {
}
