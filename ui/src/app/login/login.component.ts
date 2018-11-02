import {Component} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { MapService } from '../map/map.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  closeResult: string;

  get loggedIn() {
    return this.apiService.isLoggedIn();
  }

  constructor(
    private apiService: ApiService,
    private mapService: MapService,
    private modalService: NgbModal,
  ) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  logIn(username, password, modal) {
    this.apiService.logIn(username, password).then(() => {
      this.mapService.updateTracksList();
      modal.close();
    }, () => {
      console.error('Could not log in');
    });
  }

  logOut() {
    this.apiService.logOut().then(() => {
      this.mapService.updateTracksList();
    });
  }
}
