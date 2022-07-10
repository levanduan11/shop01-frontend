import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminRouteAccessService implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountService.identity().pipe(
      map((account) => {
        if (account) {
          const authorities = route.data['authorities'];
          if (this.accountService.hasAnyAuthority(authorities)) {
            return true;
          }
          this.router.navigate(['403']);
          return false;
        }
        this.router.navigate(['login']);
        return false;
      })
    );
  }
}
