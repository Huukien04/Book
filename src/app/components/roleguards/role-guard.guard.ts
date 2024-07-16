import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';



@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) {
    console.log('RoleAuthGuard instantiated');
  }

  canActivate(

    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log('RoleAuthGuard activated for route:', state.url);

    return this.isAuthorized(next);
  }

  private isAuthorized(route: ActivatedRouteSnapshot): boolean {

    const expectedRoles = route.data['expectedRoles'] as string[];

    const userRoles = this.authService.getRoles();

    console.log(121212121, userRoles);

    const roleMatches = userRoles.some(role => expectedRoles.includes(role));

    if (!roleMatches) {
      this.router.navigate(['/book/list']);
    }
    console.log(900000000000, roleMatches);

    return roleMatches;
  }

}
