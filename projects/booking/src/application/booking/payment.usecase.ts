import { inject, Injectable } from "@angular/core";
import { CreateReservationService } from "../../infrastructure/services/post/create-reservation.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { ICard, IPaymentData, IPse } from "../../domain/model/payment.model";

@Injectable({
  providedIn: 'root',
})
export class PaymentUseCase{
  private readonly _state = inject(State);

    paymentData$(): Observable<IPaymentData> {
        return this._state.payment.paymentData.$();
      }
    execute(paymentData: IPaymentData): void {
      const billingData = this._state.payment.billingData.snapshot();
      const selectedMethod = this._state.payment.selectedMethod.snapshot();
      const successMessage = this._state.payment.successMessage.snapshot();

    if (!paymentData.paymentMethod || !paymentData.paymentDetails || !paymentData.billingAddress) {
      this._state.payment.successMessage.set('No se puede procesar el pago: Datos incompletos.');
      return;
    }

    if (paymentData.paymentMethod === 'CARD') {
      const cardDetails = paymentData.paymentDetails as ICard;
      if (!cardDetails.number || !cardDetails.holderName || !cardDetails.expirationDate || !cardDetails.cvv) {
        this._state.payment.successMessage.set('No se puede procesar el pago: Datos de tarjeta de crédito incompletos.');
        return;
      }
    } else if (paymentData.paymentMethod === 'PSE') {
      const pseDetails = paymentData.paymentDetails as IPse;
      if (!pseDetails.holderName || !pseDetails.email) {
        this._state.payment.successMessage.set('No se puede procesar el pago: Datos de PSE incompletos.');
        return;
      }
    }
      this._state.payment.paymentData.set(paymentData);
      this._state.payment.billingData.set(billingData);
      this._state.payment.selectedMethod.set(selectedMethod);
      this._state.payment.successMessage.set('Pago confirmado, Reserva realizada con exito.');


    }
    //#endregion

}
