import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (token) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};