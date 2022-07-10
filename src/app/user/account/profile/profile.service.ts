import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfile } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private urlResource = environment.API_LOCAL + 'profile';
  constructor(private http: HttpClient) {}

  updateProfile(profile: IProfile): Observable<void> {
    return this.http.put<void>(this.urlResource, profile);
  }
}
