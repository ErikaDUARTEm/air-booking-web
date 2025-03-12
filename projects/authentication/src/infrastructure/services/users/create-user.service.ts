import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from '../../../domain/model/user.model';
import { environment } from 'shared';

@Injectable({
    providedIn: 'root'
})
export class CreateUserService {
    private readonly _http = inject(HttpClient);

    execute(user: IUser): Observable<IUser> {
        return this._http.post<IUser>(`${environment.apiUrl}/register`, user);
    }
}
