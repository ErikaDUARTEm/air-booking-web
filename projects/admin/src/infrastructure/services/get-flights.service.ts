import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IFlight } from '../../domain/model/flight.model';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GetFlightsService {

  private http = inject(HttpClient)

  getFlights(): Observable<any[]>{
    return this.http.get<any>(environment.apiUrl+'/flight').pipe(
      map((response)=> response))
  }

  private validateFlightResponse(response: any): IFlight[] {
    if (Array.isArray(response)) {
      return response.map((flight) => {
        if (
          typeof flight.flightId === 'string' &&
          typeof flight.flightNumber === 'string' &&
          typeof flight.flightModel === 'string' &&
          typeof flight.routeId === 'string' &&
          typeof flight.departureTime === 'string' &&
          typeof flight.arrivalTime === 'string' &&
          typeof flight.status === 'string' &&
          typeof flight.seats === 'number' &&
          typeof flight.tax === 'number' &&
          typeof flight.businessFullPrice === 'number' &&
          typeof flight.taxBusinessFullPrice === 'number' &&
          typeof flight.totalPriceBusinessFullPrice === 'number' &&
          typeof flight.businessBasicPrice === 'number' &&
          typeof flight.taxBusinessBasicPrice === 'number' &&
          typeof flight.totalPriceBusinessBasicPrice === 'number' &&
          typeof flight.economyFullPrice === 'number' &&
          typeof flight.taxEconomyFullPrice === 'number' &&
          typeof flight.totalPriceEconomyFullPrice === 'number' &&
          typeof flight.economyBasicPrice === 'number' &&
          typeof flight.taxEconomyBasicPrice === 'number' &&
          typeof flight.totalPriceEconomyBasicPrice === 'number' &&
          typeof flight.economyClassicPrice === 'number' &&
          typeof flight.taxEconomyClassicPrice === 'number' &&
          typeof flight.totalPriceEconomyClassicPrice === 'number'
        ) {
          return flight as IFlight;
        } else {
          throw new Error(`Invalid flight structure: ${JSON.stringify(flight)}`);
        }
      });
    } else {
      throw new Error('Invalid response structure');
    }
  }
  
  
}
