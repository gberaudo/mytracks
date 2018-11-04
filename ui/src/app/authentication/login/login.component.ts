import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';
import {MapService} from '../../map/map.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {RegistrationComponent} from '../registration/registration.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: 'login.dialog.html',
})
export class LoginDialogComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private apiService: ApiService,
              private mapService: MapService,
              private dialogRef: MatDialogRef<LoginDialogComponent>,
              public registrationDialog: MatDialog) {

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.apiService.logIn(username, password).then(() => {
      this.mapService.updateTracksList();
      this.dialogRef.close();
    }, () => {
      alert('Could not log in');
    });
  }

  openRegistrationForm() {
    this.registrationDialog.open(RegistrationComponent, {width: '600px'});
    this.dialogRef.close();

  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class LoginComponent {

  get loggedIn() {
    return this.apiService.isLoggedIn();
  }

  constructor(private apiService: ApiService,
              private mapService: MapService,
              public loginDialog: MatDialog) {

  }

  openLoginDialog() {
    this.loginDialog.open(LoginDialogComponent, {width: '400px'});
  }

  logOut() {
    this.apiService.logOut().then(() => {
      this.mapService.updateTracksList();
    });
  }
}
