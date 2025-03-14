import { inject, Injectable } from '@angular/core';
import { RemoveFlightService } from '../infrastructure/services/remove-flight.service';
import { StateIndex } from '../domain/state';
import { Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoveFlightUsecase {
  private readonly _service = inject(RemoveFlightService);
  private readonly _state = inject(StateIndex);
  private subscriptions: Subscription = new Subscription();
  execute(flightId: string) {
    this.subscriptions.add(
      this._service
        .removeFlight(flightId)
        .pipe(
          tap(() => {
            const flights = this._state.flights.listFlights.snapshot();
            const updatedFlights = flights.filter(
              (flight) => flight.flightId !== flightId
            );
            this._state.flights.listFlights.set(updatedFlights);
          })
        )
        .subscribe()
    );
  }
  destroySubscriptions() {
    this.subscriptions.unsubscribe();
  }
}
