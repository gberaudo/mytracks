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
  currentTrack: Track;

  constructor(
    private apiService: ApiService,
    private mapService: MapService,
  ) {

  }
  createNewTrack() {
    this.currentTrack = {
      id: undefined,
      name: 'Super track',
      geometry: [],
      profile: 'walking',
    }
    this.mapService.newTrack(null);
  }

  saveTrack() {
    //this.currentTrack.geometry = this.mapService.getCurrentTrackAsGeojson();
    this.apiService.saveTrack(this.currentTrack);
    this.mapService.stopEditing();
  }
}
