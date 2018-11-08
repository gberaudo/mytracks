import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  email: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  sendPasswordRecoveryRequest() {
    this.apiService.sendPasswordRecoveryRequest(this.email);
  }

}
