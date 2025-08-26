import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Router } from '@angular/router';

export function roleGuard(expectedRoles: string[]): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.getUser();

    if (!user || !expectedRoles.includes(user.role)) {
      router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  };
}
