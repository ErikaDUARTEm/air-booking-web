import { inject, Injectable } from '@angular/core';
import { AddFlightService } from '../infrastructure/services/add-flight.service';
import { StateIndex } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IFlight, IFlightRequest } from '../domain/model/flight.model';

@Injectable({
  providedIn: 'root',
})
export class AddFlightUsecase {
  private readonly _service = inject(AddFlightService);
  private readonly _state = inject(StateIndex);
  private subscriptions: Subscription = new Subscription();

  flight$(): Observable<IFlight> {
    return this._state.flights.flight.$();
  }
  
  initSubcription(): void{
    this.subscriptions = new Subscription();
  }
  destroySubscriptions() {
    this.subscriptions.unsubscribe();
  }

  execute(flight: IFlightRequest) {
    this.subscriptions.add(
      this._service
        .addFlight(flight)
        .pipe(
          tap((result) => {
            const flights = this._state.flights.listFlights.snapshot();
            this._state.flights.listFlights.set([...flights, result]);
          })
        )
        .subscribe()
    );
  }
}
