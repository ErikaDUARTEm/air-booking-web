import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { State } from '../../domain/state';
import { IPassengerData } from '../../domain/model/passenger.model';

@Injectable({
  providedIn: 'root',
})
export class GetFlyUsecase {
  private readonly _state = inject(State);

  flyData$(): Observable<IPassengerData> {
    return this._state.passenger.flightData.$().pipe(
      map((flightData) => ({
        adult: flightData.passengers.adult ?? 1,
        children: flightData.passengers.children ?? 0,
        infants: flightData.passengers.infants ?? 0,
      }))
    );
  }
}
