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
  selector: 'app-register',
  // an existing module is imported directly into a standalone component
  imports: [
    CommonModule,
    AlertComponent,
    NgSelectModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;

  roles: any[] = [
    { id: 1, name: 'User', value: 'User' },
    { id: 2, name: 'Admin', value: 'Admin' },
  ];

  registerForm!: FormGroup;
  alert!: Alert;
  hide: boolean = true;

  constructor(private authService: AuthenticationService) {}

  close = () => {
    // console.log('----------');
    this.hide = !this.hide;
  };

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

  get validateControl() {
    return this.registerForm.controls;
  }

  public registerUser() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // console.log('submit ', this.registerForm.value);
    const user: User = { ...this.registerForm.value };
    // console.log("user : ", user)
    this.authService
      .register(user)
      .pipe(first())
      .subscribe({
        next: (_) => {
          console.log('User have registered successfully!');
          this.alert = new Alert(
            AlertType.Success,
            'You have successfully registered'
          );
          this.hide = false;
          // this.registerForm.reset();
        },
        error: () => {
          console.log('an error was occurred');
          this.alert = new Alert(
            AlertType.Error,
            'Unable to register the user or may be it is already exist'
          );
          this.hide = false;
        },
        complete: () => {
          // 'onCompleted' callback.
          console.info('complete');
          // No errors, route to new page here
        },
      });
  }
}
