import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { UploadImageUrl } from './upload.model';

@Injectable({
  providedIn: 'root',
})
export class UploadServiceService {
  private apiUrl = environment.API_LOCAL + 'change-image';

  constructor(private http: HttpClient) {}

  uploadImageUrl(upload: UploadImageUrl): Observable<void> {
    return this.http.put<void>(this.apiUrl, upload);
  }
}
