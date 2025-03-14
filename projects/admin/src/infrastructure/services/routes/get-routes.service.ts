import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IRoute } from '../../../domain/model/route.model';

@Injectable({
  providedIn: 'root',
})
export class GetRoutesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/routes';

  execute(): Observable<IRoute[]> {
    const headers = this.getHeaders();
    return this.http.get<IRoute[]>(this.apiUrl, { headers });
  }

  private getHeaders() {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
