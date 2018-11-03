import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password.value !== confirmPassword.value ? {'passwordNotMatch': true} : null;
};

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {validators: passwordValidator});
  }

  register() {
    const email = this.registrationForm.get('email').value;
    const password = this.registrationForm.get('password').value;
    this.apiService.register(email, password);
  }

}
