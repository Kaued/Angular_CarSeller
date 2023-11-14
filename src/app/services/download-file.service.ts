import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Binary } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  private apiUrl = `${environment.baseApiUrl}/api`;

  constructor(private http: HttpClient) { }

  getFile(path: string): Observable<Blob> {

    return this.http.get<Blob>(`${this.apiUrl}/storage/${path}`, {
      responseType: 'blob' as 'json',
    });
  }

}
