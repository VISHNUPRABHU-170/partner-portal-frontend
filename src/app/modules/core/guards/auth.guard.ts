import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.checkIfUserIsLoggedIn();
    if (isLoggedIn) return true;

    // Redirect to the login page if the user is not logged in
    this.router.navigate(['/login']);
    return false;
  }

  private checkIfUserIsLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }
}
