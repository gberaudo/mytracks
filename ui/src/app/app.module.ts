import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PlaceSearchModule} from './place-search/place-search.module';
import {MapModule} from './map/map.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LoginModule} from './login/login.module';

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PlaceSearchModule,
    MapModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
