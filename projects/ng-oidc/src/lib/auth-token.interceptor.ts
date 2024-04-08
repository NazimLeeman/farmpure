import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const currentUser = authService.user();

  if (currentUser && currentUser.access_token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.access_token}`
      }
    });
  }

  return next(req);
};
