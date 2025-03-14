import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { State } from '../../domain/state';
import { IFormFlight } from 'availability';

@Injectable({
  providedIn: 'root',
})
export class GetFlyUsecase {
  private readonly _state = inject(State);

  flyPassengerData$(): Observable<IFormFlight> { 
    return this._state.passenger.flightData.$()
  }
}
