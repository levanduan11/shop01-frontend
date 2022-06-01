import { Injectable } from '@angular/core';

const token_key = 'TOKEN_KEY';
const refresh_key = 'REFRESH_KEY';
const username_key = 'NAME_KEY';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() { }
  

  setUsername(username: string): void {
    window.sessionStorage.removeItem(username_key);
    window.sessionStorage.setItem(username_key, username);
  }
  getUsername(): string | null {
    return window.sessionStorage.getItem(username_key);
  }
  setTokeKey(token: string): void {
    window.sessionStorage.removeItem(token_key);
    window.sessionStorage.setItem(token_key, token);
  }

  getTokenKey(): string | null {
    const result = window.sessionStorage.getItem(token_key);
    if (result) {
      return result;
    }
    return null;
  }

  setRefreshKey(refreshKey: string): void {
    window.sessionStorage.removeItem(refresh_key);
    window.sessionStorage.setItem(refresh_key, refreshKey);
  }
  getRefreshTokenKey(): string | null {
    return window.sessionStorage.getItem(refresh_key);
  }

  isAuthenticated(): boolean {
    const check = this.getTokenKey();
    if (check) {
      return true;
    }
    return false;
  }

  clearToken(): void{
    window.sessionStorage.clear();
  }
}
