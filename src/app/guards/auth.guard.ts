import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const isAuthenticatedGuard = (): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.user()) {
      return true;
    }

    return router.parseUrl('auth/login');
  };
};

export const isCMroleGuard = (): CanActivateFn => {
    return () => {
        const authService = inject(AuthService);
        const router = inject(Router);

        if (authService.user()?.role === 'CM') {
            return true;
        }

        return router.parseUrl('events');
    }
}