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
  userTracks: Array<TrackListItem> = [];
  currentTrack: Track;

  constructor(
    private mapService: MapService,
    private apiService: ApiService,
  ) {
    this.apiService.listTracks().then(tracks => this.userTracks = tracks);
  }

  clearCurrentTrack() {
    this.mapService.clearTrack();
    this.currentTrack = null;
  }

  createNewTrack() {
    this.currentTrack = {
      id: undefined,
      name: 'Super track',
      geojson: null,
      profile: 'walking',
    }
    this.mapService.viewTrack(this.currentTrack);
    this.mapService.startEditing();
  }

  viewTrack(id: number) {
    return this.apiService.getTrack(id).then(track => {
      this.currentTrack = track;
      this.mapService.viewTrack(track);
    });
  }

  editTrack(id: number) {
    return this.viewTrack(id).then(() => this.mapService.startEditing());
  }

  saveTrack() {
    this.currentTrack.geojson = this.mapService.getCurrentTrackAsGeojson();
    this.apiService.saveTrack(this.currentTrack);
    this.mapService.stopEditing();
    this.mapService.clearTrack();
    this.currentTrack = null;
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
