import { inject, Injectable } from "@angular/core";
import { PaymentState } from "./payment.state";
import { PassengerState } from "./passenger.state";
import { FlightState } from "./seats.state";

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _paymentState = inject(PaymentState);
  private readonly _passengerState = inject(PassengerState);
  private readonly _flightState = inject(FlightState);


  get payment() {
    return this._paymentState.store();
  }

  get passenger() {
    return this._passengerState.store();
  }
  get flight(){
    return this._flightState.store();
  }
}
