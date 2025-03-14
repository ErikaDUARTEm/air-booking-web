import { Injectable, inject } from '@angular/core';
import { IUser } from '../../../domain/model/user.model';
import { environment } from 'shared';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IToken } from '../../../domain/model/token.model';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  private readonly _http = inject(HttpClient);

  execute(user: IUser): Observable<IToken> {
    return this._http.put<IToken>(`${environment.apiUrl}/login`, user);
  }
}
