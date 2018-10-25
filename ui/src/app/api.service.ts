import { Injectable } from '@angular/core';
import { GeoJsonObject } from 'geojson';

export interface Track {
  id: number;
  name: string;
  geojson: GeoJsonObject;
  profile: string;
}

export interface TrackListItem {
  id: number;
  name: string;
}

const tracksStub: Map<number, Track> = new Map([
  [1, {
    id: 1,
    name: 'Tour des rochers de Naye',
    profile: 'walking',
    geojson: null
  }],
  [2, {
    id: 2,
    name: 'Renens Run 1200 2km',
    profile: 'walking',
    geojson: null
  }],
]);

const trackListStub: Array<TrackListItem> = [{
  id: 1,
  name: tracksStub.get(1).name
}, {
  id: 2,
  name: tracksStub.get(2).name
}];

let trackCount = trackListStub.length;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  listTracks(): Promise<Array<TrackListItem>> {
    return Promise.resolve(trackListStub);
  }

  getTrack(id: number): Promise<Track> {
    const track = tracksStub.get(id);
    return track ? Promise.resolve(track) : Promise.reject();
  }

  addTrack(track: Track): Promise<void> {
    console.assert(!track.id);
    trackCount++;
    track.id = trackCount;
    tracksStub.set(trackCount, track);
    trackListStub.push({
      id: trackCount,
      name: track.name
    });
    return Promise.resolve();
  }

  saveTrack(track: Track): Promise<void> {
    if (track.id) {
      trackListStub.find(item => item.id === track.id).name = track.name;
      return Promise.resolve();
    } else {
      return this.addTrack(track);
    }
  }

  deleteTrack(track): Promise<void> {
    console.assert(track.id);
    const idx = trackListStub.findIndex(track);
    delete trackListStub[idx];
    tracksStub.delete(track.id);
    return Promise.resolve();
  }
}
