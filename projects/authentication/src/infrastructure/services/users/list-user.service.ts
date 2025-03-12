import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from '../../../domain/model/user.model';
import { environment } from 'shared';

@Injectable({
    providedIn: 'root'
})
export class ListUsersService {
    private http = inject(HttpClient);

    execute(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`${environment.apiUrl}/getAllUsers`);
    }
}
