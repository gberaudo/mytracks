import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {fromLonLat} from 'ol/proj';
import {MapService} from './map.service';
import 'ol/ol.css';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public showMenu: boolean;

  constructor(private mapService: MapService) {
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
      reader.onload = (f) => {
        this.mapService.importGpx(f.target.result);
      };

      reader.readAsText(file);
    }
  }
}
