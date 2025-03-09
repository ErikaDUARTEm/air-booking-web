import { inject, Injectable } from "@angular/core";
import { StateFactory } from "../../../../shared/src/public-api";
import { BehaviorSubject } from "rxjs";
import { IPaymentData } from "../model/payment.model";

@Injectable({
  providedIn: 'root',
})
export class PaymentState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly paymentData$ = new BehaviorSubject<IPaymentData | null>(null);

  //#endregion

  store() {
    return {
      paymentData: this._factory.state(this.paymentData$)
    };
  }
}
