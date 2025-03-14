import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';
import { IUser } from '../../../domain/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LogoutUserService {
  private readonly _http = inject(HttpClient);
  
  execute(user: IUser): Observable<Boolean> {
    return this._http.put<Boolean>(`${environment.apiUrl}/logout`, user);
  }
}
