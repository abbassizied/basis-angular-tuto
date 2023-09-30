import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../users/user';

import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { first } from 'rxjs';

import { AlertComponent } from '../components/alert/alert.component';
import { Alert, AlertType } from '../components/alert/alert.model';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // an existing module is imported directly into a standalone component
  imports: [
    CommonModule,
    AlertComponent,
    NgSelectModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class LoginComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;

  loginForm!: FormGroup;
  alert!: Alert;
  hide: boolean = true;

  constructor(private authService: AuthenticationService) {}

  close = () => {
    // console.log('----------');
    this.hide = !this.hide;
  };

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get validateControl() {
    return this.loginForm.controls;
  }

  loginUser() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // console.log('submit ', this.loginForm.value);
    const user: User = { ...this.loginForm.value };
    // console.log("user : ", user)
    try {
      this.authService.login(user);
    } catch (e) {
      console.log('an error was occurred');
      this.alert = new Alert(
        AlertType.Error,
        'Unable to login the user or may be it is already exist'
      );
      this.hide = false;
    }
  }
}
