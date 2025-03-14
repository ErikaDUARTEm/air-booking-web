import { Component, inject, OnInit } from '@angular/core';
import { PaymentAndSummaryComponentComponent } from '../../components/payment/payment-and-summary-component/payment-and-summary-component.component';
import { PaymentState } from '../../../../domain/state/payment.state';
import { PaymentUseCase } from '../../../../application/booking/payment.usecase';
import { IPaymentData } from '../../../../domain/model/payment.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GetFlightsUsecase, IFlightSelected } from 'availability';
import { SavePassengersUseCase } from '../../../../application/booking/save-passengers.usecase';
import { IPassenger } from '../../../../domain/model/passenger.model';
import { IReservationRequest } from '../../../../domain/model/reservation-request.model';
import { ReservationUseCase } from '../../../../application/booking/reservation.usecase';


@Component({
  selector: 'lib-payment-method-container',
  imports: [PaymentAndSummaryComponentComponent, AsyncPipe],
  templateUrl: './payment-method-container.component.html',
})
export class PaymentMethodContainerComponent implements OnInit, OnDestroy {
  private readonly paymentState = inject(PaymentState);
  private readonly _reservationUseCase = inject(ReservationUseCase);
  private readonly _paymentUseCase = inject(PaymentUseCase);
  private readonly _getFlightUseCase = inject(GetFlightsUsecase);
  private readonly _savePassangerUseCase = inject(SavePassengersUseCase);

  public paymentData$!: Observable<IPaymentData>;
  public successMessage$!: Observable<string>;
  public flightOrigin$!: Observable<IFlightSelected>;
  public flightDestination$!: Observable<IFlightSelected>;
  public passengerFligthData$!: Observable<IPassenger[]>;

  ngOnInit() {
    this._getFlightUseCase.initSubscriptions();
    this._paymentUseCase.initSubscriptions();
    this._savePassangerUseCase.initSubscriptions();

    this.paymentData$ = this._paymentUseCase.paymentData$();
    this.flightOrigin$ = this._getFlightUseCase.flightOriginSelected$();
    this.flightDestination$ = this._getFlightUseCase.flightDestinationSelected$();
    this.passengerFligthData$ = this._savePassangerUseCase.savePassengers$();
    this.successMessage$ = this.paymentState.store().successMessage.$();
  }

  onMethodSelected(method: 'CARD' | 'PSE' | null): void {
    this.paymentState.updateSelectedMethod(method);
  }

  onFormValidityChange(event: {
    formType: 'CARD' | 'BILLING' | 'PSE';
    isValid: boolean;
    formData: any;
  }): void {
    if (event.isValid) {
      if (event.formType === 'CARD' || event.formType === 'PSE') {
        this.paymentState.updatePaymentData(event.formData);
      }
      if (event.formType === 'BILLING') {
        this.paymentState.updateBillingData(event.formData);
      }
    }
  }

  submitPayment(paymentData: any, flightOrigin$ :any, flightDestination$ :any, passengerFligthData$ :any): void {
    this._paymentUseCase.execute(paymentData);
    this._reservationUseCase.getReservationData(paymentData, flightOrigin$, flightDestination$, passengerFligthData$)
  }
  ngOnDestroy(): void {
    this._getFlightUseCase.destroySubscriptions();
    this._paymentUseCase.destroySubscriptions();
    this._savePassangerUseCase.destroySubscriptions();
  }

}
