import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUserToken } from '../../../domain/model/userToken.model';
import { environment } from '../../../public-api';

@Injectable({
  providedIn: 'root',
})
export class DecryptTokenService {
  private readonly _http = inject(HttpClient);

  execute(token: string): Observable<IUserToken> {
    return this._http
      .post<IUserToken>(
        `${environment.apiUrl}/decode-token`,
        {
          token,
        }
      )
  }
}
