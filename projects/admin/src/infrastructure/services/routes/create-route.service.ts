import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IRoute } from '../../../domain/model/route.model';

@Injectable({
  providedIn: 'root',
})
export class CreateRouteService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/create-route';

  create(route: {
    origin: string;
    duration: number;
    destination: string;
  }): Observable<IRoute> {
    const headers = this.getHeaders();
    return this.http.post<IRoute>(this.apiUrl, route, { headers });
  }

  private getHeaders() {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
