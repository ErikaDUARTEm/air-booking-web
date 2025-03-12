import { inject, Injectable } from "@angular/core";
import { StateFactory } from "shared";
import { BehaviorSubject } from "rxjs";
import { IBillingAddress, IPaymentData } from "../model/payment.model";

@Injectable({
  providedIn: 'root',
})
export class PaymentState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly paymentData$ = new BehaviorSubject<IPaymentData | null>(null);
  private readonly billingData$ = new BehaviorSubject<IBillingAddress | null>(null);
  private readonly selectedMethod$ = new BehaviorSubject<'CARD' | 'PSE' | null>(null);
  private readonly successMessage$ = new BehaviorSubject<string | null>(null);
  //#endregion

  store() {
    return {
      paymentData: this._factory.state(this.paymentData$),
      billingData: this._factory.state(this.billingData$),
      selectedMethod: this._factory.state(this.selectedMethod$),
      successMessage: this._factory.state(this.successMessage$)
      };
  }
  setSuccessMessage(message: string | null) {
    this.successMessage$.next(message);
  }
  updatePaymentData(paymentData: IPaymentData) {
    this.paymentData$.next(paymentData);
  }

  updateBillingData(billingData: IBillingAddress) {
    this.billingData$.next(billingData);
  }

  updateSelectedMethod(method: 'CARD' | 'PSE' | null) {
    this.selectedMethod$.next(method);
  }

  isPaymentReady(): boolean {
    return this.paymentData$.value !== null && this.billingData$.value !== null;
  }
}
