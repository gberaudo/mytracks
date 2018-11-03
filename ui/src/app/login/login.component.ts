import {Component} from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../api.service';
import {MapService} from '../map/map.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginModal: NgbModalRef;

  get loggedIn() {
    return this.apiService.isLoggedIn();
  }

  constructor(private apiService: ApiService,
              private mapService: MapService,
              private modalService: NgbModal,
              ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  open(content) {
    this.loginModal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  login() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.apiService.logIn(username, password).then(() => {
      this.mapService.updateTracksList();
      this.loginModal.close();
    }, () => {
      alert('Could not log in');
    });
  }

  logOut() {
    this.apiService.logOut().then(() => {
      this.mapService.updateTracksList();
    });
  }
}
