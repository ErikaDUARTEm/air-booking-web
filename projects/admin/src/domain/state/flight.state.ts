import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateFactory } from 'shared';
import { IFlight } from '../model/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly flight$ = new BehaviorSubject<IFlight>(null);
  private readonly listFlights$ = new BehaviorSubject<IFlight[]>([]);
  //#endregion

  store() {
    return {
      flight: this._factory.state(this.flight$),
      listFlights: this._factory.state(this.listFlights$),
    };
  }
}
