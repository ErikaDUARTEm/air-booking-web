import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IFlightUpdate } from '../../domain/model/flight.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateFlightService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl+'/flight';

  updateFlight(flight: IFlightUpdate): Observable<any> {
    return this.http
      .put<IFlightUpdate>(this.apiUrl, flight)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la API:', error);
    return throwError(
      () =>
        new Error(
          'Ocurrió un error al actualizar el vuelo. Intente nuevamente más tarde.'
        )
    );
  }
}
