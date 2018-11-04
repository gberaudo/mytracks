import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {LoginComponent, LoginDialogComponent} from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginDialogComponent,
    RegistrationComponent,
  ],
  entryComponents: [
    LoginDialogComponent,
    RegistrationComponent,
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
