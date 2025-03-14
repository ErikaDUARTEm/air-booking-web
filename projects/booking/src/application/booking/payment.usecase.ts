import { inject, Injectable } from "@angular/core";
import { CreateReservationService } from "../../infrastructure/services/post/create-reservation.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IPaymentData } from "../../domain/model/payment.model";

@Injectable({
  providedIn: 'root',
})
export class PaymentUseCase{
  private readonly _state = inject(State);

    paymentData$(): Observable<IPaymentData> {
        return this._state.payment.paymentData.$();
      }
    execute(paymentData: IPaymentData): void {
      console.log("hola", paymentData)
      const billingData = this._state.payment.billingData.snapshot();
      const selectedMethod = this._state.payment.selectedMethod.snapshot();

      if (!paymentData || !billingData || !selectedMethod) {
        this._state.payment.successMessage.set('No se puede procesar el pago: Datos incompletos.');
        return;
      }

      this._state.payment.paymentData.set(paymentData);
      this._state.payment.billingData.set(billingData);
      this._state.payment.selectedMethod.set(selectedMethod);

      console.log('Datos de pago guardados:', paymentData);
      this._state.payment.successMessage.set('Pago confirmado, Reserva realizada con exito.');
    }
    //#endregion

}
