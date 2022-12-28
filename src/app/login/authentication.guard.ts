import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastService: HotToastService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url == "/login") {
      return true;
    }
    let token = sessionStorage.getItem('token');
    if (!token) {
      this.toastService.warning('You must login to continue')
      return this.router.navigate(['/login'], {queryParams:{'redirectURL':state.url}});
    }
    return true;
  }

}
