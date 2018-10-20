import {Component, OnInit} from '@angular/core';
import {MapService} from './map.service';
import 'ol/ol.css';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public showMenu = true;
  profile = 'walking';

  constructor(private mapService: MapService) {
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
