import { inject, Injectable } from '@angular/core';
import { GetFlightsService } from '../infrastructure/services/get-flights.service';
import { Observable, Subscription, tap } from 'rxjs';
import { IFlight } from '../domain/model/flight.model';
import { StateIndex } from '../domain/state';

@Injectable({
  providedIn: 'root',
})
export class GetFlightsUsecase {
  private readonly _service = inject(GetFlightsService);
  private readonly _flightState = inject(StateIndex);

  private subscriptions: Subscription = new Subscription();

  //#region Observables
  flights$(): Observable<IFlight[]> {
    return this._flightState.flights.listFlights.$();
  }
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
  //#endregion

  execute(): void {
    this.subscriptions.add(
      this._service
        .getFlights()
        .pipe(
          tap((flightsList: IFlight[]) => {
            this._flightState.flights.listFlights.set(flightsList);
          })
        )
        .subscribe(
          () => {
            console.log('Vuelos obtenidos');
          },
          (error) => {
            console.log('Error al obtener vuelos');
          }
        )
    );
  }
}
