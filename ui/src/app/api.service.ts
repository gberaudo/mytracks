import {Injectable} from '@angular/core';
import {GeoJsonObject} from 'geojson';

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

export interface LoginResponse {
  key: string;
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private get(key) {
    return Promise.resolve(JSON.parse(localStorage.getItem(key)));
  }

  private put(key, obj) {
    const serialization = JSON.stringify(obj);
    localStorage.setItem(key, serialization);
    return Promise.resolve(JSON.parse(serialization));
  }

  private id() {
    const currentId = 1 +  Number.parseInt(localStorage.getItem('seq') || '0');
    localStorage.setItem('seq', currentId.toString());
    return currentId;
  }

  private delete(key) {
    localStorage.removeItem(key);
    return Promise.resolve();
  }

  listTracks(): Promise<Array<TrackListItem>> {
    const items = [];
    for (let i = 0; i < localStorage.length; ++i) {
      const key = localStorage.key(i);
      if (key.startsWith('track_')) {
        const track = JSON.parse(localStorage.getItem(key));
        items.push({
          id: track.id,
          name: track.name
        });
      }
    }
    items.sort((a, b) => b.id - a.id);
    return Promise.resolve(items);
  }

  getTrack(id: number): Promise<Track> {
    return this.get(`track_${id}`);
  }

  addTrack(track: Track): Promise<Track> {
    console.assert(!track.id);
    track.id = this.id();
    return this.put(`track_${track.id}`, track);
  }

  saveTrack(track: Track): Promise<void> {
    if (track.id) {
      return this.put(`track_${track.id}`, track);
    } else {
      return this.addTrack(track).then(savedTrack => {
        track.id = savedTrack.id;
      });
    }
  }

  deleteTrack(track): Promise<void> {
    console.assert(track.id);
    return this.delete(`track_${track.id}`);
  }

  logIn(username: string, password: string): Promise<void> {
    throw new Error('Not implemented');
  }

  register(email: string, password: string): Promise<void> {
    throw new Error('Not implemented');
  }

  logOut(): Promise<void> {
    throw new Error('Not implemented');
  }

  sendPasswordRecoveryRequest(email: string): Promise<void> {
    throw new Error('Not implemented');
  }

  isLoggedIn() {
    return true;
  }
}
