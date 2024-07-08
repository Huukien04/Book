import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const token = localStorage.getItem('id_token');
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');

    if (token && moment().isBefore(moment(expiresAt))) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
export function logout() {
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
} 
