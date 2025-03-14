import { inject, Injectable } from '@angular/core';
import { UpdateFlightService } from '../infrastructure/services/update-flight.service';
import { StateIndex } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IFlight, IFlightUpdate } from '../domain/model/flight.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateFlightUsecase {
  private readonly __useCase = inject(UpdateFlightService);
  private readonly __state = inject(StateIndex);
  private subscriptions: Subscription = new Subscription();

  currentFlight$(): Observable<IFlight> {
    return this.__state.flights.flight.$();
  }
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }
  destroySubscriptions() {
    this.subscriptions.unsubscribe();
  }
  execute(flight: IFlightUpdate) {
    this.subscriptions.add(
      this.__useCase
        .updateFlight(flight)

        .pipe(
          tap((result) => {
            const flights = this.__state.flights.listFlights.snapshot();
            const updatedFlights = flights.map((flight) =>
              flight.flightId === result.aggregateId ? result : flight
            );
            this.__state.flights.listFlights.set(updatedFlights);
          })
        )

        .subscribe()
    );
  }

  selectFlight$(id: string): void {
    const currentFlight = this.__state.flights.listFlights
      .snapshot()
      .find((flight) => flight.flightId === id);
    this.__state.flights.flight.set(currentFlight);
  }
  
}
