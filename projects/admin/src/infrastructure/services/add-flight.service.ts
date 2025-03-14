import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {  IFlightRequest } from '../../domain/model/flight.model';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class AddFlightService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl+'/flight';

  addFlight(flight: IFlightRequest): Observable<any> {
    return this.http
      .post<IFlightRequest>(this.apiUrl, flight)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la API:', error);
    return throwError(
      () =>
        new Error(
          'Ocurrió un error al agregar el vuelo. Intente nuevamente más tarde.'
        )
    );
  }
}
