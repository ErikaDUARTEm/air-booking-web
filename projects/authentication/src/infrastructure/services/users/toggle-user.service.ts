import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'shared';

@Injectable({
    providedIn: 'root'
})
export class ToggleUserService {
    private readonly _http = inject(HttpClient);
    private readonly API_URL = `${environment.apiUrl}/users/toggle`;

    execute(email: string): Observable<void> {
        return this._http.post<void>(this.API_URL, { email });
    }
}
