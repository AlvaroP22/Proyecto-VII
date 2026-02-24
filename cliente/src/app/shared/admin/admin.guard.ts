import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const rol = localStorage.getItem('rol');
    if (rol === 'admin') return true;

    this.router.navigate(['/']);
    return false;
  }
}