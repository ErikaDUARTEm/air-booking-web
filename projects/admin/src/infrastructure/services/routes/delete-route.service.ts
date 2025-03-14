import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class DeleteRouteService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/delete-route';

  delete(routeId: string): Observable<void> {
    const headers = this.getHeaders();
    const body = { aggregateId: routeId }; // Cuerpo con aggregateId
    return this.http.request<void>('delete', this.apiUrl, { headers, body });
  }

  private getHeaders() {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
