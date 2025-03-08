import { inject, Injectable } from "@angular/core";
import { PaymentState } from "./payment.state";

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _paymentState = inject(PaymentState);

  get payment() {
    return this._paymentState.store();
  }
}
