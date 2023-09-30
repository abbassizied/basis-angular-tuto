import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  getAccessToken() {
    return localStorage.getItem('access_token') as string;
  }

  saveAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token') as string;
  }

  saveRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  clean(): void {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  get isTokenValid(): boolean {
    const token = this.getRefreshToken();
    if (token) {
      const jwtHelper = new JwtHelperService();
      const isTokenExpired: boolean = jwtHelper.isTokenExpired(token);
      if (isTokenExpired) {
        localStorage.clear();
        return false;
      }
      return true;
    }
    return false;
  }
}
