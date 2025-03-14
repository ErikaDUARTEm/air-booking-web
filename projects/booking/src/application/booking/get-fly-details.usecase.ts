import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../domain/state';
import { IFlightData, IFlightSelection } from '../../domain/model/passenger.model';

@Injectable({
  providedIn: 'root',
})
export class GetFlightDetailsUseCase {
  private readonly _state = inject(State);

  flightData$(): Observable<IFlightSelection> {
    return this._state.flight.flightSelection.$();
  }
}
