import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {LoginComponent, LoginDialogComponent} from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginDialogComponent,
    RegistrationComponent,
    PasswordRecoveryComponent,
  ],
  entryComponents: [
    LoginDialogComponent,
    RegistrationComponent,
    PasswordRecoveryComponent,
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule
  ]
})
export class AuthenticationModule {

}
