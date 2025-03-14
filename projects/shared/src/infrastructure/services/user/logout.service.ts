import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IToken } from '../../../domain/model/token.model';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private readonly _http = inject(HttpClient);

  execute(token: string): Observable<Boolean> {
    return this._http.put<Boolean>(`${environment.apiUrl}/logout`, {token});
  }
}
