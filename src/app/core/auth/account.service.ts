import { Injectable } from '@angular/core';
import {
  ReplaySubject,
  Observable,
  tap,
  shareReplay,
  catchError,
  of,
} from 'rxjs';
import { Account } from './account.model';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userIdentity: Account | null = null;
  private authenticationState: ReplaySubject<Account | null> =
    new ReplaySubject<Account | null>(1);
  private accountCache$?: Observable<Account> | null;
  private resourceServe = environment.API_LOCAL;
  private userState: BehaviorSubject<Account | null> =
    new BehaviorSubject<Account | null>(null);

  constructor(private http: HttpClient) {}

  save(account: Account): Observable<{}> {
    return this.http.post(`${this.resourceServe}account`, account);
  }

  getUser(): Observable<Account | null>{

    this.fetch().subscribe({
      next: (data) => {
        this.userIdentity = data;
        this.userState.next(data);
      }
    })
    return this.userState.asObservable();
  }

  authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
    if (!identity) {
      this.accountCache$ = null;
    }
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.some((auth) =>
      authorities.includes(auth)
    );
  }
  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force) {
      this.accountCache$ = this.fetch().pipe(
        tap({
          next: (account: Account) => {
            this.authenticate(account);
          },
        }),
        shareReplay()
      );
    }
    return this.accountCache$.pipe(catchError(() => of(null)));
  }

  isAuthenticated(): boolean {
    return this.userIdentity != null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  fetch(): Observable<Account> {
    return this.http.get<Account>(`${this.resourceServe}account`);
  }
}
