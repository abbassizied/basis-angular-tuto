import { inject } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthenticationService } from '../_services/authentication.service';

export const AuthGuard = ():
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> => {
  const tsService = inject(TokenStorageService);
  const authService = inject(AuthenticationService);
  if (!tsService.isTokenValid && tsService.isLoggedIn() !== true) {
    window.alert('Please, Sign-In!'); 
    // not logged in so redirect to login page
    authService.logout();
  }
  // logged in so return true
  return true;
};
