import {Component, OnInit} from '@angular/core';
import {MapService} from './map.service';
import 'ol/ol.css';
import { TrackListItem, ApiService, Track } from '../api.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public showMenu = true;
  profile = 'walking';
  currentTrack: Track;
  isEditing = false;

  get loggedIn() {
    return this.apiService.isLoggedIn();
  }

  get userTracks(): Array<TrackListItem> {
    return this.mapService.userTracks;
  }

  constructor(
    private mapService: MapService,
    private apiService: ApiService,
  ) {
  }

  clearCurrentTrack() {
    this.mapService.clearTrack();
    this.currentTrack = null;
  }

  createNewTrack() {
    this.currentTrack = {
      id: undefined,
      name: '',
      geojson: null,
      profile: 'walking',
    };
    this.isEditing = true;
    this.mapService.viewTrack(this.currentTrack);
    this.mapService.startEditing();
  }

  viewTrack(id: number) {
    return this.apiService.getTrack(id).then(track => {
      this.currentTrack = track;
      this.mapService.viewTrack(track);
    });
  }

  deleteTrack() {
    return this.apiService.deleteTrack(this.currentTrack).then(() => {
      this.currentTrack = null;
      this.mapService.updateTracksList();
    });
  }

  editTrack() {
    this.isEditing = true;
    return this.viewTrack(this.currentTrack.id).then(() => this.mapService.startEditing());
  }

  async saveTrack() {
    this.currentTrack.geojson = this.mapService.getCurrentTrackAsGeojson();
    await this.apiService.saveTrack(this.currentTrack);
    this.mapService.updateTracksList();
    this.mapService.stopEditing();
    // this.mapService.clearTrack();
    this.isEditing = false;
  }

  deleteLastPoint() {
    this.mapService.deleteLastPoint();
  }

  get hasPoints() {
    return this.mapService.hasPoints();
  }

  changeProfile() {
    this.mapService.setProfile(this.profile);
  }

  ngOnInit() {
    this.mapService.map.setTarget('map');
  }

  exportGpx() {
    this.mapService.exportGpx();
  }

  importGpx(files) {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = f => {
        this.mapService.importGpx(reader.result);
      };

      reader.readAsText(file);
    }
  }
}
