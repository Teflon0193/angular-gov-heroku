import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Minister } from './minister';

@Injectable({
  providedIn: 'root'
})
export class MinisterService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMinisters(): Observable<Minister[]> {
    return this.http.get<Minister[]>(`${this.apiServerUrl}/government/all`);
  }
  
  public addMinister(minister: Minister): Observable<Minister> {
    return this.http.post<Minister>(`${this.apiServerUrl}/government/add`, minister);
  }

  public updateMinister(minister: Minister): Observable<Minister> {
    return this.http.put<Minister>(`${this.apiServerUrl}/government/update`, minister);
  }

  public deleteMinister(ministerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/government/delete/${ministerId}`);
  }
}
