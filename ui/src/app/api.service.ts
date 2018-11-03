import {Injectable} from '@angular/core';
import {GeoJsonObject} from 'geojson';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

let httpOptions = {
  headers: <HttpHeaders> null
};

const apiUrl = (function () {
  return location.host === 'localhost' ? 'http://localhost:8000' : 'https://mytracks.beraudo.net/api';
})();

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  listTracks(): Promise<Array<TrackListItem>> {
    if (httpOptions.headers) {
      return this.http.get<Array<TrackListItem>>(`${apiUserUrl}/tracks`, httpOptions).toPromise();
    } else {
      return Promise.resolve([]);
    }
  }

  getTrack(id: number): Promise<Track> {
    return this.http.get<Track>(`${apiUserUrl}/tracks/${id}`, httpOptions).toPromise();
  }

  addTrack(track: Track): Promise<Track> {
    console.assert(!track.id);
    return this.http.post<Track>(`${apiUserUrl}/tracks`, track, httpOptions).toPromise();
  }

  saveTrack(track: Track): Promise<void> {
    if (track.id) {
      return this.http.put<Track>(`${apiUserUrl}/tracks/${track.id}`, track, httpOptions).toPromise().then(() => {
      });
    } else {
      return this.addTrack(track).then(savedTrack => {
        track.id = savedTrack.id;
      });
    }
  }

  deleteTrack(track): Promise<void> {
    console.assert(track.id);
    return this.http.delete<void>(`${apiUserUrl}/tracks/${track.id}`, httpOptions).toPromise();
  }

  logIn(username: string, password: string) {
    return this.http.post<LoginResponse>(`${apiUrl}/rest-auth/login/`, {
      username,
      password
    }).toPromise().then(response => {
      apiUserUrl = `${apiUrl}/users/${response.user_id}`;
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Token ${response.key}`
        })
      };
    });
  }

  register(email: string, password: string) {
    return this.http.post(`${apiUrl}/users/`, {
      email,
      password
    }).toPromise().then(response => {
      console.log('register successfull', response);
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
