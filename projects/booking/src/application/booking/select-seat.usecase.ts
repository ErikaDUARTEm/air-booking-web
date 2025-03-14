// import { inject, Injectable } from '@angular/core';

// import { Observable } from 'rxjs';
// import { FlightSeatsService } from '../../infrastructure/services/services/seats.service';
// import { IFlight } from '../../domain/model/seats.model';
// import { IPassenger } from '../../domain/model/passenger.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class SelectSeatUseCase {
//   private readonly _service = inject(FlightSeatsService);

//   outboundFlight$(): Observable<IFlight> {
//     return this._service.getOutboundFlight();
//   }

//   returnFlight$(): Observable<IFlight> {
//     return this._service.getReturnFlight();
//   }

//   passengers$(): Observable<IPassenger[]> {
//     return this._service.getPassengers();
//   }

//   selectSeat(flightType: 'outbound' | 'return', seatId: string): void {
//     this._service.selectSeat(flightType, seatId);
//   }

//   nextPassenger(): IPassenger | null {
//     return this._service.nextPassenger();
//   }

//   previousPassenger(): IPassenger | null {
//     return this._service.previousPassenger();
//   }
// }

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightSeatsService } from '../../infrastructure/services/services/seats.service';
import { IFlight } from '../../domain/model/seats.model';
import { IPassenger } from '../../domain/model/passenger.model';

@Injectable({
  providedIn: 'root',
})
export class SelectSeatUseCase {
  private readonly _service = inject(FlightSeatsService);

  initializeSeats(aggregateId: string, flightType: 'outbound' | 'return'): void {
    this._service.initializeSeatsWithRealData(aggregateId, flightType);
  }

  outboundFlight$(): Observable<IFlight> {
    return this._service.getOutboundFlight();
  }

  returnFlight$(): Observable<IFlight> {
    return this._service.getReturnFlight();
  }

  passengers$(): Observable<IPassenger[]> {
    return this._service.getPassengers();
  }

  selectSeat(flightType: 'outbound' | 'return', seatId: string): void {
    this._service.selectSeat(flightType, seatId);
  }

  nextPassenger(): IPassenger | null {
    return this._service.nextPassenger();
  }

  previousPassenger(): IPassenger | null {
    return this._service.previousPassenger();
  }
}