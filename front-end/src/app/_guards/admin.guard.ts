import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

export const adminGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // your  logic goes here
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  if (authService.isAdmin !== true) {
    router.navigate(['unauthorized']);
  }
  return true;
};
