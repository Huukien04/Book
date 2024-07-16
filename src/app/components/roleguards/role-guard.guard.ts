import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {

  canActivate(

    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.isAtuhorized(next);
  }

  private isAtuhorized(router: ActivatedRouteSnapshot): boolean {
    const role = ['Admin', 'User'];
    const expectedRoles = router.data.expectedRoles;
    const roleMatches = role.findIndex(role => expectedRoles.indexOf(role) != -1);
    return roleMatches < 0 ? false : true;

  }

}
