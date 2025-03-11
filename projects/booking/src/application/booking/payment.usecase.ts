import { inject, Injectable } from "@angular/core";
import { CreateReservationService } from "../../infrastructure/services/post/create-reservation.service";
import { State } from "../../domain/state";
import { Subscription, tap } from "rxjs";
import { IPaymentData } from "../../domain/model/payment.model";

@Injectable({
  providedIn: 'root',
})
export class PaymentUseCase{
  private readonly _service = inject(CreateReservationService);
  private readonly _state = inject(State);
  private subscriptions!: Subscription;

    //#region Public Methods
    initSubscriptions(): void {
      this.subscriptions = new Subscription();
    }


    execute(paymentData: IPaymentData): void {
      const billingData = this._state.payment.billingData.snapshot();
      const selectedMethod = this._state.payment.selectedMethod.snapshot();

      if (!paymentData || !billingData || !selectedMethod) {
        this._state.payment.successMessage.set('No se puede procesar el pago: Datos incompletos.')
        return;
      }

      this.subscriptions.add(
        this._service
          .execute(paymentData)
          .pipe(
            tap(() => {
              console.log(paymentData)
              this._state.payment.successMessage.set('Pago procesado con éxito.')
            })
          )
          .subscribe()
      );
      console.log(paymentData.paymentDetails)
    }


    destroySubscriptions(): void {
      this.subscriptions.unsubscribe();
    }


    //#endregion

}
