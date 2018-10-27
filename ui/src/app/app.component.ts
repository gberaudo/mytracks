import {Component, ViewEncapsulation} from '@angular/core';
import { Track, ApiService } from './api.service';
import { MapService } from './map/map.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'mytracks';
  loggedIn = false;

  constructor(
    private apiService: ApiService,
    private mapService: MapService,
  ) {
  }

  logIn() {
    this.apiService.logIn().then(() => {
      this.loggedIn = true;
      this.mapService.updateTracksList();
    });
  }

  logOut() {
    this.apiService.logOut().then(() => {
      this.loggedIn = false;
      this.mapService.updateTracksList();
    });
  }
}
