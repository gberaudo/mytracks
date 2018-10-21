import {NgModule} from '@angular/core';
import {MapComponent} from './map.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgbButtonsModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule( {
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [BrowserModule, FormsModule, NgbButtonsModule]
})
export class MapModule {
}
