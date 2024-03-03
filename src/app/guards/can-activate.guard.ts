import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const canActivateGuard: CanActivateFn = (route, state) => {
  var loginService = inject(LoginService);
  var router = inject(Router);
  var jwtHelperService = inject(JwtHelperService);
  var token = sessionStorage.getItem('currentUser')
    ? JSON.parse(sessionStorage.getItem('currentUser') as string).token
    : null;
  if (
    loginService.isAuthenticated() &&
    jwtHelperService.decodeToken(token).role == route.data['expectedRole']
  ) {
    return true; //the user can navigate to the particular route
  } else {
    router.navigate(['login']);
    return false; //the user can't navigate to the particular route
  }
};
