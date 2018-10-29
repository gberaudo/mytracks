import { Injectable } from '@angular/core';
import { GeoJsonObject, GeoJsonTypes } from 'geojson';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
};

let httpOptions = {
  headers: <HttpHeaders> null
};

const api = 'http://localhost:8000';
let apiUser: string;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  listTracks(): Promise<Array<TrackListItem>> {
    if (httpOptions.headers) {
      return this.http.get<Array<TrackListItem>>(`${apiUser}/tracks`, httpOptions).toPromise();
    } else {
      return Promise.resolve([]);
    }
  }

  getTrack(id: number): Promise<Track> {
    return this.http.get<Track>(`${apiUser}/tracks/${id}`, httpOptions).toPromise();
  }

  addTrack(track: Track): Promise<Track> {
    console.assert(!track.id);
    return this.http.post<Track>(`${apiUser}/tracks`, track, httpOptions).toPromise();
  }

  saveTrack(track: Track): Promise<void> {
    if (track.id) {
        return this.http.put<Track>(`${apiUser}/tracks/${track.id}`, track, httpOptions).toPromise().then(() => {});
    } else {
      return this.addTrack(track).then(savedTrack => {
        track.id = savedTrack.id;
      });
    }
  }

  deleteTrack(track): Promise<void> {
    console.assert(track.id);
    return this.http.delete<void>(`${apiUser}/tracks/${track.id}`, httpOptions).toPromise();
  }

  logIn() {
    return this.http.post<LoginResponse>(`${api}/rest-auth/login/`, {
      username: 'guillaume.beraudo+crac2@gmail.com',
      password: 'cotcot'
    }).toPromise().then(response => {
      apiUser = `${api}/users/${response.user_id}`;
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Token ${response.key}`
        })
      };
    });
  }

  logOut() {
    httpOptions = {
      headers: <HttpHeaders> null
    };
    return Promise.resolve();
  }

  isLoggedIn() {
    return !!httpOptions.headers;
  }
}
